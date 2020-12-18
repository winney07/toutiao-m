## 十八、打包移动 App

移动App开发

1.原生应用(Native App)

1.1.开发技术

1.2.优点

1.3.缺点

2.网站应用(Web App)

2.1.优点

2.2.缺点

3.混合应用(Hybrid App)

3.1.优点

3.2.缺点

3.3.相关技术

3.3.1.Cordova

3.3.2.APPCan

3.3.3.DCloud

3.3.4.API Cloud

3.3.5.四种方式对比

4.跨平台开发Native App

4.1.相关开发技术

4.1.1.React Native (主流)

4.1.2. Weex(使用不多)

4.1.3.Flutter (未来趋势)

4.2.优点

4.3.缺点





### HBuilderX

1、下载安装HBuilderX，选择App 开发版

> 根据自己的操作系统下载对应的安装包。
>
> - 标准版：可直接用于 web 开发、markdown、字处理场景。做 App 仍需要安装插件
>
> - App 开发版：在标准版的基础之上预置了 App/uni-app 开发所需的插件，开箱即用
>
> 如果是开发 App 建议下载安装 App 开发版即可。

2、新建项目，选择5+App(A)

![新建项目](G:\Vue-demo\toutiao-m\noteImage\note3.png)

3、真机调试运行

- iOS手机

  - 使用数据线连接到电脑

  - 运行>运行到手机或模拟器>选择设备，即可连接成功

  - iOS9.0及以上系统需要在"设置"-"通用"-"设备管理"(或"描述文件")中信任DCloud企业证书(Digital Heaven开头的证书)才可以正常使用

- Android手机

  如果识别不了，可以安装360手机助手

[可以获取设备的信息](http://www.html5plus.org/doc/zh_cn/device.html)

4、打包

- 选择“发行”>原生APP-云打包
- 登录账号（如需验证，则验证后就可以登录）登录后显示：

![云端打包](G:\Vue-demo\toutiao-m\noteImage\note4.png)

- iOS需要申请证书，所以不勾选iOS

- 处理，“Mainfest.json文件配置错误，请检查修复的报错” ，点“重新获取”按钮即可

- 需要绑定手机号码，绑定后就可以打包了，打包成功后会自动返回下载链接

注：打包的包的图标是可以自定义的

#### 打包vue项目

1、在vue项目中的public目录中新建mainfest.json，将HBuilder里面的mainfest.json里面的代码复制进来

2、launch_path，配置网站地址，本地开发写本地局域网的地址，如果发布上线写线上的web服务地址

```
"launch_path" : "http://192.168.1.146:8080/"
```

3、在HBuilder中选“文件”>导入>选择vue项目中的public目录

4、调试运行，在手机上运行

