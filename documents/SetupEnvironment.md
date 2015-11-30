# 前端开发环境安装 #
前端依赖Node.js，不同平台安装方法不同，自行百度，不再赘述。

# 前端开发环境及其Django整合 #
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

# 运行 #
编译采用

    ./node_modules/.bin/webpack --config webpack.config.js

实时编译（hot load，即无需刷新网页即可看到效果变化）

    node server.js

Django运行

    python3 manage.py runserver
