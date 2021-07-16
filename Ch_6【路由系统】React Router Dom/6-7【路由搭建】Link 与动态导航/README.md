# 6-7【路由搭建】Link 与动态导航

在`ProductImage`组件中替换导航方案，使用`Link`的超链接代替`history.push`。



## 使用`<Link />`组件的导航方式

react-router 在俩页面之间有两种导航方式，在前面章节中使用的是`push`方法进行页面切换，但还有一种以组件化为思路封装的方式：使用 react-router 中的`<Link />`组件，在 dom 元素中生成一个超链接来导航



## 一、使用`Link`组件包裹

1. 替换`div`把整个 jsx 代码包裹起来。

2. 删除 onclick 事件。

3. 向`Link`组件传入一个 url 片段作超链接的处理：

    使用`props`属性`to`等于一个字符串`detail/${id}`。



## 使用`Link`的好处

+ 极大减少代码量，以及手动对导航栈的事件处理。

+ 提高用户体验：

    对比使用`history.push`的注册、登录按钮，因为整个组件被一个超链接`a`标签包裹起来，右键可以通过新窗口打开目标页面。

    <img src="https://i.loli.net/2021/07/16/EzOav4dbUicjDXG.png" alt="image-20210716111208594" style="zoom: 50%;" />

