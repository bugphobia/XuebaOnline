##Django学习教程
###下载和安装
Python：Python3.0版本及以上版本不支持Django，因此下载Python3.0以下版本。我选用Python2.5  
 + python-2.5.4.msi 下载路径：http://www.python.org/  
 + Django: Django-1.2.tar.zip 下载路径：https://www.djangoproject.com/       + Apache: apache_2.2.9-win32-x86-no_ssl-r2.zip  
 + mod_python-3.3.0b.win32-py2.5-Apache2.2.exe 下载路径：http://httpd.apache.org/ http://httpd.apache.org/modules/python-download.cgi  
###简单运用
Django 非常适合开发数据库驱动网站，通过数据库驱动网站在后台连接数据库服务器，从中取出一些数据，然后在 Web 页面用漂亮的格式展示这些数据。这个网站也可能会向访问者提供查询新增修改数据库数据的方法，实现数据库的交互。   
Python中调用Django：  
开始菜单中打开IDLE(Python GUI)，输入下来信息，则说明Django安装正常并能在Python中正常调用   
```
    >>> import django  
    >>> django.VERSION  
    (1, 1, 0, final', 1)  
```
####django-admin.py管理工具：
Django安装目录中包含Django管理工具 django-admin.py ，路径在Django-1.2\django\bin
注：不同操作系统管理工具路径有所不同，详细信息可查看
[这里](http://djangobook.py3k.cn/2.0/chapter02/)
####环境变量：
在系统环境变量PATH中添加我们要创建Django项目的路径D:\PythonCode 
####开始创建项目：
运行命令django-admin.py startproject mysite    这样会在你的当前目录下创建一个目录mysite,并包含下面4个文件：
``` 
mysite/
    __init__.py
    manage.py
    settings.py
    urls.py
```
注意：可将`django-admin.py`替换成`django-admin.py`管理工具详细路径`C:\Python25\Django-1.2\django\bin\django-admin.py`.  
文件说明如下：   
 + __init__.py ：让 Python 把该目录当成一个开发包 (即一组模块)所需的文件。 这是一个空文件，一般你不需要修改它。  
 + manage.py ：一种命令行工具，允许你以多种方式与该 Django 项目进行交互。 键入python manage.py help，看一下它能做什么。一般不需要修改它。  
 + settings.py ：该 Django 项目的设置或配置。  
 + urls.py：Django项目的URL设置。 可视其为你的django网站的目录。  
尽管这些的文件很小，但这些文件已经构成了一个可运行的Django应用。
####运行服务器：
项目目录里 (cd mysite )，运行下面的命令`python manage.py runserver`。  
Ok ，第一个Django界面就运行起来了

####运行基于Django的页面：
mysite目录下创建template文件夹，并创建show.html页面，并在body中写入{{showme}}，此地方是要显示的内容  
```html
    <body>
    {{showme}}
    </body>
```
由于要显示show.html模板，在settings.py文件中添加模板路径
```python
import os
TEMPLATE_DIRS = (
    os.path.join(os.path.dirname(__file__), 'template').replace('\\','/'),
)
```
mysite目录下创建view.py文件，输入下面信息
```python
from django.shortcuts import render_to_response
def ShowContent(request):
    showinfo="Welcome to my first page!"
return render_to_response('show.html',{'showme':showinfo})
mysite目录urls.py文件中，加显示的页面及调用的视图函数
from django.conf.urls.defaults import *
from mysite.view import ShowContent
urlpatterns = patterns('',
    (r'^show/$', ShowContent),
)
```
运行命令python manage.py runserver，启动服务器，IE中将显示我们的内容
 
####完善Django页面
#####运用if
在Python和Django模板系统中，以下这些对象相当于布尔值的False  
 + 空列表([]) 
 + 空元组(()) 
 + 空字典({}) 
 + 空字符串('') 
 + 零值(0) 
 + 特殊对象None 
 + 对象False 

Mysite\template\show.html页面添加table内容  
```html
<table>
<tr><td>城市</td><td>城市ID</td></tr>
{% if getCitysInfo %}
    <tr><td>{{cityname}}</td><td>{{cityid}}</td></tr>
 {% else %}
    <tr><td colspan="2">未找到城市信息</td></tr>
{% endif %}
</table>
```
mysite目录下修改`view.py`文件`ShowContent`视图函数
```python
from django.shortcuts import render_to_response

def ShowContent(request):
    showinfo="Welcome to my first page!"
    getCitysInfo=""   #字符串为空，则不显示城市内容
    cityname="GuangZhou"
    cityid="20"
    return render_to_response('show.html',{'showme':showinfo,
	         'getCitysInfo':getCitysInfo,'cityname':cityname,'cityid':cityid})
```
刷新IE，显示我们的修改内容  
 
修改`getCitysInfo="finded"`，刷新IE
 
#####运用For
Mysite\template\ show.html页面添加table内容
```python
{% for bsc in bsc_lists %}
    <p>{{ bsc.city_name }} : {{bsc.bsc_num}}</p>
{% empty %}
    <p>No bsc infomation </p>
{% endfor %}
```
mysite目录下修改`view.py`文件添加`#coding=utf-8`（支持中文显示），ShowContent视图函数添加`bsc_lists`列表
```python
bsc_lists=[]
bsc_dict1={}
bsc_dict1["city_name"]="广州"
bsc_dict1["bsc_num"]="18"
bsc_lists.append(bsc_dict1)
bsc_dict2={}
bsc_dict2["city_name"]="佛山"
bsc_dict2["bsc_num"]="9"
bsc_lists.append(bsc_dict2)
return render_to_response('show.html',{'showme':showinfo,
'getCitysInfo':getCitysInfo,'cityname':cityname,'cityid':cityid,'bsc_lists':bsc_lists})
```
刷新IE，显示我们的修改内容
 
