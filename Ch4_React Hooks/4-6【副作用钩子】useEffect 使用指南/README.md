# 4-6【副作用钩子】useEffect 使用指南

改写异步获取页面请求语句。

显示效果：

<img src="C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210612225921525.png" alt="image-20210612225921525" style="zoom: 33%;" />

异常情况：

<img src="C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210612225330806.png" alt="image-20210612225330806" style="zoom:33%;" />



## 1. 在 useEffect 中使用 async/await

以下面这种方式写入`async`而不是直接`useEffect(async () => {})`是因为会报以下错误：

<img src="C:\Users\HP\AppData\Roaming\Typora\typora-user-images\image-20210612220910121.png" alt="image-20210612220910121" style="zoom: 50%;" />

因此将该异步逻辑封装进函数`fetchData`里：

```tsx
    useEffect(() => {
        const fetchData = async () => {     
            const response =  await fetch(
                "https://jsonplaceholder.typicode.com/users"
            ); // 因为 fetch 的返回一个 http 请求响应
            // .then(response => response.json())
            // .then(data => setRobotGallery(data))
            const data = await response.json(); 
            setRobotGallery(data);
        };
        
        fetchData();
    }, [])
```



## 2. 处理 Loading

对请求后端数据而数据还没返回时的状态的处理。

1. 设置请求数据前后的`loading`状态改变。
2. 设置`loading`状态对应的不同显示效果



## 3. 处理异常

1. 设置`error`状态

2. `try/catch`结构

3. 条件渲染

    [条件渲染 - React](https://zh-hans.reactjs.org/docs/conditional-rendering.html)

