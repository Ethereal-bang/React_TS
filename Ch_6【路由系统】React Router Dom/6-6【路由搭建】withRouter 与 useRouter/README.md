# 6-6【路由搭建】withRouter 与 useRouter

路由数据的传递。

## react-router 如何传递路由信息

我们知道路由对象是 react-router 在 route 组件中通过`props`传递给页面的数据，其中包含了所有路由数据以及路由操作

但是跨组件的路由数据又如何传递，例如`home`页面本身`props`属性包含了来自 react-router 所传递下来的路由数据，但`home`页面的子组件如`Header`都不与 react-router 直接相连，所以无法直接从 react-router 获得路由对象。

要想实现跨组件的路由数据传递，可以使用上下文关系对象`context`，具体实现方案有两种：HOC 高阶组件；hooks 钩子函数



## HOC 高阶组件 withRouter()，ProductImage 组件传递

实现点击`ProductImage`进入`detail/${id}`页面。

> **网站导航：**
>
> 网站导航把页面一层一层向上叠加，而这个页面 stack 叠加的操作就需要使用到路由`history`字段的`push`函数完成。

1. 引入 react-router-dom 框架的 HOC 函数`withRouter`

2. 修改为 HOC 的模式

    ```tsx
    const ProductImageComponent: React.FC<PropsType> = (
    	// ...  
    )
    
    export const ProductImage = withRouter(ProductImageComponent);
    ```

3. 这时报错显示`ProductImageComponent`参数类型`PropsType`无法传递给`withRouter`函数，修改如下：

    ```tsx
    import { RouteComponentProps } from 'react-router-dom';
    interface PropsType extends RouteComponentProps {
    ```

    现在 react-router 的数据和路由操作的函数就都通过上下文`context`传递给`ProductImage`组件了，可以随意在组件中使用`history`所定义的所有操作。

4. 使用`history.push`进行页面切换操作：

    将`div`包裹 jsx 代码，添加`onClick`事件。当点击组件时调用`history.push`将下一个页面推进导航栈，参数就是该页面字符串。

    ```tsx
    return (
            <div onClick={() => history.push(`detail/${id}`) }>
    ```

5. 测试：

    点击产品推荐中任一图片也就是旅游路线，页面就会切换到对应详情页面也就是`localhost:3000/detail/id`页面，id 为`mockups`内的数据。后退按钮也适用。

    ![image-20210715213001663](https://i.loli.net/2021/07/15/BSKzykDwbp5AQix.png)

## 钩子函数 useRouter()，`Header`组件传递

`Header`组件很长很复杂，如果使用高阶函数封装路由会使整个文件显得凌乱，可以选择引入`react-router-dom`中若干个钩子实现数据传递。

1. 引入几个钩子函数：

    ```tsx
    import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
    ```

    分别用来获取导航操作、路径信息、url 中的参数和路径匹配数据：

    ```tsx
    const history = useHistory()
    const location = useLocation()
    const match = useRouteMatch()
    const params = useParams()
    ```

    接下来主要使用`history`完成`header`中的导航。

2. 实现点击“注册”进入注册页面；点击“登录”进入登录页面。

    ```tsx
    <Button onClick={() => {history.push("register")}}>注册</Button>               
    <Button onClick={() => {history.push("signIn")}}>登录</Button>
    ```

    测试：`push`的参数如果改为`localhost:3000/register`，url 切换就会变为：

    ![image-20210715221530645](https://i.loli.net/2021/07/15/aTBI8uNOc6kySwh.png)；参数改为`/register`后也正常。

3. 实现点击网站 logo和名称回到首页。

    首页用根目录`/`。

4. 测试：虽然鼠标悬浮在 logo 和名称上时没有出现小手效果，但网页切换是起作用的。

    ![image-20210715223030538](https://i.loli.net/2021/07/15/noLGrjel9EVusRK.png)

