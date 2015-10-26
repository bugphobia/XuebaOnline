# XuebaOnline

# 目录结构 #
+ `semantic`      下为Semantic-UI的源码，
后期需要对其中的主题和我们不太满意的效果等进行定制。

+ `semantic.json` 编译Semantic-UI所使用的配置文件。
后期如果需要，我们可以自己裁剪Semantic-UI，以减少文件体积。

+ `XuebaOnline`   XuebaOnline的Django项目。
我们主要的开发工作在这里进行。

`XuebaOnline`下属的`XuebaOnline`是最主要的一个APP，负责主界面的效果。
各个模块可以考虑开发为单独的APP形式，这样有利于协同。

每个APP下属目录按照Django的默认目录结构进行布局：

+ `templates`下放置前端模版(.djhtml)

+ `static`下放置静态文件，如CSS、JS脚本、图片素材等

关于accounts App

+ 与用户相关的数据和页面都放在该App下 

+ 所有和用户直接相关的页面放在accounts/templates/中
	- sign in 
	- sign up
	- user home
	- ......

+ 所以程序的运行过程中将获取的url拿到XuebaOnline下的urls.py中寻找，然后通过url(r'^accounts/', include(accounts_urls)),转到accounts下的urls.py中寻找。然后views.py中加载模板时都是从views.py同目录下的templates/文件夹中。