# 11-3【UI 搭建】购物车页面初始化

分为四个阶段完成购物车：

1. 购物车页面初始化。
2. 购物车 Store 的搭建，会使用到 rtk。
3. 连接 Store 加载购物车。
4. 购物车下单功能。

本节完成购物车页面初始化及 UI 组件搭建。



## 一、购物车页面初始化

+ 使用`Row`、`Col`布局：

    将页面主体分为两部分，左边购物车清单，右边支付卡组件。

    ```tsx
    <MainLayout>
    	<Row>
      	<Col span={16}>
    			{/* ... */}    
        </Col>
        <Col span={8}>
    			<Affix>
          	{/* ... */}
          </Affix>
        </Col>
      </Row>
    </MainLayout>
    ```

    > **Affix**组件：
    >
    > [固钉 Affix - Ant Design](https://ant.design/components/affix-cn/#header)

效果：

<img src="https://gitee.com/ethereal-bang/images/raw/master/20210831161956.png" alt="image-20210831161956140" style="zoom:30%;" />

