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

关于template路径的问题：

+ 注意尽管是在accounts中，如果extends某个模板，比如base.djhtml，引用的还是XuebaOnline下的那个。

# 环境配置 #
## 前端开发环境安装 ##
前端依赖Node.js，不同平台安装方法不同，自行百度，不再赘述。

## 前端开发环境及其Django整合 ##
首先，安装前端开发的各类依赖，包括Webpack、Semantic-UI、ReactJS等。

    npm install --save-dev react react-dom
    npm install --save semantic-ui
    npm install --save-dev webpack webpack-bundle-tracker babel babel-loader babel-core babel-preset-es2015 babel-preset-react css-loader style-loader 

安装Webpack与Django的整合

    pip install django-webpack-loader

之后，为了实时加载变更的模块，我们还需要做一些工作

    npm install --save-dev webpack-dev-server react-hot-loader

整个前端应用采用Facebook提倡的Flux架构（毕竟我们使用了ReactJS嘛），然而，经过查阅资料，
Facebook官方的Flux实现并不是大家首推的Flux实现。我们选择了大家评价比较高的Alt。
所以，接下来，我们还需要按照Alt

    npm install --save-dev alt

## 运行 ##
编译采用

    ./node_modules/.bin/webpack --config webpack.config.js

实时编译（hot load，即无需刷新网页即可看到效果变化）

    node server.js

Django运行

    python3 manage.py runserver
