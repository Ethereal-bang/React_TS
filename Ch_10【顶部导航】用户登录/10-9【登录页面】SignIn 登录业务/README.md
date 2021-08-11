# 10-9【登录页面】SignIn 登录业务处理
本节使用 Redux-Toolkit 完成 Redux 相关工作，还将涉及一个新知识点如何通过解码取得 jwt token。



## 一、创建用户的 Redux 数据仓库 user slice

因为用户登录状态需要系统持续性的维护，所以应把登录状态放入 Redux store 中。

1. **创建`slice.ts`**。类似其余`slice`文件

2. **测试 API**：

    <img src="https://gitee.com/ethereal-bang/images/raw/master/20210811150239.png" alt="image-20210811150225330" style="zoom:50%;" />

3.  **改动`slice`**：注意将`axios.get`改为`.post`：

    ```typescript
    async (parameters: {
        email: string,
        password: string,
    }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/auth/login`, {
                email: parameters.email,
                password: parameters.password,
            }
        );
        return data.token;
    }
    ```

4. **将`slice`加入`store.ts`中`combineReducers`**。



## 二、处理登录后逻辑

`signInForm`页面：

1. **用`useSelector`**：从 Store 中连接 state。
2. **用`useDispatch`**。
3. **Dispatch action**，这里的 slice。

这时用户点击登录后，如何知道登录成功就需要用到 JWT，如果含有`jwt`数据说明登录成功。

4. **`useEffect`**：

    ```tsx
    useEffect(() => {
        if (jwt !== null) {
            history.push("/");
        }
    }, [jwt])
    ```

    第二个参数传入`jwt`，表示`jwt`一发生变化就判断，成功则`push`到主页。

5. **添加“转菊花”效果**：Antd `Form`组件中有相应功能

    ```tsx
    <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
            Submit
        </Button>
    </Form.Item>
    ```

    当`Button` `loading`为 True 启用效果，`loading`数据来源于 store 中。

