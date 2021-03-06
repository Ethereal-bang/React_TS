# 7-2【概念理解】什么是 redux



## 设计模式

当网站复杂到一定程度，处理数据传递的开销非常巨大，我们需要使用设计模式。

所有组件不会直接通讯，而且数据也会全部放在一个叫 store 的数据仓库中，这就是 redux 架构

<img src="https://i.loli.net/2021/07/18/unqTrXihtZmo12V.png" alt="image-20210718212113112" style="zoom:33%;" /> 



## redux 原理

+ 剥离组件数据（*state*）
+ 数据统一存放在 store 中
+ 组件订阅（*subscribe*）store 获得数据
+ store 同步推送数据更新

总的来说，redux 就是数据仓库，将数据统一保存起来，在隔离了数据与 ui 的同时负责处理它们之间的联动关系



## redux 使用场景

使用 redux 是为了让 state 的变化可控可预测

+ 组件需要共享数据（*或状态 state*）的时候
+ 某个状态需要在任何地方都可被随时访问的时候
+ 某个组件需要改变另一个组件的状态的时候



## 难点

+ 数据流动不直观，类似事件驱动，调试困难
+ 很多晦涩的专业术语没弄懂前很难把握 redux 的整体方向，如`action`、`reducer`、`dispatch`
+ 文档稀烂，还不断引入各种新概念
