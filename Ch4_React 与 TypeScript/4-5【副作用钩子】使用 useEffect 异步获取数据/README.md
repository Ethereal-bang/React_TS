# 4-5 【副作用钩子】使用 useEffect 异步获取数据

网站标题随着点击次数的改变同步更新；获得机器人数据

效果如下：

![image-20210612205123472](https://i.loli.net/2021/06/12/CgSAMoDPl2Tc5JR.png)



## 1. useEffect 将网站标题与 count 状态绑定

第二个参数决定 useEffect 什么时候被调用

```tsx
	useEffect(() => {
    document.title = `点击${count}次`
  }, [count])
```



## 2. useEffect 发送 api 请求
