# 6-5【路由搭建】页面导航



## 一、创建`signInPage`页面组件

方法同`home`页面。



## 二、创建`register`页面



## 三、创建一个需要参数的页面`detailPage`

1. 获取参数：`props.match.params`。

2. 引入`RouteComponentProps`，传递 FC 的范型类型。

    ```tsx
    import { RouteComponentProps } from "react-router-dom";
    
    export const DetailPage: React.FC<RouteComponentProps> = (props) => {
    ```

3. `interface`定义参数类型传递给`RouteComponentProps`的范型。

    ```tsx
    interface MatchParams {
        touristRouteId: string;
    }
    
    export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    ```

4. 导出。

5. `App.tsx`中带参数的路径匹配。

    参数使用`:`来引导；`path`的字符串中参数要与刚才`interface`中定义的参数一致。

    ```tsx
    <Route path='/detail/:touristRouteId' component={DetailPage} />
    ```

6. 实验：url 输入`localhost:3000/detail/xxx`，显示：![image-20210713131251222](https://i.loli.net/2021/07/13/VeJ3ZqBPxtf9Tj6.png)

