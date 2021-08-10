# 10-4【注册页面】注册业务逻辑处理

上一节完成了注册页面的 UI，这一节实现用户注册业务逻辑。注册业务主要来自后端。

显示效果：

![image-20210810205652647](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210810205652.png)

## 一、Postman 里测试 API

![image-20210810154534056](https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210810154534.png)

返回`204 No Content`说明已经注册成功，测试发现若重复注册则返回`400 Bad Request`，若密码确认不一致返回`422 Unprocessable Entity`。



## 二、代码实现注册功能

因为整个注册过程是完全无状态，没有任何数据往来，所以没必要使用 Redux 实现 api 操作管理，所有 api 请求都可以直接在页面调用。

1. **发送注册请求**：

    注册应该在提交表单且验证成功时处理，也就是`onFinish`函数。

    ```tsx
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        await axios.post("http://123.56.149.216:8080/auth/register", {
          email: values.username,
          password: values.password,
          confirmPassword: values.confirm,
        })};
    // ...
      <Form
        onFinish={onFinish}
        // ...        
    ```

    因为请求时异步处理，所以给`onFinish`函数加上关键词`async`。

    POST 请求第 2 个参数填入请求 body（*请求主体*），values 来自`<Form>`的`name`字段。

2. **重定向到登录页面**：

    ```tsx
    const history = useHistory();
    // ...
      await axios.post("http://123.56.149.216:8080/auth/register", {
          email: values.username,
          password: values.password,
          confirmPassword: values.confirm,
      })
      history.push('/signIn');
    ```

    用户注册成功后。

3. **处理请求失败**：Try catch 弹窗、报错。

