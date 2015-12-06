> By Fihezro

此文档讲述的是注册、登陆模块：

## 涉及的数据库

- auth_user

由于快速简单注册界面和登陆界面只涉及简单的用户信息，所以只与auth_user表中的内容有关。
    
    CREATE TABLE "auth_user" (

    	"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
		"password" varchar(128) NOT NULL, 
		"is_superuser" (30) NOT NULL UNIQUE, 
		"username" varchar(30) NOT NULL UNIQUE,
		"first_name" varchar(30) NOT NULL, 
		"last_name" varchar(30) NOT NULL, 
		"email" varchar(254) NOT NULL, 
		"is bool NOT NULL, 
		"date_joined" datetime NOT NULL, 
		"last_login" datetime NULL
	);

## 页面的基本判断和处理

- signup获取的用户信息有：
	- username
	- email
	- password

在前端通过jQuery对表单中的内容进行判断，做出以下的要求：

	1. 要求非空
	2. email必须符合邮件格式
	3. 根据数据库的大小限制，将输入的规模限制住，且密码最少6位
	4. 两次输入的密码必须相同
	5. 必须同意我们的声明（声明内容）

在后端（view.py）对是否获取了相关值，且是否密码相匹配进行了检验（与前端内容重复）。

此外，检查数据库中是否有同名的用户。

最后判断是否创建用户成功，实现页面的跳转和调整。

- signin获取的用户信息有：
	- username
	- password

在前端仍然通过jQuery进行基本判断。

在后端对用户的相关信息进行判断
	
	1. 是否存在该用户
	2. 该用户账号是否可用
	3. 账号密码是否正确

然后借助django.contrib.auth提供的login方法，记录用户的登陆状况，此处相当于记录了session，可用于后面页面中的一些判断。（是django提供的方便开发者的功能）

另外，此处对刚刚注册成功跳转到该页面的用户有一个成功提醒。


*以上是这两个模块的逻辑内容与规格，特此写成文档，方便测试人员发现逻辑漏洞好加以补充*
