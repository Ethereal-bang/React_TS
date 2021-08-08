# 9-8【Redux-Toolkit】store 配置（*configureStore*）与异步处理（*createAsyncThunk*）

实践学习 RTK 的 2 个重要 API：`configureStore`、`createAsyncThunk`

上一节说到 RTK 异步处理两个前提，使用 rtk 的`configureStore`取代 redux 原生的`createStore`；使用`createAsyncThunk`创建 thunk action

这一节学习如何：用`configureStore`创建 RTK 版本的数据仓库；在`createAsyncThunk`中处理异步数据流；处理 rtk thunk 中的`pending`、`fulfilled`、`rejected`  3 个 action。



## 一、替换 Store 创建方式为`configureStore`

`configureStore`的参数第一个对象，包含 3 个字段：

```typescript
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  	devTools: true,
})
```

其中，`middleware`字段可写可不写，但因为项目中有一个自定义的中间件`actionLog`，所以需要填写。

此外要注意，因为在`configureStore`函数已经提供了默认中间件，在配置`middleware`时要注意不要 Overwrite 现有的默认中间件，因此使用函数处理。

`devTools`字段，当选择 True 时，可以启用一个非常好用的开发工具 Redux DevTools 浏览器插件



## Redux DevTools

打开网站，点击 Redux DevTools 插件，现在网站所有的 state 和 action 的变化都可以在插件中看到了：

![image-20210808144905477](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210808144905.png)

![image-20210808144835492](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210808144835.png)



## 二、createAsyncThunk 创建 Action

`slice.ts`文件

1. `createAsyncThunk`函数创建并导出 Thunk action 名称`getProductDetail`。

2. 第 1 个参数是 Action 的**命名空间**==？==，string 类型的字符串，使用字符串`productDetail`加上 action 的名称：

    ```typescript
    export const getProductDetail = createAsyncThunk(
        "productDetail/getProductDetail",
    // ...
    ```

3. 第 2 个参数是异步回调函数，参数是产品 ID，和 thunkAPI（*包含 redux 相关功能，如 dispatch、getState*）：可将`DetailPage`的`useEffect`中数据请求代码剪切过来，并给所有`dispatch`前加上`thunkAPI.`

    ```tsx
    export const getProductDetail = createAsyncThunk(
        "productDetail/getProductDetail",
        async (touristRouteId: string, thunkAPI) => {
            thunkAPI.dispatch(productDetailSlice.actions.fetchStart());
            try {
                const { data } = await axios.get(
                    `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
                );
                thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
            } catch (error) {
           	 thunkAPI.dispatch(productDetailSlice.actions.fetchFail(error.message));
            }
        }
    )
    ```

4. 在`DetailPage`的`useEffect`中 dispatch 这个`getProductDetail`函数：

    ```tsx
    const fetchData = async () => {
        dispatch(getProductDetail(touristRouteId));
    }
    ```



## 三、改进

打开网站顺利运行但仍存有一定问题，因为`createAsyncThunk`函数的返回值有`pending`、`fulfilled`、`rejected` 3 个 Action 类型，但刚才的代码里并没有利用到它的返回类型甚至没有 return value。

1. 修改`getProductDetail`函数：

    ```typescript
        async (touristRouteId: string, thunkAPI) => {
            const { data } = await axios.get(
                `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
            );
          	return data;
        // ...
    ```

2. 在`productDetailSlice`中`reducers`添加`extraReducers`字段：

    ```typescript
      reducers: {
      },
      extraReducers: {
          [getProductDetail.pending.type]: (state) => {
              // return { ...state, loading: true }
              state.loading = true;
          },
          [getProductDetail.fulfilled.type]: (state, action) => {
              state.data = action.payload;
              state.loading = false;
              state.error = null;
          },
          [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
              state.loading = false;
              state.error = action.payload;
          },
      }
    ```

   
