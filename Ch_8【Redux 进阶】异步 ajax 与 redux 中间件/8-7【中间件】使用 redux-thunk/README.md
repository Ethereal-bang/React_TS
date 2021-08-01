# 8-7【中间件】使用 redux-thunk 中间件实现异步 action



## 思考

上一节的代码有一个问题值得关注，`homePage`文件`componentDidMount`函数中在初始化推荐列表数据时调用了一个 api 请求。

思考几个问题：

+ 把 API 请求放在组件中是否合理。

    推荐列表的数据是在主启动时通过调用 API 获得数据的。如果某个页面也需要使用到推荐列表的数据但通过 url 跳过主页直接访问到这个页面，这时推荐列表就不会有数据存在了。

+ 是否有必要把 API 请求转移到 redux store 中执行。

    唯一的选择是把数据获取的逻辑从组件中剥离处理，放进 Store 由 store 统一处理。

+ 放进 Store 中的哪个部分来处理类似 api 调用的操作。

    action 返回的是 action 对象不是过程，没办法在 action 中处理状态的变化；reducer 是纯函数，而 api 请求是一个副作用。

    

## 中间件

经过上面的思考得出，需要一个新的模块来处理副作用了。处理副作用的模块就是中间件，而中间件的实现原理下节课再探讨。



## react-thunk

对于异步处理，Redux 给出了一个官方的中间件叫做`redux-thunk`，这个中间件几乎是每个 react 程序员必须掌握的基本技能之一。

[React-thunk 源码](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js) 仅 14 行，其实它的代码很简单，仅仅是让 dispatch 多支持了一种类型：函数类型。



## 一、创建 react-thunk 中间件

1. 安装

    ```
    npm install redux-thunk
    ```

2. 引用：

    ```typescript
    // store.ts
    import { applyMiddleware } from 'redux';
    import thunk from "react-thunk";
    ```

3. `createStore`参数：

    ```typescript
    const store = createStore(rootReducer, applyMiddleware(thunk));
    ```



## 二、使用 Thunk 把`home`页面 api 请求异步代码移到 store

1. 创建 action 的返回函数而不是对象的创建工厂：

    ```typescript
    export const giveMeDataActionCreator = () => () => {};
    ```

2. 从 Thunk 引用 action 类型并传给函数：

    > Thunk 的作用就是让 dispatch 多支持了函数类型。  

    ```typescript
    import { ThunkAction } from "react-thunk";
    ```

3. 给`ThunkAction`泛型传入参数：

    ```typescript
    export const giveMeDataActionCreator = () : ThunkAction<void, RootState, unknown, RecommendProductsAction> => () => {};
    ```

4. 把`home`页面 api 请求异步代码移来并修改：

    对比：

    ```typescript
    // HomePage.tsx
    async componentDidMount() {
        this.props.fetchStart()
        try {
            const { data } = await axios.get(
                'http://123.56.149.216:8080/api/productCollections'
            );
            this.props.fetchSuccess(data)
        } catch (error) {
            this.props.fetchFail(error)
        }
    }
    ```

    ```typescript
    // recommendProductsActions.ts
    > => async (dispatch, getState) => {
    	dispatch(fetchRecommendProductsStartActionCreator());
    	try {
    		const { data } = await axios.get(
    			"http://123.56.149.216:8080/api/productCollections"
    		);
    		dispatch(fetchRecommendProductsSuccessActionCreator(data));
    	} catch (e) {
    		dispatch(fetchRecommendProductsFailActionCreator(e.message));
    	}
    };
    ```

5. 在`componentDidMount`中执行 dispatch action：

    ```tsx
    const mapDispatchToProps = (dispatch) => ({
    	giveMeData: () => dispatch(giveMeDataActionCreator()),
    });
    // ...
    	componentDidMount() {
        this.props.giveMeData();
      }
    ```



## Thunk 总结

+ thunk 可以返回一个函数
+ 在一个 action 中可以完成一些连续的 action 操作
+ 可以处理异步逻辑
+ 业务逻辑可以从 UI 层面挪到这里，代码分层更清晰

