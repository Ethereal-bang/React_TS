# 3-6【组件化】配置 React 的 CSS 模组
为 App 和 Robot 组件分别添加样式
效果如下：
![image](https://user-images.githubusercontent.com/70147063/121616027-ae1c6880-ca94-11eb-828f-c4c6dbb9584d.png)



## 1. 给 App 组件添加样式

1. 删掉`import "./App.css"`，改为：

    ```tsx
    import styles from "./App.css"
    ```

2. 此时报错，则需创建`.src/custom.d.ts`文件，并定义 css 的声明：

    ```tsx
    declare module "*.css" {
      const css: { [key: string]: string};
      export default css;
    }
    ```

    原始的类名和值都将会转换成此时的对象`css`，以实现访问对象获取样式的功能。

3. 对 css 文件使用命名规范，改为：`.module.css`



## 引用样式的两种方式

1. 直接引入整个 css 文件

    ```tsx
    import './index.css'
    
      <div className="app" />
    ```

2. JSS 模块化引入组件

    ```tsx
    import style from './index.css'
    
      <div className={styles.app} />
    ```

    

## 解析 CSS 文件并生成 TS 引用类型

1. 安装第三方插件：

    ```
    npm install typescript-plugin-css-modules --save-dev
    ```

2. 配置 sdk：

    新建`.vscode/settings.json`进行配置



## 2. 给 Robot 组件添加样式

