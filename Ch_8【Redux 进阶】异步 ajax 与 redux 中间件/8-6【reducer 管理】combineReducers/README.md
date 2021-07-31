# 8-6【reducer 管理】combineReducers

上一节知道了现在项目中的`home`页面的 API 处理逻辑遵循的设计模式是 mvc 架构，本节的目标是实现设计模式从 mvc 到 redux 的转变，分为以下 4 个任务：

1. 为 store 创建与`home`页面相对应的状态 state，推荐产品列表数据。
2. 在新建推荐产品列表 State 时，准备好相应的 reducer。
3. 为获取 API 数据创建 action。
4. 在主页中连接 store，并分发 action。



## 任务一、二：state、reducer

第一个任务和第二个任务是相互关联的，因为 State 是 reducer 的输出，所以当新建了 reducer，state 也会自动更新。

![image-20210731113315224](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210731113322.png)

<img src='http://i.loli.net/2021/07/30/9srcBMATZg5q3UG.png'>

### 1. 创建产品推荐列表的 reducer

1. 创建空的 reducer 函数。

    ```tsx
    export default (state, action) => {
    	return state;
    };
    ```

2. 定义 reducer 的输出格式即 state 数据结构接口。

3. 设置 state 默认值。

<hr>

### 2. 把该 reducer 添加到 store

1. 从`redux`引入**`combineReducers`**函数。

2. 用该函数将两个 reducer 捆绑起来

    ```tsx
    const rootReducer =  combineReducers({
        language: languageReducer,
        recommendProducts: recommendProductsReducer,
    })
    ```

    `combineReducers`函数内数据以**对象形式**传递。

3. 使用`rootState`创建 store 的数据 state。

    现在查看`RootState`类型可以看到 state 已经变为-包含两个字段的数据类型了。

<hr>

### 3. 修改`Header`组件中 store 数据的获取



## 任务三：创建获取 API 数据的 action

1. 确认将用到哪些 action：

    因为是从 API 调用数据，所以可以从 ajax 请求的角度考虑，第一个 action 就是请求开始，二、三个 action 分别描述 api 调用成功与失败。

2. 给每个 action 定义接口。

3. 将三个 action 混合，输出 action 的总类型。

4. 创建三个 actionCreator。

5. 处理 action 及 reducer。



## 任务四：主页中连接 store，并 dispatch action

### 1. `connect()`高阶函数

### 2. 处理 state、dispatch 的映射函数并作`connect`参数

`mapStateToProps`、`mapDispatchToProps`；方法与 7-9 节类似。

```tsx
const mapStateToProps = (state: RootState) => ({
	loading: state.recommendProducts.loading,
	error: state.recommendProducts.error,
	productList: state.recommendProducts.productList,
});

const mapDispatchToProps = (dispatch) => ({
	fetchRecommendProductStart: () =>
		dispatch(fetchRecommendProductStartActionCreator()),
	fetchRecommendProductSuccess: (data) =>
		dispatch(fetchRecommendProductSuccessActionCreator(data)),
	fetchRecommendProductFail: (error) =>
		dispatch(fetchRecommendProductFailActionCreator(error)),
});
```

### 3. 删改相关代码



## 总结：从 MVC 到 redux 的转变

现在主页的数据及状态全都是由 Redux 接管了，虽然主页转为 redux 后思路反而没那么清晰了；但一旦 redux 中产品推荐的数据需要同步显示在其它页面或组件中，那么效率是非常高的，只需一次 api 调用就可以完成数个组件的数据同步。



