# 6-3【路由初始化】配置 react-router

初始化主页路由。

显示效果：不变。



[React-router 官网](https://reactrouter.com)

## React-router-dom

+ React-router-dom 用于浏览器，处理 Web App 的路由

+ React-router-native 用于 React Native，处理手机 app 的路由

> 其余扩展性框架：
>
> + React-router-redux 提供路由中间件，处理 redux 的集成
> + React-router-config 用来配置静态路由

会自动安装 React-router 核心框架

+ 使用`<Link />`组件可以渲染出`<a />`标签
+ `BrowserRouter />`组件利用 H5 API 实现路由切换
+ `<HashRouter />`组件利用原生 JS 中`window.location.hash`实现路由切换



## 一、 预处理项目

给这个项目添加几个页面。

1. 习惯把所有页面放入`pages`文件夹进行管理。

### 2. 创建`home`组件

将`app`组件中的主页渲染代码提取出来。



## 二、搭建指向`home`页面的路由

1. 安装 react-router 路由框架

    ```
    npm install react-router-dom
    ```

2. 安装 react-router 类型定义

    react-router 没有提供原生 typescript 支持，所以还需给项目安装 react-router 的类型定义

    ``` 
    npm install @type/react-router-dom --save-dev
    ```

### 3. 在`App`组件完成路由的初始化定义

1. 在文件中引入路由框架 react-router-dom

    ```tsx
    import { BrowserRouter } from 'react-router-dom'
    ```

2. 在`div`元素中嵌套`<BrowserRouter />`组件来包裹所有页面

    react-router 框架以组件化来包装了几乎所有与路由有关的 API

3. `Route`路径组件（*在 'react-router-dom' 引用*）传入页面的路由信息

    ```tsx
    <BrowserRouter>
        <Route path='/' component={HomePage} />
    </BrowserRouter>
    ```

    `path`属性为`/`指当前页面，`component`属性等于该页面组件。



## 三、测试

运行网站，网站打开，url 显示为`localhost:3000`，是根目录。如果把`path`改为`/ddd`，会发现根目录是白屏，在 url 后加上`/ddd`后才会打开网站主页，说明路由系统初始化配置成功。

