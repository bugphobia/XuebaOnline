> By Fihezro

#致前端开发者：关于增加用户状态

由于现在用户的登入状态已经有了，所以此后的开发过程中注意检查用户。

##关于Django的Session机制

当进入网页开始，就基于Cookie建立了Session。

当访问者没有登入的时候是以AnonymousUser的身份进入的，登入之后就从auth.User中获取模型。

- 在view.py对每个页面做响应时注意检查request,使用django.contrib.auth.get_user就能获取user（因为不知道是否request中一定有User，所以在这里我还是进行特判了一下）
- 然后将User加入Context，对模板进行渲染
- 在模板中通过检查User.username是否存在来判断是否是AnonymousUser，如果是匿名用户，一切调用pre_signin...;反之如果是非匿名用户，也就是我们的注册用户，一切调用post_signin...

##关于注册前和注册后的不同

首先在header中需要体现出不同，后面为了给注册用户提供服务，我们还有很多要区分的地方

##关于前面开发内容的修改

此前前端@Panacea开发了index首页，由于考虑到模块化开发和代码复用，并根据Django官方文档中的建议

> 使用{% block %}增加开发效率

为此进行了一些修改：

将mainmenu进行了拆解：
- header提取
- 中间部分直接放入index.djhtml中
- footer提取

####关于header和footer的说明

footer是不会因为用户状态而改变的，所以直接将他放到了footer.djhtml中

header会因为用户状态而改变所以分为pre_signin_header 和 post_signin_header。

- pre: 需要register和login
- post: 需要链接用户管理界面和logout

以后哪些页面要加header和footer只需要include block就可以，不需要再写了，至于哪些地方要引入还请前端和设计人员斟酌。

**前端有些结构可能变了点，还麻烦前端调整一下** 

