# 9-4【`detailPage`搭建 2】页面框架、详情与日期选择

上一节使用 MVC 的架构通过 api 取得数据、完成页面骨架、以及页面第一个组件。这一节接着完成剩下的部分。



## 一、完成产品特色等组件

1. 显示标题

<hr>


### 2. 处理 HTML 字符串的显示

通过观察数据得知，这几个组件的数据都是 HTML 字符串的形式，也就是说，不管这几个组件内容多复杂，后端给的 html 字符串直接拿来显示就可，不需对内容做任何处理。

React 为了防止注入攻击，有一个特殊的html 处理 机制。我们无法在 react 原生直接渲染 html，必须用 react 的 api 来进行处理：`dangerouslySetInnerHTML`

```tsx
<div dangerouslySetInnerHTML={{__html: product.features}}></div>
```

这个 API 需要连续使用 **2 个花括号**，使用对象的方式来显示 html，对象名称：**`__html_`**

这里我们需要注入的是`product.features`

<hr>


3. 如法炮制“费用”、“预订须知”组件

     

## 二、完成商品评价模块

### 1. `ProductComments`组件

借助 antd 中`Comment`、`List`组件完成。

<hr>


2. 引入商品评价假数据中列表`commentMockData`。

3. 渲染：

    ```tsx
    <ProductComments data={commentMockData} />
    ```



## 三、完成锚点菜单

使用锚点分别对应“产品特色”、“费用”、“预定须知”、“用户评价”。

使用 antd 的 `Anchor`、`Menu`组件搭建，在`Anchor.Link`组件中使用`href`指向页面的组件 id：

```tsx
{/* 锚点菜单 */}
<Anchor className={styles["product-detail-anchor"]}>
	<Menu mode="horizontal">
		<Menu.Item key="1">
			<Anchor.Link href="#product-feature" title="产品特色"></Anchor.Link>
		</Menu.Item>
	// ...
```



