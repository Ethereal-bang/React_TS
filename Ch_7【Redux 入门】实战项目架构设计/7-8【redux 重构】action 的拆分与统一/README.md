# 7-8【redux 重构】action 的拆分与统一

目前项目整体代码架构依然比较混乱。本节将拆分所有 action，重新组织文件结构，配合 ts 实现 redux 的强类型，完成 redux 架构的重建。模块化状态和 action creator 是目前大多数企业采用的代码结构。

<img src="https://i.loli.net/2021/07/23/YGbdBHFoxcrku1i.png" alt="image-20210723150647528" style="zoom:50%;" />



## 一、利用工厂模式设计思想创建 action creator

1. 创建`redux`子文件夹`language`：

    实际上每个 reducer 处理的就是一个网站的功能模块，与之对应的也会有相应的 action，所以从架构角度我们可以按照模块给 reducer 和 action 划分文件夹。

2. 使用常数声明并导出且替换之前的 action 字符串：

    应该避免在 reducer 中使用字符串，从而避免出来`type`字符串打错字之类的低级错误。

### 3. 将 action 代码转移到 `languageActions`

1. 创建并导出更改和添加语言的 action 工厂`changeLanguageActionCreator`、`addLanguageActionCreator`：

    ```tsx
    interface AddLanguageAction {
        type: typeof ADD_LANGUAGE,
        payload: { name: string, code: string },
    }
    
    export const addLanguageActionCreator = (name: string, code: string) : AddLanguageAction => {
        return {    // 返回的是对象，下面的 type、payload 是该对象的属性（上文有定义
            type: ADD_LANGUAGE,
            payload: { name, code }
        }
    }
    ```

2. 强类型定义 redux

    1. 定义两个 action 类型的接口。

    2. 将两种类型接口混合后导出：

        ```tsx
        // languageActions.ts
        export type LauguageActionTypes = AddLauguageAction | ChangeLauguageAction
        ```

    3. 给两个 action creator 完成类型定义：

        `AddLauguageAction`接口在这里规定的是 action creator 返回的 action 类型

        ```tsx
        const addLanguageActionCreator = (name: string, code: string) : AddLanguageAction => {
        ```

    4. 给 reducer 绑定类型：

        ```tsx
        // languageReducer.ts
        export default (state = defaultState, action: LanguageActionTypes) => {
        ```

        现在输入 action 时，代码就会提供智能提示了。而 ts 的强大之处在于它可以动态区分现在传入的 action 类型，以下是`changeLanguage`和`addLanguage`情况 action 的不同数据类型：

        ![image-20210726110839939](https://i.loli.net/2021/07/26/2SrfeCFHqcY5lku.png)

        

        <img src="https://i.loli.net/2021/07/26/lgPfh7XrOU1TLu3.png" alt="image-20210726110404722" style="zoom:67%;" />

    

## 二、在`Header class`组件中使用 action creator

### 1. 原代码改为使用 action creator 创建 action

这里`Header.class.tsx`文件报错显示 action 类型与`store.dispatch `的参数不一致，改为 action creator 创建的 action 的话类型就能匹配一致了。







 



