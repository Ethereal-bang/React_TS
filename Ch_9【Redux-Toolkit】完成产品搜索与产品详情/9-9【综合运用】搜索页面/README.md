# 9-9【综合运用】搜索页面

最终效果：

![image-20210809154027905](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210809154028.png)

![image-20210809151146406](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210809151146.png)



## 一、创建页面及 UI 组件



## 二、配置页面路由，从 URL 取得搜索关键词

1. **`App.tsx`文件中配置路由路径**：

    ```tsx
    <Route path="./search/:keywords?" component={SearchPage} />
    ```

    参数是`keywords`搜索关键词，加上`?`代表参数可选

2. **`SearchPage`中使用`useParams`** Hook 取得 url 中参数`keywords`。

3. **给参数`keywords`添加接口**`MatchParams`：

    ```tsx
    interface MatchParams {
        keywords: string,
    }
    ```

    只有一个字段`keywords`，将会与 URL 匹配。

4. **使用`useParams`加上泛型，并`{}`取得参数`keywords`**：

    ```tsx
    const { keywords } = useParams<MatchParams>()
    ```

    

## 三、创建产品搜索的 Redux 状态 slice

1. **创建`/redux/productSearch/slice.ts`文件**。

2. **粘贴上一节`/productDetail/slice.ts`内容并修改名称**。

3. **在 state 里增加`pagination`字段**，表示分页数据：

    ```typescript
     [searchProduct.fulfilled.type]: (state, action) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
       /* 原：
            state.data = action.payload
      */        
    ```

    （*其中，`data`、`pagination`的数据来源将在第 7 步解答。*）

    > **`pagination`分页数据以及 API 分析**
    >
    > 在 Postman 里请求数据发现如果不添加 keywords，得到的请求响应`Headers`内有`x-pagination`，其值含有此页 url 链接、下一页链接、总共页数等信息。
    >
    > 若将变量设置为：
    >
    > <img src="C:%5CUsers%5CHP%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210809094322719.png" alt="image-20210809094322719" style="zoom:33%;" />
    >
    > 再发送请求发现`Body `内有 5 条路线信息，`Headers`内多了个上一页链接。

4. **在异步处理函数内添加参数**：

    ```typescript
    async (paramaters: {
        keywords: string,
        nextPage: number | string,
        pageSize: number | string,
    }, thunkAPI) => {
    ```

5. **根据参数定义请求的 URL**：（*注意是反引号*）

    ```typescript
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`
    ```

    主体是 API，并传入分页信息`pageNumber`、`pageSize`。

    如果`keywords`传入有数据，扩充该 URL，进行关键字搜索，否则返回所有旅游路线：

    ```typescript
    if (paramaters.keywords) {
        url += `&keyword=${paramaters.keywords}`;
    }
    ```

6. **将 URL 传入 get 请求**：

    ```typescript
    const response = await axios.get(url);
    /* 原：
    	const { data } = await axios.get(/* ... */)
    */
    ```

    因为要获得的不仅是`Body`中的数据，还有`Headers`的数据，所以应该保存的是所有的响应数据。

7. **返回数据**：

    ```typescript
    return {
        data: response.data,
        pagination: JSON.parse(response.headers['x-pagination'])
    };
    ```

    用`JSON.parse`将获得的 JSON 的字符串转换为 js 对象。

8. **引用 Slice 及合并 reducer**。（*`combineReducers`*）



## 四、完成 Redux 与页面状态的连接

1. **使用`useSelector`连接 Redux 的 state**，分别取得搜索的`loading`等信息：

    ```tsx
      // ...
    	const pagination = useSelector(state => state.productSearch.pagination);
      const ProductList = useSelector(state => state.productSearch.data);
    ```

2. **用`useDispatch`取得`dispatch`函数**。

3. **用`useLocation`取得 location 的数据**：

    ```tsx
    const dispatch = useDispatch();
    const location = useLocation();
    ```

4. **使用`useEffect`函数**：

    ```tsx
    useEffect(() => {
        dispatch(searchProduct({nextPage:1, pageSize: 10, keywords}))	// nextPage 为什么等于 1？
    }, [location])
    ```

    第 2 个参数传入`location`表示一旦 URL 变化就启用`useEffect`函数重新进行旅游路线的搜索。

5. **补充`ProductList`参数**：

    ```tsx
    <ProductList 
        data={productList}
        paging={pagination}
        onPageChange={onPageChange}
    />
    ```

6. **设置翻页函数**：

    ```tsx
    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({ nextPage, pageSize, keywords }))
    }
    ```

7. **完成 错误及异步等待 的逻辑处理**。

8. **补充**`HomePage`下`Header`中**`Input`组件**`onSearch`事件监听：

    ```tsx
    <Input.Search
      placeholder={"请输入旅游目的地、主题、或关键字"}
      className={styles["search-input"]}
      onSearch={(keywords) => history.push(`/search/${keywords}`)}
    />
    ```



## 补充关于编译时的 Warning

### useEffect

```tsx
useEffect(() => {
    const fetchData = async () => {
        dispatch(getProductDetail(touristRouteId));
    }
    fetchData();
}, [])  // eslint-disable-line react-hooks/exhaustive-deps
```

对于这样的报错：`React Hook useEffect has missing dependencies: 'dispatch' and 'touristRouteId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps`。



### export default 箭头函数

Export default 命令用在非匿名函数前，于是将`languageReducer`、`recommendProductReducer`中相关语句改为普通函数，如：

```typescript
export default function reducer(state = defaultState, action: LanguageActionTypes) {
/* 原：
	export default (state = defaultState, action: LanguageActionTypes) => {
*/
```

