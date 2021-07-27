

# 7-9【redux 封装】在类组件中使用 react-redux

学习如何在项目中使用目前最流行的 redux 插件 **react-redux**，来进行**更高级的组件封装**，通过**语法糖**减少项目中模板代码实现更优雅代码结构。



## 一、配置 react-redux

[官方文档](https://react-redux.js.org)

1. 安装依赖：

    ```
    npm install react-redux
    ```

2. 安装 react-redux 的类型文件：

    > 因为 react-redux 不原生支持 ts。

    ```
    npm install @types/react-redux --save-dev
    ```

3. 配置 store 的 Provider：

    > 通过使用 Provider（*context api 的数据组件*），可以从组件中把 store 的订阅剥离，实现真正的 redux 组件化

    1. 在`index.ts`中引入`Provider`、`store`：

        ```tsx
        import { Provider } from "react-redux";
        import store from './redux/store';
        ```

    2. 使用`Provider` 并加载数据仓库：

        ```tsx
          <Provider store={store}>
              <App />
          </Provider>
        ```

    现在 redux store 就可以在全局范围内使用了。



## 二、react-redux 基本语法

1. `connect()`连接 store

    > 这一步相当于在组件中订阅 store，只不过`connect()`函数对其进行了封装。

2. 从 react-redux 引入`connect` 函数。

### 3. 使用 connect()

`connect`高阶函数的第一个括号内有两个参数：第一个是`mapStateToProps`；第二个是`mapDispatchToProps`。

通过 connect 函数把 store 的部分 state，和 dispatch 方法与组件连接：

#### 1. `connect`连接 state 处理数据的流入

1. 先使用`connect`函数连接 store：

    ```tsx
    export const Header = connect()(withTranslation()(withRouter(HeaderComponnet)));
    ```

2. 连接`mapStateToProps`：

    > `mapStateToProps`是一个函数，参数接收从 store 传递过来的 state，输出就是与组件 props 绑定的数据，数据的绑定是以对象的形式输出的。

    1. 

        ```tsx
        const mapStateToProps = (state) => {
            return {
                language: state.language,
                languageList: state.languageList
            }
        }
        ```

    2. 加上`state`的类型：

        上文的`state`还没有实现自动联想的功能，使用 TS 加上它的类型使用起来会更加方便。

        那么 state 的类型是什么呢，我们可以说`store`类型包含了`LanguageState`，但决不能说`store`的类型就是`LanguageState`。所以从 ts 的角度来说，在`mapStateToProps`中使用的应该是 store 本身的类型。

        1. 获得 store 类型方法：

            ```tsx
            export type RootState = ReturnType<typeof store.getState>
            ```

            > store 的类型名称一般叫做`RootState`，数据类型可从`store`的`getState`函数取得，而对于`typeof store.getState`可以通过==类型的反向注入？==，使用`ReturnType`来从范型中获得它的返回类型。

        2. 导出 store 类型。

3. 将`mapStateToProps`写入`connect`的第一个参数。

4. 删除初始化、订阅相关代码

    + 因为`language`、`languageList`的数据已经通过`connect`函数注入`Header`组件，那么也没必要再构造函数中初始化这两个 state，也没必要订阅 store。
    + 因为 state 绑定给了组件的 props，所以组件 state 的接口声明没有存在意义

5. 修正代码：将`this.state`替换为`this.props`。

    因为现在`language`和`languageList`都被绑定在`props`中了。

#### 2. `connect`连接 dispatch 处理数据的输出

用与上一步类似的方法连接 store 的 dispatch。

1. 创建函数`mapDispatchToProps`。
2. 从 redux 引入`Dispatch`类型定义函数的参数`dispatch`。

3. 函数`mapDispatchTpProps`返回类型是一个对象，对象每一个字段就是一个 dispatch 的处理**函数**。

4. 在`PropsType`中定义：

    因为`mapDispatchToProps`的 return 对象会被`connect`函数注入`Header`的 props 属性。


### 4. 在`menuClickHandle`中完成对 action 的解耦

1. 删除原有 action 创建及 dispatch
2. 重新绑定 props 中的`addLanguage`和`changeLanguage`函数
3. 代码整理：
    + 删除 store 订阅处理函数。
    + 删除不必要的引用。
    + 删除 state 的 interface。
