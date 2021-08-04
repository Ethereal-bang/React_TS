# 9-5【概念理解】什么是 Redux-Toolkit

[Redux-Toolkit 官网](https://redux-toolkit.js.org/)提到，redux-toolkit 是个 **official**、**opinionated**、**batteries**、**efficient** 的工具。其中 Opinionated 指 rtk 不仅是个工具，还会提供更加简单的架构思想，如合并 action 与 reducer、自动处理异步逻辑等；Batteries 指 rtk 自带一系列官方推荐的工具集方便项目集成

**学习前提**：学习 Redux-Toolkit 必须掌握 redux 及 react-redux 的基本原理



## API 详解

RTK 所有的 api 总计有十个主要的 api 和一些其余不重要的 api。在所有的 api 中，有 2 个 api 值得特别关注，即：**`createSlice`、`configureStore`**



### createReducer

对于 RTK 项目来说，reducer 有 2 种创建方法，第一种是：“Builder Callback” Notation（*使用回调构建对象*），第二种是“Map Object” Notation（*使用 映射对象*）。一般更推荐使用第二种方法，因为这种书写方式更直观、易理解。

例如：

```tsx
const counterReducer = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
})
```

 在使用`createReducer`后，不需再额外定义 action 类型了，reducer 中也可以免去`switch`语句。当 reducer 和 action 合并，没有了模板代码，代码量能大大减少



### createAction

如果非要写清楚 action，也可以使用`createAction`，比如：

```typescript
const increment = createAction('increment')
const decrement = createAction('decrement')

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload
})
```

通过这种方式，就可以向外以对象的形式输出 action 了。



### createSlice==?==

不过，在绝大多数情况下，我们都不会直接使用`createAction`、`createReducer`这俩函数，取而代之的是**`createSlice`**

作为 RTK 核心，`createSlice`函数接受初始化 state 和对象化映射后的 reducer，可以将 store 以切片的方式分割成独立部分，且自动生成相对应的 action 与 state 对象



### configureStore

**`configureStore`**是一种非常友好的创建 redux store 的方式，即可以通过`configureStore`代替 redux 原生的**`createStore`**函数了。



