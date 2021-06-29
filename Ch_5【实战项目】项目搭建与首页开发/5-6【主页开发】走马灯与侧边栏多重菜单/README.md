# 5-6【主页开发】走马灯与侧边栏多重菜单

显示效果：![image-20210629143438218](https://i.loli.net/2021/06/29/B7UjrXNJ4nievhP.png)



## 一、 在`Header`与`Footer`中加入`content`部分

在`App.module.css`中加入样式



## 二、采用 Ant Design Grid 栅格布局方案

核心思想是将页面布局以组件化的形式确定



### 1. 引入`Row`、`Col`组件

```tsx
  <Row style={{ marginTop: 20 }}>
      <Col span={6}>
          <div style={{ background: 'red' }}>多重菜单</div>
      </Col>
      <Col span={18}>
          <div style={{ background: 'blue' }}>走马灯</div>
      </Col>
  </Row>
```

显示效果如下：

![image-20210627215021734](https://i.loli.net/2021/06/27/f2zIJGuKHZLYbTc.png)



### 2. 在两个列布局内填充组件

#### (1). 侧边栏组件`SideMenu`

1. 以动态数据驱动的方式自动加载组件
2. 没有后端新增假数据文件
3. 核心元素是 Ant Design 中的`Menu`组件
4. 给菜单加上总体 css 样式

#### (2).  走马灯轮播组件`Carousel`

1. 从 antd 引入组件时因为与命名冲突采用重命名。

    ```tsx
    import { Image, Carousel as AntCarousel } from "antd";
    ```

2. 用`Image`组件引入三张图片。

3. 设置走马灯的总体样式

#### (3). 导出并引用两组件

