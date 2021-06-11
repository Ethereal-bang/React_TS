# 3-12【事件驱动】React Event 事件处理

实现点击购物车控制下拉菜单的显示/隐藏。

效果如图：

![image-20210611151745572](https://i.loli.net/2021/06/11/NGKygVitT3Qwf7v.png)

## 事件封装

箭头函数使 this 不被丢失

```jsx
// 第一种写法
	handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      this.setState({ isOpen: !this.state.isOpen })
  }

		onClick={this.handleClick}

// 第二种写法
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({ isOpen: !this.state.isOpen })
  }

      onClick={(e) => {this.handleClick(e)}}	// 通过参数 e 获得点击事件类型
```

## 只接受 span 字符串的点击事件

通过类型匹配：

```tsx
	handleClick = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("e.target", e.target);
        console.log("e.currentTarget", e.currentTarget)
        if ((e.target as HTMLElement).nodeName === "SPAN") {
            this.setState({ isOpen: !this.state.isOpen });
        }
    })
```

