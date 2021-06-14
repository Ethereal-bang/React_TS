# 4-9【高阶组件 HOC】withAddToCart

双数的商品打折

效果如下：

<img src="https://i.loli.net/2021/06/14/d5J7msSbUyTu4XF.png" alt="image-20210614162008527" style="zoom:50%;" />

## HOC

```tsx
const hoc = higherOrder(Component)
```

高阶组件就是返回了组件的函数，通过组件嵌套的方法给子组件添加更多功能

接收一个组件作为参数并返回一个经过改造的新组件

是 React 复用组件逻辑的一种高级技巧

作用：

+ 抽取重复代码，实现组件复用
+ 条件渲染，控制组件的渲染逻辑（*渲染劫持*）
+ 捕获/劫持 被处理组件的生命周期



## 普通方法

### 1.1 创建 RobotDiscount 组件

从 Robot 组件复制



### 1.2 条件渲染

使用三目运算符

```tsx
  {robotGallery.map((r, index) => 
      index % 2 == 0 ? (  // 双数的商品打折
          <RobotDiscount key={index} id={r.id} email={r.email} name={r.name} />    
      ) : (
          <Robot key={index} id={r.id} email={r.email} name={r.name} />
      )    
  )}
```



## 高阶组件实现上述功能

### 1. 新建 AddToCart 组件



### 2. with 开头的 HOC 声明函数

1. 将`Robot`组件的业务逻辑代码剪切到`AddToCart`组件返回的匿名函数内

2. 该函数与子组件的业务连接关系

3. 返回一个子组件

    ```tsx
      return <ChildComponent {...props} addToCart={addToCart} />
    ```



## 3. 更改`Robot`、`RobotDiscount`组件

1. `addToCart`作参数，补充`RobotProps`参数中`addToCart`类型：

    ```tsx
    export interface RobotProps {  
        id: number,
        name: string,
        email: string,
        addToCart: (id, name) => void;
    }
    
    const Robot : React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
    ```

2. 导出组件要改为诸如：

    ```tsx
    export default withAddToCart(RobotDiscount);
    ```





