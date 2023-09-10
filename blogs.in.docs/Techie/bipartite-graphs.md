# Bipartite Graphs 二分图
## Definition 定义
对于一张图 `G = {U, V, E}`, 满足 `U, V` 内部无边的图.   
## Judgement 判定
染色 (`R & B`)，发现邻居和自己颜色一样则判伪. 
```cpp
//dfs method
//Correction prove needed
bool vis[P_CNT];
int col[P_CNT];
bool judge_single(int u) {
	for (int i in edges of u) {
		int v = edg[i].v;
		if(col[v] == col[u]) return false;
		if(vis[v]) continue;
		col[v] = ~col[u];
		vis[v] = true;
	}
	return true;
}
bool judge_all(void) {
	for (int i in each points) {
		if(vis[i]) continue;
		vis[i] = true;
		col[i] = 1;
		if(judge_single(i) == false) return false;
	}
	return true;



//bfs method
bool judge_in_bfs(int u) {
	queue<int> q;
	q.push(u);
	while(q.nempty()) {
		int head = q.head();
		q.pop();
		for (int i in edges of head) {
			int v = edges[i].v;
			if(col[head] == col[i]) {
				return false;
			}
			if(vis[i]) continue;
			col[v] = ~col[head];
			vis[v] = true;
		}
	}
	return true;
}
bool judge_all_in_bfs(void) {
	for (int i in each points) {
		if(vis[i]) continue;
		vis[i] = true;
		col[i] = 1;
		if(judge_in_bfs(i) == false) return false;
	}
	return true;
}
```
