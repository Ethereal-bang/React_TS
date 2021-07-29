# 8-4【API 连接】AJAX 异步获取推荐数据

用从 API 请求得到的数据替换网站中三个推荐列表的假数据。



## 一、删除相关`mockups`文件引用



## 二、处理异步 Ajax 请求

### 1. 使用构造函数完成对组件 state 的初始化：

```tsx
  constructor(props) {
      super(props);
      this.state = {
          productList: [],
      };
  }
```

还要对 state 的接口定义并定义在`React.Component`的泛型中。



### 2. 处理 API 请求

#### Ajax 处理框架：axios

1. 安装框架：

    ```
    npm install axios
    ```

2. 引入 axios。

3. 在`componentDidMount`函数中请求：

    ```tsx
    async componentDidMount() {
    	const { data } = await axios.get(	// 类似解构赋值
    		"http://123.56.149.216:8080/api/productCollections",
    		{
    			headers: {
    				"x-icode": "FB80558A73FA658E",
    			},
    		}
    	);
      
    	this.setState({
    		loading: false,
    		productList: data
    	});
    }
    ```

4. 根据 API 的输出格式修改推荐产品的数据。

5. 测试：

    ![image-20210729160434408](https://i.loli.net/2021/07/29/xq9NAGUavVrHYmp.png)

    这个错误与组件的生命周期及数据的加载时机有关：组件初始化时第一步调用构造函数，在这里 state 被设置成空数组；第二步 ui 组件挂载，render 函数执行；而我们的 api 访问操作在`componentDidMount`需要等 ui 挂载完毕才被调用。

    即 JSX 会渲染三个空列表，而我们的子组件没有处理空列表的能力，于是报错产生了。



### 3. 处理悬空数据

原理很简单，在没有数据的加上一个 loading indecator，而这个组件可以在 antd 中引用。

1. 从 antd 中引入`Spin`组件。

2. state 的初始化中，初始化 flag `loading`为`true`。

3. 加载完毕后改变`loading`值。

4. 设置`error`状态。

5. 在`componentDidMount`中使用`try catch`结构：

    ```tsx
      try {
        // ...
      } catch (error) {
          this.setState({
              error: error.message,
              loading: false
          })   
      }
    ```

6.  当`loading`为`true`时渲染`<Spin>`组件。

7. 处理网络出错问题。

8. 测试：

    ![image-20210729171100116](https://i.loli.net/2021/07/29/Sdl6gYBZKyba2ti.png)

    ![image-20210729171216989](https://i.loli.net/2021/07/29/PGTJXEAiNwkW1Lc.png)



### 4. 优化 API 请求

优化 API 请求，全局默认配置降低`icode`书写频率：

```tsx
// index.tsx
axios.defaults.headers['x-icode'] = 'C12CC1446DC2E1B2';
```





