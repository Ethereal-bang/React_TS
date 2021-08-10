# 10-3【注册页面】Antd + TS 表单处理

完成注册页面的 UI，处理用户注册，采用 antd 中表单组件配合 ts 进行开发。



## 一、使用 [Antd 表单组件](https://ant.design/components/form-cn/)

1. **复制样例代码**。

    显示效果：![image-20210810141214476](https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210810141214.png)

2. **添加样式**，宽度、居中。

    显示效果：![image-20210810141740258](https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210810141740.png)



## 二、用 Antd 表单组件 API 完成密码确认功能

一般注册时要求提供密码确认，仅当两次输入一致才能完成用户注册。虽然密码确认后端可能会处理，但若能从前端角度解决这类无效请求将会极大减轻后端负担

1. **粘贴`<Form.Item>`**。

2. **修改其中的`label`、`name`、`rules`字段**：

    `rules`字段需要填写的是一个元素为对象的列表。

    第 2 条规则密码确认要和密码一样。Antd 对这种跨组件数据验证的处理是使用函数：

    1. 参数中**`{}`展开取得`getFieldValue`**函数。

    2. 调用表单组件自带**`validator`**函数：

        第 1 个参数`ruleObject`用**`_`**表示==？==；第 2 个是传递来的数据`value`。

        验证返回 Promise。

        ```tsx
        <Form.Item
            label="Confirm Password"
            name="confirm"
            rules={[
                {
                    required: true,
                    message: 'Please input your confirm password!',
                },
                (({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject("密码确认不一致！");
                    }
                }))
            ]}
        >
        ```

3. **添加`hasFeedback`字段**。

显示效果：

![image-20210810151341741](../https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210810151341.png)



