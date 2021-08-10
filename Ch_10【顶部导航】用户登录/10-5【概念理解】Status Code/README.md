# 10-5【概念理解】Status Code

学习 HTTP 状态码。

网站开发中经常会用到 HTTP 状态码，常用的有 200、201、204、401、403、404、500。



## 状态码

状态码位于 HTTP response 的第一行中，是一个 3 位数字的状态码和一个字符串格式的状态消息。

> 3 位数字状态码便于程序处理，状态消息方便程序员理解。



<table>
  <tr>
  	<th>级别</th>
    <th>概述</th>
    <th>描述</th>
    <th>常见状态码</th>
  </tr>
  <tr>
  	<td>1XX</td>
  	<td>Informational</td>
    <td>接受的请求正在处理</td>
    <td>-</td>
  </tr>
  <tr>
  	<td>2XX</td>
    <td>Success</td>
    <td>请求正常处理完毕</td>
    <td>200 OK，201 Created，204 No Content</td>
  </tr>
  <tr>
  	<td>3XX</td>
    <td>Redirection</td>
    <td>需要客户端附加操作</td>
  	<td>301/302 Moved Permanently，304 Not Modified</td>
  </tr>
  <tr>
  	<td>4XX</td>
    <td>Client Error</td>
    <td>客户端无法处理请求</td>
    <td>400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found</td>
  </tr>
  <tr>
  	<td>5XX</td>
    <td>Server Error</td>
    <td>服务器处理请求出错</td>
    <td>500 Internal Server Error, 502 Bad Gateway</td>
  </tr>
</table>

+ 3XX 状态码是重定向状态码，告诉客户端访问的资源已被转移到其他地方，服务器会发送一个重定向状态码和可选的 Location Header，告诉客户端新的资源地址位置。

+ 4XX 状态码代表客户端提交了错误请求导致后端无法处理：

    400 Bad Request 表示发送的请求是错误的，例如客户端无法解析 JSON；401 表示用户还没登录，403 表示登录了但没有权限；404 表示所请求的资源或页面不存在。

+ 5XX 的状态码表示请求合法、服务器出错。对客户端来说无能为力。
