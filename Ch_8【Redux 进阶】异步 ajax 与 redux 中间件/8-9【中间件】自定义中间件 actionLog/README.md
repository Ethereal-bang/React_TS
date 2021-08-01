# 8-9【中间件】自定义中间件`actionLog`

自定义一个实现 action 和 state 数据打印功能的中间件，这个中间件会拦截所有 action，然后我们会通过`console.log`打印当前的 action 及状态。



## Redux 中间件公式

```typescript
const middleware =  (store)  =>  (next) => (action) => { }
```

Redux 中间件共嵌套了三层函数，分别传递三个参数，其中`next`是 dispatch 函数。这是函数式编程中柯里化的典型代表。



## 一、自定义中间件`actionLog`代码

1. 从`redux`引入中间件返回类型`Middleware`。

2. 完成`actionLog`的业务逻辑。

3. 把`actionLog`传入`store.ts`中的`applyMiddleware`参数。

4. 测试：

    切换语言，查看控制台显示：

    ![image-20210801152411014](https:cdn.jsdelivr.net/gh/Ethereal-bang/Images/Typora_Images/20210801152411.png)

    
