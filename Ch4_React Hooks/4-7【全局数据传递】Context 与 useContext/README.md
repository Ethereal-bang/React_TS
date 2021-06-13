# 4-7【全局数据传递】Context 与 useContext

给标题下面和机器人组件传递作者信息。



## 1. props 实现组件间数据传递`username`

效果如下：

<img src="https://i.loli.net/2021/06/13/snGZVtm2OELTdBc.png" alt="image-20210613111801574" style="zoom:33%;" />

1. `interface`中定义`username`类型，并在组件中声明

    ```tsx
    interface Props {
        userName: string;
    }
    
    const App : React.FC<Props> = (props)=> {
    ```

2. 引用时使用`props.username`访问

3. `index.tsx`中要传入该参数

    ```tsx
      <App userName="阿莱克斯"/>
    ```

但如果要传给`App`子组件的子组件等，就需要用到 props 的深度注入，渲染效率越来越低且不易维护



## 2. Context 与 Provider、Consumer 传递数据

效果如下：

![image-20210613114514747](https://i.loli.net/2021/06/13/8vzDapxVPMUgLtq.png)

### 2.1 Provider

使用provider最重要的并不是为了数据的获取，而是为了当数据变化的时候可以同步反映在所有的子组件中

1. 在`index.tsx`中使用`React.createContext()`新建上下文对象并设置默认值，且因为要在该文件以外被引用，所以还要使用`export`导出

2. `Provider`给子组件提供数据支持，并将数据传入`Provider`的`value`属性里：

    ```tsx
      <appContext.Provider value={defaultContextValue}>
          <App />
      </appContext.Provider>
    ```



### 2.2  跳过 App 组件直接在 Robot 组件使用 context 对象

1. 使用`Consumer`组件获取数据

2. 在`Consumer`组件中使用`{}`加箭头函数返回 jsx 

3. 由箭头函数的参数`value`访问全局对象

    ```tsx
    	<p>作者：{value.username}</p>
    ```



## 3. 使用 useContext 钩子函数传递数据

使用 useContext 可以代替 Consumer 的大量模板代码，但还是需要 Provider。

```tsx
const value = useContext(appContext);

return (
        <div className={styles.cardContainer}>
    				{/* ... */}
    				<p>作者：{value.username}</p>
        </div>
    );
```

