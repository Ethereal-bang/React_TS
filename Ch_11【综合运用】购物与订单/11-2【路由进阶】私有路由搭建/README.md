# 11-2【路由进阶】私有路由搭建

购物车和订车属于私有页面，只有用户登录后才能看到相应内容。这一节实现一个私有路由，所有私有路由下页面都只允许登录用户才能打开。

最终效果：

未登录时试图进入购物车页面：

<img src="https://gitee.com/ethereal-bang/images/raw/master/20210831150652.png" alt="image-20210831150652433" style="zoom:33%;" />

重定向到登录页面：

<img src="https://gitee.com/ethereal-bang/images/raw/master/20210831150806.png" alt="image-20210831150806296" style="zoom:33%;" />

登录后进入：

<img src="https://gitee.com/ethereal-bang/images/raw/master/20210831153557.png" alt="image-20210831153557624" style="zoom:33%;" />



## 一、创建 ShoppingCart 页面

先写一个简单的组件。



## 二、搭建私有路由

私有路由原理很简单：在目前的路由系统中嵌入用户 JWT 信息，使用这个用户信息判断用户是否登录，再决定是否启用私有路由。

打开`App.tsx`文件，路由系统所在。

1. **引入几个依赖**：

    ```tsx
    import { Redirect } from 'react-router-dom';
    import { useSelector } from './redux/hooks';	// 等会会使用这个hook取得jwt数据
    ```

2. **完成私有路由`PrivateRoute`组件**仿照 React-router-dom 的`Route`组件：

    1. 在 Props 中传入对象：`component`（*路由所指页面*）、`isAuthenticated`（*判定是否登录*）、`...rest`（*其他传入的 props 属性*）。

    2. 创建函数内组件，封装逻辑：判断用户是否授权及重定向`Redirect`：

        ```tsx
          const routeComponent = (props) => {
              return isAuthenticated ? (
                  React.createElement(component, props)
              ) : (
                  <Redirect to={{ pathname: "/signIn" }} />
              );
          }
        ```

        

    3. `PrivateRoute`的最终返回：

        ```tsx
          return <Route render={routeComponent} {...rest} />;
        ```

        

3. **将私有路由应用在`shoppingCartPage`**：

    1. 用法和其他`<Route />`几乎相同。

    2. 用`useSelctor`取得 JWT：

        ```tsx
        const jwt = useSelector((s) => s.user.token);
        ```

    3.  

        ```tsx
        <PrivateRoute
        	path="/shoppingCart"
        	isAuthenticated={jwt !== null}
        	component={ShoppingCartPage}
        />
        ```

4. `Header`组件中加入`shoppingCartPage`的导航：

    ```tsx
    <Button onClick={() => history.push("/shoppingCart")}>
    	{t("header.shoppingCart")}
    </Button>
    ```

    

