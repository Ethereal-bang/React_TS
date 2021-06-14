# 5-3【项目启动】系统设计与项目初始化

显示效果:

<img src="https://i.loli.net/2021/06/14/yLhtGAuVlHFqmOB.png" alt="image-20210614201109680" style="zoom:33%;" />



## 一、项目初始化

### 1. 安装模块化 css 加载插件

```
cd react-travel
npm install typescript-plugin-css-modules --save-def
```



### 2. 其他配置

`tsconfig.json`、`.vscode`、`custom.d.ts`等直接从上个项目复制过来。



### 3. 修改为`App.module.css`

1. 将`App.css`改名
2. `import styles from "./App.module.css"`



