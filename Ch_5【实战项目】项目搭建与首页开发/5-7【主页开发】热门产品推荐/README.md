# 5-7【主页开发】热门产品推荐

使用组件复用完成三个产品分类推荐组件（爆款推荐、新品上市、国内游推荐）。

总体效果：

![image-20210629143704312](https://i.loli.net/2021/06/29/sWIHEGR49VTu6Sv.png)

细节：

![image-20210629143745234](https://i.loli.net/2021/06/29/yucTon6x5HeNE1b.png)



## 一、`ProductCollection`产品分类组件

### 1. 在`App.tsx`中定义三个组件接口：

```tsx
<ProductCollection
                    title={<Typography.Title level={3} type="warning">爆款推荐</Typography.Title>}
                    sideImage={sideImage}
                    products={productList1}
                />
                <ProductCollection
                    title={<Typography.Title level={3} type="danger">新平上市</Typography.Title>}
                    sideImage={sideImage2}
                    products={productList2}
                />
                <ProductCollection
                    title={<Typography.Title level={3} type="success">国内游推荐</Typography.Title>}
                    sideImage={sideImage3}
                    products={productList3}
                />
```



### 2. 定义`ProductCollection`组件

#### 定义`ProductImage`组件

分情况渲染不同大小的图片。
其中图片有时显示不出来，是由于`product[0]`的网址的图片提取失败。




