# PHP Document

直接在vscode中查看php参考手册，文档信息来自[PHP官方文档](http://php.net/docs.php)

View the php reference manual directly in vscode

## Features

![效果](https://user-images.githubusercontent.com/14969576/47369135-980bdf00-d715-11e8-9128-04f50ae668c9.png)

![效果](https://user-images.githubusercontent.com/14969576/47369256-de613e00-d715-11e8-9f3e-f584064b44a1.gif)

## Requirement

* VS Code（>= 1.26.0）
* 连接网络  Internet connection

## Config

|config | description
|-----|------------
|`phpDocument.language`| 文档语言 (Document language)

支持的语言 language
```json
{
   [
	"English",
	"Brazilian",
	"Chinese",
	"French",
	"German",
	"Japanese",
	"Romanian",
	"Russian",
	"Spanish",
	"Turkish"
    ]
}
```

## Usage

	1.鼠标单击函数位置（或者选中）右键 -> phpDocument
	(Mouse click on the function location (or selected) right -> phpDocument)
	2.使用命令输入你想查找的函数
	ctrl+shift+p -> php Document : Readline -> 输入你要查询的函数名称（example:array） -> enter ，
	如果关键词为php全局变量请带上“$”符号（If the keywords are PHP global variables, please bring "$" symbol.）

## update

#### ver 0.0.1 (2018/10/24)
	第一版发布

#### ver 0.0.2 (2018/11/02)
	1、修复右下角回到顶部按钮无法使用的问题

#### ver 0.0.9 (2018/11/05)
	1、添加支持更多的php关键字，包括（OOP、流程控制、全局变量）

#### ver 0.1.0 (2018/11/05)
	1、添加支持更多的php关键字，包括（命名空间、值类型）

#### ver 0.1.1 (2018/11/09)
	1、修复生成的文件名大小写问题导致在linux下无法使用

#### ver 1.0.0 (2018/11/12)
	1、完善部分关键字

#### ver 1.0.1 (2019/03/21)
	1、优化页面展示速度

#### ver 1.0.2 (2019/03/25)
	1、修复出现301的问题
	2、优化代码

#### ver 1.0.3 (2019/04/08)
	1、更改右键菜单只在php文件下显示

#### ver 1.0.4 (2023/03/07)
	1、完善数据

#### ver 1.0.5 (2023/12/20)
	1、修改图标
	2、增加首次提示
	3、优化打包
-----------------------------------------------------------------------------------------------------------

**赞助**
> 如果这个插件能够帮助到您，不介意的话，请作者喝一杯咖啡吧:) 
 
[<img alt="lauset" src="https://zuhaowan-video.oss-cn-beijing.aliyuncs.com/1587571200/177327269-5cd91cdc-ffeb-4e1d-9193-abe5d2bb6b95.jpg" width="300">](https://github.com/lauset)

### 相关信息

* [GitHub](https://github.com/AShujiao/vscode-phpDocument.git)

**Enjoy!**
