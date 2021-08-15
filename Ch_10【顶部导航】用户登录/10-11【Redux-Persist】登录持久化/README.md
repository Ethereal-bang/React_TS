# 10-11【Redux-Persist】登录持久化

用户登录后只要刷新或打开新页面，Redux store 就会被重置，jwt token 会被清空，登录就失效了。所以需要把 Token 保存起来，下次用户打开网站时可直接登录；多个默认导出的方式。



## 网站数据保存的三种方式

**Cookie、session、web storage**

+ Cookie 和 web storage 保存在浏览器；session 保存在服务器。
+ Cookie 不超过 4K；web storage 上限 5 MB；session 无上限。
+ Cookie 和 web storage 安全性差；session 性能差。
+ Cookie 在 http 请求中自动携带；web storage 不会自动发送。



## Web Storage

由于项目使用了 JWT 无状态登录，所以只能选择 cookie 和 web storage 保存，在本项目中**采用 web storage 做数据持久化**。

1. **Web Storage 优点**：

    有效降低网络流量

    快速显示数据

    临时存储

2. **Web Storage 类型**：

    + SessionStorage：仅在当前浏览器窗口关闭之前有效
    + LocalStorage：始终有效期，窗口关闭也一直保存

    > **LoacalStorage**：
    >
    > 可简单理解成字典类型数据库，可用作数据持久化。

    因此本项目使用 LocalStorage。



## 一、Redux-persist 创建 Reducer、store

1. **安装插件`redux-persist`**。

2. **引入`persistStore`、`persistReducer`**自`redux-persist`。

3. **Redux-Persist 的配置信息`persistConfig`**对象：

    ```typescript
    const persistConfig = {
        key: 'root',    // 数据根目录
        storage,        // 数据保存方式，localStorage
        whitelist: ['user'] // 白名单
    }
    ```

    配置信息有 2 个必选字段，`key`、`storage`，`storage`需引用自`redux-persist/lib/storage`；可选字段黑名单、白名单，这里的`user`指只保存`rootReducer`中的`user`字段。

4. **用`persistReducer`创建基于 localStorage 的**加强版 **reducer**：

    ```typescript
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    ```

5. **`persistReducer`传入`configureStore`中**`reducer`字段。

    ```typescript
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
        devTools: true, 
    })
    ```

6. **使用`persistStore`创建持久化的 Store 并导出**：

    不仅需要导出原本的`store`，还要导出持久化`persistor`。

    ```typescript
    export default { store, persistor };
    ```



## 二、使用持久化 Store

1. **修改`index.ts`文件中引入**：

    ```tsx
    // 原：import store from './redux/store';
    import rootStore from './redux/store'
    ```

    现在的`rootStore`包括导出的`store, persistor`：

    ![image-20210815093540603](https://gitee.com/ethereal-bang/images/raw/master/20210815093547.png)

2. **引入`PersistGate`依赖**：

    > **PersistGate**：
    >
    > 是 Redux-Persist 针对 react （*Redux-Persist 插件还可以用在其它框架*）开发的 provider。

3. **外层组件中传入 Store**：

    ```tsx
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={rootStore.store}>
                <PersistGate persistor={rootStore.persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
    ```

    

## 三、测试持久化

打开网站点击登录，重启浏览器，用户依然是登录状态。

网站警告："Assign object to a variable before exporting as module default  import/no-anonymous-default-export"，源于此处导出语句：`export default { store, persistor }`。

可以改为：

```typescript
const rootStore = {
    store, 
    persistor,
}
export default rootStore;
```

这样改后依然可以在引用中：

![image-20210815100031544](https://gitee.com/ethereal-bang/images/raw/master/20210815100031.png)

参考自[get rid of the warning import/no-anonymous-default-export in React——Stack overflow](https://stackoverflow.com/questions/64729264/how-can-i-get-rid-of-the-warning-import-no-anonymous-default-export-in-react)

