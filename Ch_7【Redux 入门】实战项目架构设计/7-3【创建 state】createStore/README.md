# 7-3【创建 state】createStore

创建项目的数据中心 store，创建语言配置处理系统`languageReducer`，在`languageReducer`中初始化 store 中的语言配置数据。



## 一、代码准备：修改`Header`为类组件

1. 文件加上`.class`后缀表示这是个类组件。

2. 将`Header`改为类组件：

    换成 HOC 的方式，使用`withRouter`来加载路由数据



## Redux 工作流

<img src="https://i.loli.net/2021/07/20/oIJEqA63R5MFQVt.png" alt="image-20210719161201719" style="zoom: 67%;" />



## 二、创建状态管理仓库 store

### 1. 搭建 redux 的状态订阅系统

```
npm install redux
```

### 2. 使用`createStore`创建 store

1. ```tsx
    const store = createStore();
    ```

2. 给`createStore()`提供一个 reducer 作为第一个参数

    > **reducer**：
    >
    > store 的处理数据的方法

    这里我们的第一个 reducer 是用来处理语言设置状态的。

    reducer 的基本框架：

    ```tsx
    export default (state, action) => {
    	return state	// 应该返回新的状态，在这里暂时用就状态代替
    }
    ```

    因为在 redux 中不管是 reducer 还是 action 都是纯函数，所以文件输出的最终结果就是一个函数，可以使用匿名函数的形式。

    reducer 中的参数 state 和 action，state 是 store 中的旧数据，而 action 是指挥 reducer 函数作数据变换的指令。

### 3. 给 reducer 配置初始化数据

项目启动时，`languageReducer`会随着网站同时启动，所以必须给 reducer 配置初始化数据。

1. 定义`languageState`的接口。

2. 初始化 `defaultState`数据，类型使用接口`languageState`。

    第一组数据时当前语言；第二组数据是语言的列表。

3. 把这些默认数据`defaultState`传给 reducer 的 state 参数。











