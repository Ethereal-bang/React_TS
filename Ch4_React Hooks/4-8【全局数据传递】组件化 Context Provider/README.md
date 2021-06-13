# 4-8【全局数据传递】组件化 Context Provider

传递作者信息；完成购物车功能

效果如下：

![image-20210613224711769](https://i.loli.net/2021/06/13/Vfk154XLElTInFN.png)

## 一、 上下文关系对象 Provider 组件化

### 1. 新建`AppState.tsx`文件存放全局 state 和 context

将整个网站的全局状态保存在一个对象中，在各个组件共享

#### (1). 将购物车存入 state

```tsx
interface AppStateValue {	// 类型声明
    username: string,
    shoppingCart: { items: {id: number, name: string}[] }
}

const defaultContextValue : AppStateValue = {
    username: '阿莱克斯',
    shoppingCart: { items: [] } // 是一个对象包含列表 items
}
```



#### (2). 创建 Provider 组件

相当于包裹 App 组件的 Provider。

```tsx
export const AppStateProvider: React.FC = (props) => {
    const [state, setState] = useState(defaultContextValue);
    return <appContext.Provider value={state}>  // ?HOC
        {props.children}
    </appContext.Provider>
}
```

这个`AppStateProvider`组件相当于高阶函数 HOC ，功能是将所有子组件包裹起来并从全局的角度来提供数据支持。



### 2. 在`index`中导入 Provider 组件

```tsx
    <AppStateProvider>
        <App />
    </AppStateProvider>
```

注意这里已经不需要再传入`value={defaultStateValue}`，因为前面定义 Context 组件时已经返回了带有`value`的 Provider。



### 3. 在`Robot`组件中导入`appContext`全局数据

```tsx
import { appContext } from "../AppState";

const Robot: React.FC<RobotProps> = ({ id, name, email }) => {
  const value = useContext(appContext)
  return (
  	<div>
    	<p>作者：{value.username}</p>
```



## 二、利用组件化的 Provider 实现购物车功能

### 1. 新建 context 连接`setState`函数

```tsx
export const appSetStateContext = React.createContext<
    React.Dispatch<React.SetStateAction<AppStateValue>> | undefined	// 因为初始化值 undefined 所以类型声明除了 setState 还有 undefined
>(undefined);

export const AppStateProvider: React.FC = (props) => {
    const [state, setState] = useState(defaultContextValue);
    return <appContext.Provider value={state}>  
        <appSetStateContext.Provider value={setState}>	{/* 新建 Provider */}
            {props.children}
        </appSetStateContext.Provider>
        
    </appContext.Provider>
}
```



### 2. 点击加入购物车后更新购物车状态

```tsx
      const addTocart = () => {
        if (setState)  // 因为初始化是 undefined
            setState(state => {
                return {
                    ...state,       /* ？作用 */
                    shoppingCart: {
                        items: [...state.shoppingCart.items, {id, name}]    
                    }
                }
            })
      }
```



### 3. 在类组件`ShoppingCart`中用 Consumer 读取 context 购物车状态

在 render 部分的 jsx 代码用 Consumer 包裹，箭头函数参数`value`，返回该 jsx 代码
