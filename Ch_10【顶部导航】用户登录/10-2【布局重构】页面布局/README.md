# 10-2【布局重构】页面布局
优化布局代码，初始化注册/登录页面。


## DRY 原则

DRY：Do not repeat yourself

代码应保持独立性，能复用的就不要重复写代码

分析已有的项目发现，大多页面的主体结构都是相同的，如`Header`、`Footer`及`div`元素包裹。



## 一、页面布局

网站可分为 2 种页面布局：一种是主页、搜索页面等；一种是没有页眉页脚的登录、注册页面。



### 1. 完成 MainLayout

1. **创建页面布局文件夹**`layouts/mainLayout`和`layouts/userLayout`。

2. **提取**`HomePage`**布局代码**。

3. **将页面内容传入**`mainLayout`，`{}`展开`MainLayout`组件参数`children`：

    ```tsx
    <div className={styles['page-content']}>{children}</div>
    ```

    `children`是每个 React 组件自带的一个 props 属性，可以通过`children`字段传递渲染数据。

4. **将其余页面代码放入`<MainLayout>`**，主页、产品详情、产品搜索。



## 2. 完成 UserLayout

显示效果：![image-20210810115119896](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210810115127.png)
