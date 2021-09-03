# 11-5【Redux 连接】加载购物车

从 UI 层面连接购物车 store：网站启动时加载已登陆用户的购物车；header 顶部导航栏显示购物车商品数量；进入购物车页面显示详情；购物车页面实现清空购物车操作。这一节全面使用 Hooks 完成所有功能。



## 一、`App`启动时加载购物车

1. **`useDispatch`Hook 获得`dispatch`函数**。

2. **`useEffect`向 Store 发送`getShoppingCart`action**。

    ```tsx
    useEffect(() => {
        if (jwt) {
            dispatch(getShoppingCart(jwt));
        }
    }, [jwt])
    ```



## 二、顶部导航

1. **使用`useSelector`获得`shoppingCartItems`和`loading`**。

2. **给购物车按钮加上 Loading 状态**。

3. **给 Button 标题加上购物车数量**：

    ```tsx
    <Button
      loading={shoppingCartLoading}
      onClick={() => history.push("/shoppingCart")}
    >
      {t("header.shoppingCart")}：({shoppingCartItems.length})
    </Button>
    ```



## 三、产品详情内 业务：向购物车添加商品

`detailPage.tsx`。

1. **`useSelecotr`连接 Store 获得数据获得`jwt`、`shoppingCartLoading`**。

2. **修改 JSX 代码 添加放入购物车按钮**：

    `button`的`onClick`时间，`dispatch`添加商品`action`。

    ```tsx
    <Button
    	style={{ marginTop: 50, marginBottom: 30, display: "block" }}
    	type="primary"
    	danger
    	loading={shoppingCartLoading}
    	onClick={() =>
    		dispatch(
    			addShoppingCartItem({ jwt, touristRouteId: product.id })
    		)
    	}
    >
    ```

3. 测试：

    点击“放入购物车”按钮，顶部导航中数量加一。

    <img src="https://gitee.com/ethereal-bang/images/raw/master/20210903204648.png" alt="image-20210903204638772" style="zoom:50%;" />

## 四、完成购物车页面与 Store 的连接

1. **`useSelector`连接 Store 数据**。

2. **数据放入`ProductList`、`PaymentCard`**：

    1. 调整`ProductList`：

        给`paging`加上`?`表示可选字段。

        ```tsx
        interface PropsType {
          data: Product[];
          paging?: any;
          onPageChange?: (nextPage, pageSize) => void;
        }
        ```

        修改 JSX 代码。

3. 测试：

    打开购物车：

    <img src="https://gitee.com/ethereal-bang/images/raw/master/20210903212124.png" alt="image-20210903212124744" style="zoom:33%;" />

    点击清空：

    <img src="https://gitee.com/ethereal-bang/images/raw/master/20210903212206.png" alt="image-20210903212206442" style="zoom:33%;" />
