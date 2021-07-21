# 7-5【更新 state】Action 与 Reducer 处理



## Redux 工作流

<img src="https://i.loli.net/2021/07/20/kX5iYdTGFAruMwc.png" alt="image-20210720165427552" style="zoom:50%;" />

这一节我们将学习 redux 的另一条路径——数据的更新路径：从组件 UI 向 store 发送命令，并通过执行 action 中的指令来实现数据`state`的更新，最终切换语言的配置。



## 在组件内部尝试切换语言

1. 给`<Menu />`加上点击事件获得下拉菜单切换的数据。

2. 使用`this.setState`把数据和语言配置`this.state.language`绑定：

    ```tsx
    menuClickHandle = (e) => {
        console.log(e);
        this.setState({ language: e.key })
    }
    ```

3. 测试：

    在下拉菜单中点击 English，UI 组件发生改变：<img src="https://i.loli.net/2021/07/20/d9ACkcHngOPG341.png" alt="image-20210720171954777" style="zoom:50%;" />

4. 思考：

    我们的全局语言配置保存在 redux store 内，但上文对 state 的修改作用域仅限`Header`组件本身，修改后的数据并不会传递给其他组件，而 store 中的语言配置也不会更新。



## 一、完成 dispatch action 动作

处理 store 这样的全局数据更新，要向 store 发送通知，即 dispatch action

1. 创建 action：

    照 redux 的标准，action 对象含有俩个字段：`type`字符串类型描述的是消息类型；`payload`任意类型存放消息数据。

    ```tsx
    const action = {
      type: 'change_language',
      payload: e.key,
    }
    ```

2. 向 store dispatch action：

    引用的`store`对象以及封装好了相应的`dispatch`方法：

    ```tsx
    store.dispatch(action)
    ```

3. 测试：

    在`reducer`中`console.log`传入的`state`和`action`后点击切换语言，控制台输出：

    ![image-20210721092710704](https://i.loli.net/2021/07/21/gfZlzV7Ay9vrx41.png)

    说明语言切换 action 分发成功了且 reducer 也收到了 store 传来的 state 以及 action 的消息。也就是说，现在可以在 reducer 中通过 action 的指令处理 state 数据了。



## 二、在 reducer 中通过 actoin 指令处理 state

1. 在 reducer 中使用判断语句创建新数据`newState`：

    ```tsx
    if (action.type === 'change_language') {
        const newState = { ...state, language: action.payload }; // 利用展开运算符拷贝对象
        return newState;
    }
    ```

    因为纯函数不能够修改参数，所以用拷贝对象获取新数据。

2. 测试：

    运行网站，虽然 action 成功 dispatch，reducer 也被激活，store 中数据也更新。
    <img src="https://i.loli.net/2021/07/21/3Ys2hr1EH7cyTRu.png" alt="image-20210721101802291" style="zoom:50%;" />
    但是`Header`组件中并没有反映出 store 数据的更新，即`Header`组件和 store 其实并没有真正的连接起来，而这个连接的过程实际上就是 **store 的订阅与推送**。
