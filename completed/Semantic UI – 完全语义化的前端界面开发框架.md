##Semantic UI – 完全语义化的前端界面开发框架 
Semantic UI 是一个 UI 库，使前端开发更简单，更容易学习。Semantic UI 介绍了许多界面元素。在大多数情况下，只有你需要的元素建立一个自定义的构建可能是最好的。 UI 组件分为四大类，范围从最小到最大的范围分为：用户界面 UI 元素集合，UI 模块和用户界面视图。

Semantic UI 是一套开源的 CSS 与 JavaScript 框架，提供了一些设计好的界面组件，你可以在项目里直接使用这些组件，我们可以使用它来简化我们在开发中的一些过多的操作。它还提供了一套很方便的定制主题的方法，你可以用自己的想法去改变界面组件的样式。安安装 Semantic UI 。


##准备工具

你需要使用命令行去安装，Windows 用 Powershell ，Mac 使用终端。然后确定你已经安装好了 npm 与 gulp 。

##安装Semantic UI

* 先为项目创建一个目录，然后进入到这个目录的下面，比如我在自己的桌面上去为项目创建一个目录:  
`cd ~/desktop`  
`mkdir ninghao-semantic`  
`cd ninghao-semantic` 
* 使用 npm 去安装一下 Semantic UI  
`npm install semantic-ui`

过一会儿会出现设置 Semantic UI 的提示，按上下箭头可以选择:  
```
❯ Automatic (Use defaults locations and all components)  
   Express (Set components and output folder)  
   Custom (Customize all src/dist values)  
```   
 Automatic：自动配置，一切都用默认的设置。  
 Express：快速设置，只需要设置组件还有输出的目录。  
 Custom：自定义，完全自己去定义 src/dist 目录。  
 选择默认的 Automatic ，回车执行，又会提示：
```
[?] We detected you are using NPM. Nice!  
 Is this your project folder?  
 /Users/xiaoxue/Desktop/ninghao-semantic (Use arrow keys) 
  ❯ Yes  
   No, let me specify
```
 问我们桌面上的 ninghao-semantic 这个目录是不是我的项目的目录， Yes ，再回车执行一下。 提示：
```
[?] Where should we put Semantic UI inside your project? (semantic/) 
```
 意思是要把 Semantic UI 放在项目目录的哪个目录的下面，默认这个目录就是 semantic 。回车执行，会完成安装，查看项目目录下面的东西，你会看到：
```
node_modules semantic semantic.json 
```
* 进入到 semantic 这个目录的下面，然后再执行编译的命令  

`cd semantic`  

`gulp build`  

*编译好的 Semantic UI 会放在 dist 这个目录的下面。这个目录有下面这些东西：
`components  semantic.js  semantic.min.js semantic.css  semantic.min.css themes`  

components 目录下面是单独的一些组件，如果你只想使用 Semantic UI 里的某些组件，可以在这个目录下面找到这些组件。如果你想使用全部的组件，可以使用 semantic.css 与 semantic.js ，或者使用它们的最小化之后的版本，semanitc.min.css 与 semantic.min.js任务表  

*任务  

在 semantic 这个目录的下面，有一个文件叫 gulpfile.js ，在这个文件里定义了一些可以执行的任务，比如刚才我们用了 gulp build 去编译了 Semantic UI ，你也可以单独编辑 Semantic UI 的 CSS 或者 JavaScript ，执行任务你需要在项目下的 semantic 这个目录的下面  

*编译CSS  

`gulp build-css`  

*编译JavaScript  

`gulp build-javascript`  

*自动编译  

你可以让 Semantic UI 自动去编译，当你修改了某些文件以后，会自动执行任务去编译 Semantic UI ，执行任务：  

`gulp watch`  

*基本结构  

你可以在项目的根目录下面创建一个 HTML 文件，在这个文件里嵌入需要的 CSS 与 JavaScript ，这样就可以去练习 Semantic UI 了。  
比如在项目的根目录下面，创建一个名字是 index.html 的文件，这个文件里的内容大概是这样的：
```
<!DOCTYPE html>
 <html lang="zh-hans">
 <head>
   <meta charset="UTF-8">
   <title>Semantic UI</title>
   <link rel="stylesheet" href="http://ninghao.net/semantic/dist/semantic.min.css">
 </head>
 <body>
   <!-- YOUR CODE -->

  <script src="http://ninghao.net/javascript/jquery.min.js"></script>
   <script src="http://ninghao.net/semantic/dist/semantic.min.js"></script>
 </body>
 </html>
 ```
 
 Semantic UI 的一些组件需要用到 jQuery ，我们在项目下面创建一个目录，命名为 javascript ，然后把 node_modules/jquery/dist 下面的 jquery.min.js 放到 javascript 这个目录的下面。
```
cd ~/desktop/ninghao-semantic  
mkdir javascript
mv node_modules/jquery/dist/jquery.min.js javascript/
 ```
* 自动刷新

用 Atom 编辑器打开项目的目录，然后你可以再去使用 Browsersync ，监视一下项目下的 index.html 这个文件的变化，这样你在修改这个文档以后就不需要手工去刷新浏览器来查看变化了。

* 安装 Browsersync
`npm install -g browser-sync`  

* 创建服务器并监视文件变化
```
cd ~/desktop/ninghao-semantic
 browser-sync start --server --no-notify --files "index.html"
```
* Semantic UI特性:  
    拥有丰富的CSS模块  
	常用的JS组件  
	CSS3动画特效  
	漂亮大气的新式