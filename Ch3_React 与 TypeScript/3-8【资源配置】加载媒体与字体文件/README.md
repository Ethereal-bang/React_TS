# 3-8【资源配置】加载媒体与字体文件

效果如图：

![image-20210611095447268](https://i.loli.net/2021/06/11/lK9rp2xXM8gJWce.png)



## 1. 新建 assets 文件夹存放媒体资源文件



## 2. 引用 logo



## 3.引入字体——全局样式

因为字体是全局样式，所以需在`index.css`文件中引入：

```css
@font-face {
  font-family: 'Slidefu';
  src: local('Slidefu'), url(./assets/fonts/Slidefu-Regulat-2.ttf) format('truetype')
}
```

然后就可以在其他 css 文件中使用该字体



