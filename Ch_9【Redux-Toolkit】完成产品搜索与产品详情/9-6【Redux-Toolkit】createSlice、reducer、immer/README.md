# 9-6【Redux-Toolkit】createSlice、reducer、immer

这一节将给项目添加 RTK 框架，然后把产品详情页面从 mvc 转换为 redux。

如何从 MVC 转换为 redux 已在第 7、8 章详细讲解过，接下来所有代码操作都会集中于如何使用 redux-toolkit 来进行。



## 一、安装 Redux-Toolkit 依赖

```
npm install @reduxjs/toolkit
```

因为 RTK 全面支持 ts ，所以不需安装类型文件



## 二、`slice.ts`中定义产品详情的 Slice

1. 创建`/redux/productDetail`文件夹：

    不过使用 RTK 后不再需要分别创建对应的 reducer 和 action 了，绝大多数情况可以使用 slice 作为产品详情的创建空间，而 slice 将自动包含 reducer 和 action 的映射关系

2. **创建产品详情所对应的 Slice**：`slice.ts`

    Slice 相当于 redux store 中分割出的一个**子模块**

    在写`slice.ts`的代码时可以对照着`recommendProductReducer`写更易理解，因为两个文件的功能相似

3. **使用[`createSlice`](https://redux-toolkit.js.org/api/createSlice)函数**

    该函数以对象形式传入数据，具有 3 个字段：

    1. **`name`**：命名空间==?== 的名称`productDetail`

    2. **`initialState`**：初始化数据：

        > 传统的 reducer 方案中初始化数据要通过 reducer 的参数传递进来，但是这样的写法易忘记传递初始化导致网站报错

        ```typescript
        const initialState: productDetailState = {
          // ...
        }
        ```

        然后将`initialState`传入`createSlice`函数

    3. **`reducers`**：

        > **`createSlice`定义的 reducer 几个特点**：
        >
        > 1. 不需单独定义 action：这里的 reducer 实际上是把 action 和 reducer 捆绑在一起
        > 2. 这里的 reducer 是对象不是过程：每个对象对应一个 action，同时也对应 action 的处理函数
        > 3. `createSlice`是面向对象不是过程：所以不必再写`switch`，很方便

        第 1 个要处理的 Action 应该是从处理 api 请求开始：

        ```typescript
          fetchStart: (state) => {
              // return { ...state, loading: true }
              state.loading = true;
          }
        ```

        > **immer 框架**
        >
        > 被注释掉的部分是常规写法，因为 State 是 immutable 的，不可直接修改。
        >
        > 但是有了 Immer 框架后可以直接使用对象的链式结构更新数据
        >
        > Immer 框架是 redux 官方推荐的，甚至是 rtk 框架中的默认选择

        第 2、3 个框架分别处理数据请求成功、失败的情况：

        RTK 以及定义好了 action 的类型`payload: any; type: string;`，如果需要自定义 action 类型可以使用`PayloadAction`，例如：

        ```typescript
          fetchFail: (state, action: PayloadAction<string | null>) => {
        		// ...
          }
        ```



## 三、`store.ts`中使用 Slice

RTK 兼容性强，因此接下来的代码将通过普通 redux 和 rtk 混编的形式对比学习和巩固。

1. 引入产品详情的 Slice。
2. 将`combineReducers`的引用从`redux`改为`@reduxjs/toolkit`。
3. 将`productDetail` 的 reducer 也放进`combineReducers`。



## 四、完成`detail`页面与 Redux 的连接

1. **将组件状态 State 转移到 redux 中**：

    使用`useSelector`连接产品详情数据中的`loading`、`error`、`data` 三字段的数据：

    ```tsx
    const loading = useSelector(state => state.productDetail.loading);
    // ...
    ```

<hr>

### 2. Dispatch 各 action

1. 从`useDipatch`取得`dispatch`函数：

    ```tsx
    const dispatch = useDispatch();
    ```

2. 在`useEffect`中分别 dispatch 请求开始、成功、失败 3 个 action：

    ```tsx
        // setError(error.message);
        // setLoading(false);
    dispatch(productDetailSlice.actions.fetchFail(error.message))
    ```

    其余类似。

