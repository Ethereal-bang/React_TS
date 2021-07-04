# 6-2【概念理解】路由与SPA

弄懂三个知识点：

+ 路由是什么
+ spa 是什么
+ 路由与 spa 有什么关系



## 路由

数据传输的路线的计算过程就是路由

简单来说，就是当浏览器的 url 变化时，浏览器页面相应的发生改变

现在网站的 url 地址与真实服务器文件结构不再一一对应而是通过某种特定算法映射起来：

<img src="https://i.loli.net/2021/07/04/W58ysfPbBo7q1xV.png" alt="image-20210704230817251" style="zoom: 50%;" />



## SPA（*单页网站应用*）

**什么是 SPA：**服务器把网站中所有的 JS、CSS、HTML文件打包一次性丢给浏览器。JS 劫持浏览器路由生成**虚拟路由**动态渲染页面 DOM 元素

SPA 非常符合现在网站前后端分离的趋势，服务器不负责 UI 输出，而专注于数据支持

**React 与 SPA：**React 使用的路由系统都是虚拟的。与后端服务器无关，与实际文件也没有一一对应的关系，例如：

+ 主页：`http://localhost:3000`
+ 搜索页面：`http://localhost:3000/search`



**React 路由框架：**

+ 综合性路由框架：**react-router**（*最主流、完整的 React 路由解决方案*）
+ 浏览器路由框架：react-keeper
+ 手机 app 框架（*react-native*）：react-navigation
