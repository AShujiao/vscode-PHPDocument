# PHP Document

直接在vscode中查看php参考手册,部分不常用php关键字可能会查不到

View the php reference manual directly in vscode, some of the commonly used php keywords may not be found

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
	1、支持更多的php关键字，包括（OOP,流程控制，全局变量）
-----------------------------------------------------------------------------------------------------------

### 相关信息

* [GitHub](https://github.com/AShujiao/vscode-phpDocument.git)

**Enjoy!**
