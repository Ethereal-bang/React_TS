# 3-4 【组件化】初识 React 函数式组件
利用假数据循环输出几个机器人画册
实现效果如图：
![image](https://user-images.githubusercontent.com/70147063/121546578-f9575c80-ca3d-11eb-9f46-05c5866cc099.png)



## .json 假数据文件

1. 在`mockdata`文件夹下的`robots.json`文件中存入机器人假数据信息，里面有

2. 引入 json 文件时，`tsconfig.json`需添加以下配置：

    ```json
    	"moduleResolution": "node",
    	"resolveJsonModule": true,
    ```



## 创建 函数式组件 Robot

1. 使用 props 传递组件间数据
2. 接口 Interface 定义父组件需要给当前组件传入的数据



## 在 App.tsx 中使用组件 Robot

1. 在函数组件`App`中循环输出`robots`假数据传给组件`Robot`

    ```tsx
      return (
      	<ul>
        	{robots.map((r) => (
          	<Robot id={r.id} email={r.email} name={r.name} />
          ))}
        </ul>
      )
    ```

    
