# 9-7【概念理解】createAsyncThunk 理论基础

上一节使用 Redux-Toolkit 完成了产品详情页面从 mvc 到 redux 的转变，但还遗留下一个问题即如何**使用 redux-toolkit 来处理异步请求**。

不管是否使用 RTK，从原理上来说都是一样的。异步操作都会使用 redux-thunk 或类似 thunk 的**中间件**来处理，异步 Action 都会被定义为 thunk action，以返回异步函数的形式来一层一层处理 action。对于使用了 RTK 的项目来说，thunk action 做了一层封装，定义了简单的 api 并使用一定语法结构包装起来

因为在第 8 章已详细讲解 Thunk 的原理，这一节将专注于**如何在 rtk 使用 thunk 这个角度**



## 在 RTK 项目使用 thunk

RTK 项目默认开启 redux-thunk，即不需对 rtk 做任何配置就可直接使用 thunk

但是有个**前提**：

1. 需要使用 RTK 的`configureStore`取代 redux 原生的`createStore`
2. Thunk action 全部使用 RTK 提供的 createAsyncThunk 方法进行封装



## createAsyncThunk

原理上来说这个函数非常简单，接收一个 **Action type** 和一个**返回 promise 的回调函数**，实现异步操作

### Parameters

#### Type

+ **pending**
+ **fulfilled**
+ **rejected**

这 3 个 Action 是 **rtk thunk 的核心**，对应到上一节的产品详情 api 就相当于：`fetchStart`、`fetchSuccess`、`fetchFail`。

这 3 个类型正是`createAsyncThunk`所返回的 Promise dispatch 出来的 3 个 action，它们都是 rtk thunk 的内置 action

<hr>

#### PayloadCreater

即是`createAsyncThunk`的第 2 个参数，是返回 Promise 的**回调函数**，在这个函数里处理异步逻辑



### Return Value

`createAsyncThunk`的返回值是一个标准的 **Redux thunk action creater**

这个 Action creater 会根据异步 promise 所返回 3 个 action 类型（*`pending`、`fulfilled`、`rejected`*）==？==，而这 3 个 action 的创建、发送实际是完全自动，全权交给 rtk 的 thunk 中间件自动处理

`createAsyncThunk`自动生成的 3 个`createAction`会被添加到 Thunk action 上，所以我们的 rtk reducer 是可以通过**对象化的引用**找到并处理它们的：==。。。？==

