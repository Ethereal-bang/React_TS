# 3-13【异步处理】获取网络 API 数据

用从 api 请求得到的数据渲染机器人画廊，取代前面使用的假数据

效果如下：

![image-20210611193223472](https://i.loli.net/2021/06/11/8sdIUBfqpQFHmeo.png)



## 1. 使用 componentDidMount 初始化网络数据



## 2. 从 API 异步获取数据

```tsx
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => this.setState({ robotGallery: data }));
    }
```

