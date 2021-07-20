# 7-3【访问 state】获取 store 数据

使用类组件`Header`学习如何访问 state，提取并订阅 store 中的数据。


## Redux 工作流

<img src="https://i.loli.net/2021/07/20/kX5iYdTGFAruMwc.png" alt="image-20210720165427552" style="zoom:50%;" />

## 


## 一、动态生成语言选择的下拉菜单

1. 在`Header`中引入上一节创建的`store`。

2. `store.getStore()`访问 store。

3. 通过对象的链式操作获得数据`storeState.language`、`storeState.languageList`。

4. 定义组件 state 的接口后放入泛型的第二个参数：

    有俩个方法：

    + 直接定义：

        ```tsx
        interface State {
        	language: "zh" | "en";
        	languageList: {name:string, code:string}[]
        }
        ```

        发现与`store`中的`languageState`几乎一样。

    + 为了避免代码重复可以使用继承`languageState`：

        首先`export` `LanguageState`再引入，然后

        ```tsx
        interface State extends LanguageState {}
        ```

        但是这种组件继承的方式会深度绑定`store`类型，有时反而不利于开发。

5. 通过`store`中的数据动态渲染语言菜单：

    在`<Menu />`组件中改用 map 遍历`this.state.languageList`动态渲染菜单选项，实现效果如下：<img src="https://i.loli.net/2021/07/20/BLTFePcJKgNEusC.png" alt="image-20210720164725299" style="zoom: 50%;" />

6. 三元运算符判断`this.state.language`显示当前语言名称，实现效果如下：<img src="https://i.loli.net/2021/07/20/Txbzjp82sDc1G7u.png" alt="image-20210720164902794" style="zoom: 50%;" />

