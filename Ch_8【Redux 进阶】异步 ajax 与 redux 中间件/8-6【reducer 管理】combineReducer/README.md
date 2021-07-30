# 8-6【reducer 管理】combineReducers

上一节知道了现在项目中的`home`页面的 API 处理逻辑遵循的设计模式是 mvc 架构，本节的目标是实现设计模式从 mvc 到 redux 的转变，分为以下 4 个任务：

1. 为 store 创建与`home`页面相对应的状态 state，推荐产品列表数据。
2. 在新建推荐产品列表 State 时，准备好相应的 reducer。
3. 为获取 API 数据创建 action。
4. 在主页中连接 store，并分发 action。



## 任务一、二

第一个任务和第二个任务是相互关联的，因为 State 是 reducer 的输出，所以当新建了 reducer，state 也会自动更新。

![image-20210730111135481](http://i.loli.net/2021/07/30/9srcBMATZg5q3UG.png)

<img src='http://i.loli.net/2021/07/30/9srcBMATZg5q3UG.png'>

### 1. 创建产品推荐列表的 reducer



==。。。==
