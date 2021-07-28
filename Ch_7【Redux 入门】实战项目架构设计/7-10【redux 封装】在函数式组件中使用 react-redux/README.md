# 7-10【redux 封装】在函数式组件中使用 react-redux

在类组件中，使用 react-redux 后的代码非常繁琐且充斥着大量模板代码。这一节将使用函数式组件重现上一节的内容。利用 hooks 完成 store 的订阅、action 的分发，并且杜绝一切模板代码。

这一节还是使用`Header`组件，不过将启用函数式组件版本。

先将`header`文件夹下的`index`文件中导出改为函数式组件。



## 一、使用`useSelector`连接 store 获得 state

1. 从 react-redux 引入 hook 函数`useSelector`。

2. 使用`useSelector`函数帮助我们从 store 中连接 state：

    ```tsx
    const language = useSelector((state: RootState) => state.language);
    ```

3. 将`RootState`从组件中剥离：

    > 上面的写法有个问题：使用 hook 函数的其中一个意义是为了解决 store 和组件的耦合问题。
    >
    > 但如果在每次使用 hook 时都指定 store 的类型就意为着组件与 store 绑定起来了，组件与 store 的深度绑定会导致组件无法复用。

    1. 在`redux`文件夹下新建`hooks.ts`文件：

        ```ts
        import {
            useSelector as useReduxSelector,
            TypedUseSelectorHook
        } from "react-redux";
        import { RootState } from "./store";
        
        export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
        ```

        实际上没有创建新的 hook，只是套用旧的`useSelector`函数加上了符合项目要求的类型定义而已。

    2. 改为从`hooks`文件引用`useSelector`。

    3. 删除在`useSelector`函数中原本对`state` 类型的定义。

    现在，该组件完全从 store 中剥离出来了。同时，对 store 中的数据也可以动态获得对应数据类型了，为接下来的代码规范打下良好基础。



## 二、使用`useDispatch` dispatch state

1. 从`react-redux`引用`useDispatch`。

2. `const dispatch = useDispatch();`

3. （*可选*）给`dispatch`定义类型：（*此时的 `dispatch` 是 `any` 类型*）

    + 从`redux`引入`dispatch`接口定义：`Dispatch`。
    + 从`languageAction`引入`LanguageActionTypes`。

    3. 把 action 的类型通过泛型定义：

        ```tsx
        const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
        ```

    但是并不建议这样定义，因为这样的强类型并没起到太大意义。

### 4. 使用`dispatch`更新语言切换的下拉菜单

   	     1. jsx 更新代码照搬类组件逻辑
   	     2. 处理`menuClickHandle`事件处理函数
   	     3. 在`menuClickHandle`中使用`dispatch`

<hr>

5.国际化
