# 开启 DNS Over HTTPS
RFC8484: <https://mirrors.nju.edu.cn/rfc/rfc8484.html>  
**事实上, 开了 DOH 和 DOT 不一定会加速. 很多情况下, 你甚至需要科学上网. 在外企的网络环境中, 访问部分国外网站会相当快速.**   

目前, 所有的浏览器基本都支持了单独配置 DNS Over HTTPS, 但是不支持多源, 这会让访问国内网站变得缓慢. 为了解决这个问题, 我们可以手工构造这样一个多源代理服务器. 

准备好自签名证书, 然后使用 Node.js 搭建以下服务器: 
```javascript
const https = require('https');
const fs = require('fs');
const dgram = require('dgram');
const tls = require('tls');
const { URL } = require('url');
const net = require('net');
fetch("https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts")
  .then(res => res.text())
  .then(text => {
    fs.writeFileSync('./custom_hosts', text);
  });
// ==================== 配置部分 ====================
const HOSTS_PATH = './custom_hosts'; // 自定义 hosts 文件路径
const SSL_CONFIG = { // RFC 8446 TLS 1.3 配置
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const UPSTREAM_CONFIG = {
  strategies: {
    "test.local.test.local": {type: "local"}, 
    // "onedrive.live.com" :{type: "doh", endpoint: "https://ag.apollohct.com/dns-query"}, 
    // "onedrive.live.com" :{type: "doh", endpoint: "https://sky.rethinkdns.com/dns-query"}, 
    // 'github.com': { type: 'local' },
    // '*.github.com': { type: 'local' },
    // 'secure.example': { type: 'dot', server: '1.1.1.1' },
    // 'doh.example': { type: 'doh', endpoint: 'https://cloudflare-dns.com/dns-query' },
    // "github.com": {type: "doh", endpoint: "https://ag.apollohct.com/dns-query"}, 
    // "github.com": {type: "doh", endpoint: "https://sky.rethinkdns.com/dns-query"}, 
    // "*.github.com": {type: "doh", endpoint: "https://ag.apollohct.com/dns-query"}, 
    'default': { type: 'dns', server: '180.76.76.76' }
  },
  timeout: 5000 // RFC 8484 建议超时
};
function encodeDNSName(name) {
  const parts = name.split('.').filter(p => p);
  const buffer = [];
  parts.forEach(part => {
    buffer.push(part.length);
    buffer.push(...Buffer.from(part));
  });
  buffer.push(0);
  return Buffer.from(buffer);
}

function encodeALPN(protocols) {
  const buffers = [];
  protocols.forEach(proto => {
    const protoBuf = Buffer.from(proto);
    buffers.push(Buffer.from([protoBuf.length]));
    buffers.push(protoBuf);
  });
  return Buffer.concat(buffers);
}

function encodePort(port) {
  const buf = Buffer.alloc(2);
  buf.writeUInt16BE(port);
  return buf;
}
//00 00 01 00 00 01 00 00 00 00 00 00 03 77 77 77 06 67 69 74 68 75 62 03 63 6f 6d 00 00 01 00 01
// ==================== DNS 协议处理 ====================
class DnsProcessor {
  static parseHosts(path) {
    const map = new Map();
    fs.readFileSync(path, 'utf8')
      .split('\n')
      .forEach(line => {
        line = line.trim().replace(/#.*/, '');
        if (!line) return;
        const [ip, ...domains] = line.split(/\s+/);
        domains.forEach(d => map.set(d.toLowerCase(), ip));
      });
    return map;
  }

  static extractQuestion(buffer) {
    const qdcount = buffer.readUInt16BE(4);
    let offset = 12;
    
    for (let i = 0; i < qdcount; i++) {
      const qname = [];
      while (buffer[offset] !== 0) {
        const len = buffer[offset++];
        qname.push(buffer.toString('ascii', offset, offset + len));
        offset += len;
      }
      offset += 5; // 跳过 QTYPE 和 QCLASS
      return { name: qname.join('.').toLowerCase(), qtype: buffer.readUInt16BE(offset - 4) };
    }
  }

  static buildResponse(query, question, answerData) {
    const buffer = Buffer.alloc(4096); // 扩大缓冲区应对复杂记录
    query.copy(buffer, 0, 0, query.length);
  
    // ========== 头部处理 ==========
    buffer[2] |= 0x80;  // QR=1
    buffer[3] = 0x80;   // RA=1 (RCODE=0)
    buffer.writeUInt16BE(1, 6); // ANCOUNT=1
  
    let offset = query.length;
    
    // ========== 公共资源记录头 ==========
    buffer[offset++] = 0xC0; // 压缩指针
    buffer[offset++] = 0x0C; // 指向问题部分域名 (12字节偏移)
    
    // ========== 动态类型处理 ==========
    buffer.writeUInt16BE(question.qtype, offset); offset += 2; // TYPE
    buffer.writeUInt16BE(0x0001, offset); offset += 2;        // CLASS=IN
    buffer.writeUInt32BE(300, offset); offset += 4;           // TTL
  
    // ========== RDATA 构造 ==========
    if (question.qtype === 1) { // A 记录
      buffer.writeUInt16BE(4, offset); offset += 2; // RDLENGTH
      answerData.ip.split('.').forEach(v => {
        buffer[offset++] = parseInt(v);
      });
    } else if (question.qtype === 65) { // HTTPS 记录
      // ========== RFC 9460 核心实现 ==========
      const rdataParts = [];
      
      // 1. 优先级 (2字节)
      const priorityBuf = Buffer.alloc(2);
      priorityBuf.writeUInt16BE(answerData.priority);
      rdataParts.push(priorityBuf);
  
      // 2. 目标名称（使用压缩指针）
      rdataParts.push(Buffer.from([0xC0, 0x0C])); // 指向问题中的域名
  
      // 3. 参数构造
      const params = [];
      
      // ALPN 参数 (key=1)
      if (answerData.alpn) {
        params.push({
          key: 1,
          value: encodeALPN(answerData.alpn)
        });
      }
  
      // 端口参数 (key=3)
      if (answerData.port) {
        params.push({
          key: 3,
          value: encodePort(answerData.port)
        });
      }
  
      // IPv4提示 (key=4)
      if (answerData.ipv4hint) {
        const ipBuf = Buffer.alloc(4);
        answerData.ipv4hint.split('.').forEach((v, i) => {
          ipBuf[i] = parseInt(v);
        });
        params.push({
          key: 4,
          value: ipBuf
        });
      }
  
      // 参数排序（RFC 要求按键升序）
      params.sort((a, b) => a.key - b.key);
  
      // 计算总参数长度
      let svcParamsLength = 0;
      params.forEach(p => svcParamsLength += 4 + p.value.length);
  
      // 参数长度头 (2字节)
      const svcParamsLenBuf = Buffer.alloc(2);
      svcParamsLenBuf.writeUInt16BE(svcParamsLength);
      rdataParts.push(svcParamsLenBuf);
  
      // 写入参数
      params.forEach(p => {
        const keyBuf = Buffer.alloc(2);
        keyBuf.writeUInt16BE(p.key);
        rdataParts.push(keyBuf);
  
        const lenBuf = Buffer.alloc(2);
        lenBuf.writeUInt16BE(p.value.length);
        rdataParts.push(lenBuf);
  
        rdataParts.push(p.value);
      });
  
      // 合并所有 RDATA 部分
      const rdata = Buffer.concat(rdataParts);
      
      // 写入 RDLENGTH 和 RDATA
      buffer.writeUInt16BE(rdata.length, offset); offset += 2;
      rdata.copy(buffer, offset); offset += rdata.length;
    }
    console.log(buffer.subarray(0, offset));
    return buffer.subarray(0, offset);
  }
}

// ==================== DoH 服务核心 ====================
class DohServer {
  constructor() {
    this.hosts = DnsProcessor.parseHosts(HOSTS_PATH);
    this.server = https.createServer(SSL_CONFIG, this.handleRequest.bind(this));
  }

  async handleRequest(req, res) {
    console.log("handled")
    try {
      const url = new URL(req.url, `https://${req.headers.host}`);
      if (url.pathname !== '/dns-query') return this.sendError(res, 404);

      const dnsData = await this.getDnsData(req, url);
      if (dnsData.length > 4096) return this.sendError(res, 413); // RFC 8484 长度限制
      const question = DnsProcessor.extractQuestion(dnsData);
      const strategy = this.getStrategy(question.name);
      console.log(question.name, strategy.type);
      if (strategy.type === 'local' && this.hosts.has(question.name)) {
        this.sendLocalResponse(dnsData, question, res);
      } else {
        this.forwardQuery(dnsData, strategy, res);
      }
    } catch (e) {
      this.sendError(res, 500);
    }
  }

  getStrategy(domain) {
    for (const [pattern, strategy] of Object.entries(UPSTREAM_CONFIG.strategies)) {
      if (pattern.startsWith('*') && domain.endsWith(pattern.slice(1))) return strategy;
      if (domain === pattern) return strategy;
    }
    return UPSTREAM_CONFIG.strategies.default;
  }

  async getDnsData(req, url) {
    if (req.method === 'GET') {
      const b64 = url.searchParams.get('dns');
      if (!b64) throw new Error('Missing dns parameter');
      return Buffer.from(b64.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    } else if (req.method === 'POST') {
      return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', c => chunks.push(c))
           .on('end', () => resolve(Buffer.concat(chunks)))
           .on('error', reject);
      });
    }
    throw new Error('Invalid method');
  }

  sendLocalResponse(query, question, res) {
    const response = DnsProcessor.buildResponse(query, this.hosts.get(question.name));
    res.writeHead(200, {
      'Content-Type': 'application/dns-message',
      'Cache-Control': `max-age=300`
    }).end(response);
  }

  forwardQuery(data, strategy, res) {
    switch(strategy.type) {
      case 'dns': this.forwardUdp(data, strategy.server, res); break;
      case 'dot': this.forwardTls(data, strategy.server, res); break;
      case 'doh': this.forwardDoh(data, strategy.endpoint, res); break;
      default: this.forwardUdp(data, UPSTREAM_CONFIG.strategies.default.server, res);
    }
  }

  forwardUdp(data, server, res) {
    const socket = dgram.createSocket('udp4');
    const timer = setTimeout(() => socket.close(), UPSTREAM_CONFIG.timeout);
    
    socket.send(data, 0, data.length, 53, server);
    socket.on('message', msg => {
      clearTimeout(timer);
      res.writeHead(200, {
        'Content-Type': 'application/dns-message',
        'Cache-Control': 'max-age=300'
      }).end(msg);
      socket.close();
    });
  }

  forwardTls(data, server, res) {
    const socket = tls.connect(853, server, { 
      rejectUnauthorized: true,
      ALPNProtocols: ['dot'] // RFC 7858 规范
    });
    
    socket.setTimeout(UPSTREAM_CONFIG.timeout, () => socket.destroy());
    socket.on('secureConnect', () => socket.write(data));
    socket.on('data', msg => res.end(msg));
    socket.on('error', () => this.sendError(res, 502));
  }

  forwardDoh(data, endpoint, res) {
    const url = new URL(endpoint);
    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/dns-message',
        'Accept': 'application/dns-message'
      }
    }, dohRes => {
      const chunks = [];
      dohRes.on('data', c => chunks.push(c))
            .on('end', () => res.end(Buffer.concat(chunks)));
    });
    req.on('error', () => this.sendError(res, 502));
    console.log("DOH: ", data);
    req.end(data);
  }

  sendError(res, code) {
    res.writeHead(code, { 'Content-Type': 'application/json' })
       .end(JSON.stringify({ 
         error: code === 400 ? 'Invalid DNS query' :
                code === 413 ? 'Payload too large' : 
                'Internal server error' 
       }));
  }

  start(port = 443) {
    this.server.listen(port, () => console.log(`DoH Server running on port ${port}`));
  }
}

// ==================== 启动服务 ====================
new DohServer().start(10053);
```
然后你就能兼顾了. 

除此之外, 你应当使用 Firefox, 因为它有一个功能相当优秀: 当使用 socks 时代理 DNS 查询. 

此外, 你还可以考虑~~使用 AI~~拓展上述程序, 以支持纯 JSON 格式的 DNS Over HTTPS. 
示例地址: 
<https://doh.dns.sb/dns-query?dns=AAABAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB>   
<https://doh.dns.sb/dns-query?name=example.org>


