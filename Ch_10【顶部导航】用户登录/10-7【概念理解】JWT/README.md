# 10-7【概念理解】JWT 原理

什么是 JWT；为什么该使用 jwt；jwt 与 session 是什么关系。



## JWT 是什么

JWT 全称`json web token`，作用是**用户授权**（*authorization*）。

> **用户授权**：
>
> 当用户登录后，当前用户是否有足够权限访问特定资源。
>
> 当一个用户没有权限读取某个资源时，返回错误码应是`403 Forbidden`.



### Session

传统上，我们使用服务器的 Session 判断当前用户是否登录。

用户登录后，服务器会保存登录的 Session 信息，session id 通过 cookie 传给前端，http 请求会附带 cookie。

因为服务器需保存 Session，我们称之**有状态登录**。



### JWT 与 Session

JWT 彻底改变了用户授权与认证的过程

+ 替换 Cookie
+ JWT 信息只需保存在客户端
+ 无状态登录



## 有状态登录 VS 无状态登录

![image-20210811090221410](https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210811090228.png)

![image-20210811090328888](https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210811090328.png)

+ Session 需保存在服务器上，Session ID 保存在前端 cookie
+ JWT 只保存在客户端
+ 无状态登录优势：完美支持分布式部署，可以使用 1 个 Token 发给多个服务器



