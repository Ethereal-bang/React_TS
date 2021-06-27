# 5-5【项目重构】组件化思想实践

重构 Header 和 Footer，用组件化形式封装。

显示效果：![image-20210627201244452](https://i.loli.net/2021/06/27/ureIodQ5Eaf63px.png)



## 1. 更改文件目录结构

新建`assets`、`components`文件夹。



## 2. 将 Header、Footer 组件代码分别移入文件夹

在三个地方均新增`index.ts`文件专门用于导出该组件。



## 3. 通过引用 components 的方法引用组件

```tsx
import { Header, Footer } from './components'
```

