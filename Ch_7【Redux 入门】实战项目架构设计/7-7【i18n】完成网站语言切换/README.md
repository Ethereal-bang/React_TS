# 7-7【i18n】完成网站语言切换

加载语言文件，实现网站的国际化。



## i18n——国际化

国际化简称 i18n，对这个网站来说 i18n 要求在不修改内部代码的情况下能根据不同的语言及地区显示相应的界面，其中最能体现 i18n 的就是各种语言的切换。



## i18n原理

前端项目中，每一种语言文件都会被作为静态资源单独保存下来。一般可以使用 json 或 xml 的格式来保存语言数据，每种语言对应一个文件，当系统切换语言设置时，网站所使用的语言文件也会随之切换

这样可以彻底分离字符串与 UI，有效避免为了实现国际化而镜像整个网站的行为。



## i18n 工具

前端项目中可以选择的框架非常多，但 **i18next** 框架是目前最主流、好用的国际化框架。

针对 React 项目，i18next 还有一个配套的框架插件叫做 **react-i18next**，为 react 项目提供了大量专有 api，高阶组件、以及 hooks。



## 一、react-i18next 配置

[react-i18next 官网](https://react.i18next.com/guides/quick-start)

### 1. 安装项目依赖：

```tsx
npm install react-i18next i18next --save
```

且 react-i18next、i18next 俩个依赖框架都原生支持 TS，不需额外安装相关的 ts 类型声明文件

### 2. 配置 i18next 系统：

1. 新建文件夹`i18n`保存所有与国际化相关代码。

2. 新建 i18n 配置文件`configs.ts`。

3. 初始化配置`configs.ts`：

    ```tsx
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    ```

4. 创建语言文件包：

    从这步开始与官方文档有出入，因为这个项目使用的是外部文件作为国际化语言的数据源，而这俩个版本（*中文、英文*）都用 json 文件形式（*`en.json`、`zh.json`*）保存在了项目中。

    语言文件就是普通的 json 对象，数据组织形式随意定义

5. 加载语言文件：

    ```typescript
    import translation_en from "./en.json";
    import translation_zh from "./zh.json";
    ```

6. 定义代表语言资源的`resource`本地变量：

    ```typescript
    const resources = {
    	en: { translation: translation_en },
    	zh: { translation: translation_zh },
    };
    ```

7. 复制并微调官方文档内所有剩余代码：

    删掉`keySeparator`该行，且将默认语言改为中文`zh`。

    ```typescript
    i18n
    	.use(initReactI18next) // passes i18n down to react-i18next
    	.init({
    		resources,
    		lng: "zh",
    		// keySeparator: true, // we do not use keys in form messages.welcome
    		interpolation: {
    			escapeValue: false, // react already safes from xss
    		},
    	});
    export default i18n;
    ```



+ 配置完成，可以在项目中启动 i18next 框架了



## 二、启动 i18next 框架

i18next 框架的基本原理就是 **context**

1. 在项目的启动文件`index.tsx`中引入创建的 i18n 配置：

    ```tsx
    import "./i18n/configs"
    ```



## 三、使用 i18n ——获取全局数据 context

获取全局数据有俩种方式：在类组件中使用 HOC；在函数式组件种使用 hooks



+ ### 在`homePage`中使用 HOC 获取

1. 从 react-i18next 引入 HOC 函数`withTranslation`。

2. 修改`HomePage`组件：

    为与后文命名不冲突，改为`HomePageComponent`；去掉这里的`export`。

3. 使用高阶函数`withTranslation`完成语言配置数据的注入：

    ```tsx
    export const HomePage = withTranslation()(HomePageComponent);
    ```

4. 在`HomePageComponent`组件中使用语言对象：

    当完成 i18n 的高阶组件后，`HomePageComponent`的`props`中就会追加一个`t`函数（*translation 缩写*），利用该函数来访问语言文件中的 json 对象

    ```tsx
    console.log(this.props.t)
    ```

    1. 传入 i18n 的 ts 类型定义`WithTranslation`放进组件定义的泛型。

    2. 使用`t`的函数：

        字符串实际上是定义在 json 文件中的

        1. 替换的字符串以“爆款推荐”为例，在 json 文件中为`hot_recommended`，那就是`{this.props.t('home_page.hot_recommended')}`。

        2. 其余类似。

            为避免重复，可以定义：==？==

            ```tsx
            const { t } = this.props;	// 这样定义的 t 是个类型（，去掉 {} 定义的是个值
            ```

            ![image-20210723101617577](https://i.loli.net/2021/07/23/geWsuofZLwMXG96.png)

            ![image-20210723101742097](https://i.loli.net/2021/07/23/jPBF6MSGfA9QtaY.png)

5. 测试：

    <img src="https://i.loli.net/2021/07/23/TMsJ9jWzCP4KriR.png" alt="image-20210723102931583" style="zoom:30%;" />

    说明字符串替换成功，但语言切换为英文后没有效果。



+ ### 在`Footer`组件中使用 hooks 获取

1. 从 i18next 引入 hooks `useTranslation`。

2. 使用该 hooks：

    花括号展开得到`t`函数：

    ```tsx
    const { t } = useTranslation();
    ```

3. 替换字符串。

4. 测试：

    <img src="https://i.loli.net/2021/07/23/1SeDEWMolhU6V8K.png" alt="image-20210723104151516" style="zoom:33%;" />

    字符串替换成功。



### 3. 完成`Header`组件的获取

+ 使用 HOC 函数`withTranslation`导出`Header`组件：

    ```tsx
    export const Header = withTranslation()(withRouter(HeaderComponent));
    ```

+ 在`HeaderComponent`的`props`属性中使用`&`操作符添加`WithTranslation`定义：

    ```tsx
    class HeaderComponnet extends React.Component<RouteComponentProps & WithTranslation, State> {
    ```



## 四、实现网站中英文切换

i18next 提供了语言切换的 api ，但是在哪里使用这个函数是值得考虑的。

我们可以在`languageReducer`处理语言配置切换时调用 i18next。

1. 导入 i18next。

2. 调用`changeLanguage` api：

    ```tsx
    switch (action.type) {
            case 'change_language':
                i18n.changeLanguage(action.payload)
    ```

3. 测试：

    点击“English”：<img src="https://i.loli.net/2021/07/23/q8W9SbyrodYPxZH.png" alt="image-20210723110512923" style="zoom:35%;" />

4. 代码缺陷：

    根据 redux 的定义所有 reducer 必须是纯函数（*没有副作用的函数*），在这里使用了`changeLanguage`函数改变了语言的配置文件产生了副作用，在原则上来说这是不被允许的。如何改进将在下一章学习。
