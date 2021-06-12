# 4-3【状态钩子】使用 useState 管理组件 state

使用函数式组件重写计数器

效果如下：

![image-20210612202545896](https://i.loli.net/2021/06/12/XSBQ7NdveFagqPC.png)



## 1. 将类组件改写为函数组件

```tsx
const App : React.FC = (props)=> {
```



## 2. 使用 useState 初始化状态

```tsx
    const [count, setCount] = useState<number>(0);
```

