

# 7-6【订阅 state】store 的连接与订阅

<img src="https://i.loli.net/2021/07/22/m5iZXQ9N1yhu37f.png" alt="image-20210722104847258" style="zoom:50%;" />

本节学习如何订阅 state，完成数据推送，实现`Header`组件的语言配置切换。



## 一、让`Header`订阅数据仓库

1. 以下代码放入`constructor`中：

    ```tsx
    store.subscribe(() => {
        const storeState = store.getState();
        this.setState({
            language: storeState.language,
        })
    });
    ```

2. 测试：

    组件已经能接收到数据改变。

    ![image-20210722110613994](https://i.loli.net/2021/07/22/xdtf6isXCoVJkgm.png)

## 二、同时有多个 action 情况：增加“添加新语言”功能

1. 修改`<Menu />`菜单选项。

2. 在`MenuClickHandle`中对新添加的语言进行处理：添加 action。

3. 添加 reducer。

4. 处理从 store 中收到的更新数据：

    ```tsx
    this.setState({
        language: storeState.language,
        languageList: storeState.languageList,
    })
    ```

5. 测试：

    在下拉菜单点击“添加新语言”后`languageList`更新：

    <img src="https://i.loli.net/2021/07/22/V5AUKpiwvQ473yd.png" alt="image-20210722145412404" style="zoom:50%;" />
