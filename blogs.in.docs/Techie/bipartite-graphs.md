# Bipartite Graphs 二分图
## Definition 定义
对于一张图 `G = {U, V, E}`, 满足 `U, V` 内部无边的图.   
## Judgement 判定
染色 (`R & B`)，发现邻居和自己颜色一样则判伪. 
```cpp
bool vis[P_CNT];
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
		vis[i] = true;
		col[i] = 1;
		if(judge_single(i) == false) return false;
	}
	return true;
}
```
