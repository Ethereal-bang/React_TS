# 4-10【自定义 Hook】useAddToCart()

用自定义 hook 改写`RobotDiscount`组件逻辑。

效果如下：

<img src="C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210614164005013.png" alt="image-20210614164005013" style="zoom: 33%;" />



## 自定义 hooks 要点

+ Hook 是函数
+ 命名以“use”开头
+ 内部可调用其他 hook 函数
+ 并非 React 特性（*定义时不用引入 react*）



## 1. 在`addToCart`自定义并导出`useAddToCart`钩子函数

业务逻辑与`withAddToCart`同，返回的不再是组件而是业务逻辑本身

```tsx
    const setState = useContext(appSetStateContext);
    const addToCart = (id, name) => {
        if (setState) { 
            setState((state) => {
                return {
                    ...state,       
                    shoppingCart: {
                        items: [...state.shoppingCart.items, {id, name}],   
                    },
                };
            });
        }
    }
    return addToCart;
```



## 2. 在`RobotDiscount`中引用

1. `addToCart`直接从钩子函数中得，而不是参数

    ```tsx
    interface RobotProps {  
        id: number,
        name: string,
        email: string,
    }
        
    const RobotDiscount : React.FC<RobotProps> = ({ id, name, email }) => {
        const value = useContext(appContext);
        const addToCart = useAddToCart();
    ```

2. 导出该组件本身，不需高阶组件：

    ```tsx
    // export default withAddToCart(Robot);
    
    export default RobotDiscount;
    ```

    
