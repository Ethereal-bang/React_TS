# 10-10【登录页面】SignOut 登出业务处理

登录后更新`Header`，显示用户信息；完成登出的工作。新知识点如何通过解码 JWT token 取得用户数据。

显示效果：

<img src='https://gitee.com/ethereal-bang/images/raw/master/20210812111249.png' style='zoom: 50%'>



## 一、补充 i18n 语言配置



## 二、`<Header>`中连接 Redux 中与用户相关的数据

1. **取得 JWT**。

<hr>

### 2. 进行解码：

1. 安装`jwt-decode`插件：

    ```
    npm install jwt-decode
    ```

2. 引入 Jwt-decode 及其 ts 配置文件：

    ```tsx
    import jwt_decode, { JwtPayload as DefaultJwtPayload} from "jwt-decode";
    ```

3. 定义自己的`JwtPayload`接口：

    ```tsx
    interface JwtPayload extend DefaultJwtPayload {
      username: string,
    }
    ```

    只是多一个`username`字段，因为要在`<Header>`中显示。

    > **`username`来自**：
    >
    > Token 解码后`payload`内：
    >
    > <img src="https://gitee.com/ethereal-bang/images/raw/master/20210812104308.png" alt="image_JWT" style="zoom:60%;" />

 <hr>

3. **用`useState`创建组件的 State**：`username`

    ```tsx
    const [username, setUsername] = useState("") // ()内是初始值
    ```

4. **`useEffect`监测 JWT 变化**：变化则`setUsername`更新用户数据

    ```tsx
    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt)
            setUsername(token.username)
        }
    }, [jwt])
    ```

5. **处理登录后 UI 更新**：

    使用`{ jwt ? : }`的结构。

<hr>

### 6. 处理登出业务逻辑

1. `onClick`绑定`onLogout`函数。
2. `UserSlice`中在`reducers`字段添加`logOut`。
3. 在`onLogout`中 Dispatch 刚刚创建的 action。 
