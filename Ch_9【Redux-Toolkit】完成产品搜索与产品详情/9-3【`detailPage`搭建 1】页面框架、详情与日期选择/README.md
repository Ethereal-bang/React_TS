# 9-3【`DetailPage`搭建 1】页面框架、详情与日期选择

产品详情的页面初始化已在之前章节中完成，接下来要做的就是拼凑页面组件。在进入页面组件拼装之前，可以先通过调用 API 取得页面将会使用到的数据，这样开发中就有数据可以观察到了。



## 一、在`detailPage`组件中调取 API

1. 引入`axios`。

2. 从`react-router-dom`引入`useParams`，获得 URL 中路由参数。==?==

    ```tsx
    const { touristRouteId } = useParams<MatchParams>() 
    ```

3. `useState`来配置三个 state：`loading`、`product`、`error`。

4. `useEffect`中异步调用 api 并改变 state 状态。

5. UI 保护措施：请求失败。



## 二、搭建页面基本骨架



## 三、填充组件

### 1. 产品详情、日期选择组件



### 2. 产品简介组件

#### 使用 antd 中的`<Table />`组件

一个最简单的表单组件有两个属性需要提前定义：`columns`配置表格的行列设置；`dataSource`即表格数据。

1. 引入`columns`的定义`ColumnsType`：

    ```tsx
    import { ColumnssType } from 'antd/es/table'
    ```

2. 定义`columns`，此处需要 2 列：

    ```tsx
    const columns: ColumnsType = [
      {
        // ...
      },
      {
        // ...
      }
    ];
    ```

3. 配置行数据：

    1. 定义`RowType`。
    2. 组织表格数据。

4. 在 JSX 使用`Table />`组件：

    ```tsx
    <Table<RowType> columns={columns}  dataSource={tableDataSource}  />
    ```

    这时`columns`报错。

5. 把`ColumnsType`和`RowType`连接起来：

    ```tsx
    const  columns: ColumnsType<RowType> = [
    ```

    
