## 接口定义说明 ##
+ Particular Scopes(URL)：通过URL描述基本的属性或关系，具体的说明样例如下：
  - /users/{id}/notifications
  - /question/add
+ Methods（HTTPS Protocol）：描述服务器的交互方法，具体范围列举如下：
  - GET, POST, PUT, DELETE
+ Arguments(Requires)：API本身所需的参数，具体的说明样例如下：
  - private_information
  - write/read_access
+ Return：API本身返回的文本返回值，具体的说明样例如下：
  - {"body":,"is_unrea":,"post_id":}

## 特别说明 ##
**注意，必须启用cookies，特别是Android端的小伙伴。**  
**经查，Android的HttpClient会自动管理Cookies，这一点请再行确认一下。**  
**Django是靠cookies来确定用户状态的。**

## 用户管理 ##
### 用户登陆 ###
+ URL: /accounts/login
+ Method:  POST
+ Argument:
  - username 用户名
  - password 密码
+ Return:
  - 成功时 {"state":"ok"}
  - 密码错误时 {"state":"failed"}
  - 无此用户时 {"state":"missing"}

### 用户注销 ###
+ URL: /accounts/logout
+ Method:  POST
+ Return:
  - 成功时 {"state":"ok"}
  - 失败时 {"state":"failed"}

### 设定用户信息(login required) ###
+ URL: /accounts/updateprofile
+ Method: POST
+ Argument**(所有参数均可选)**:
  - email 邮件地址
  - realname 真实姓名
  - description 一句话自我介绍
+ Return:
  - 成功时 {"state":"ok"}
  - 失败时 {"state":"failed"}

### 获取用户信息(login required) ###
+ URL: /accounts/userinfo
+ Method: GET
+ Return:
  - 成功时  
	{"state":"ok",
	 "email":"example@example.com",
	 "creation_time":"YYYY/MM/DD",
	 "realname":"example_real_name",
	 "description":"I'm a example",
	 "credit":123,
	 "forgottime":"YYYY/MM/DD",
	 "download":123}
  - 失败时
	{"state":"failed"} 
+ Addtion Explanaions:
  - credit:积分。
  - forgottime:意义不明，需要和学霸APP组进行确认
  - donwload:意义不明，需要和学霸APP组进行确认

## 标签（Tag） ##
### 关注Tag(login required) ###
+ URL: /accounts/liketag
+ Method: GET
+ Argument:
  - tag	{* 标签名 *}
+ Return:
  - 成功时
    {
      "state":"ok",
      "tags": [
        {
          "tagname":"name1",
          "count": 123,
          "excerpt": "name1 is a balabala..."
        }，
        {
          "tagname":"name2",
          "count": 222,
          "excerpt": "name2 is a balabala..."
        }
      ]
    }
  - 失败时
	{"state":"failed"}

### 取消关注Tag(login required) ###
+ URL: /accounts/disliketag
+ Method: GET
+ Argument:
  - tag	{* 标签名 *}
+ Return:
  - 成功时 
    {
      "state":"ok",
      "tags": [
        {
          "tagname":"name1",
          "count": 123,
          "excerpt": "name1 is a balabala..."
        }，
        {
          "tagname":"name2",
          "count": 222,
          "excerpt": "name2 is a balabala..."
        }
      ]
    }
  - 失败时
	{"state":"failed"}

### 获取tags ###
**{* 按照count降序排列获取tags *}**
+ URL: /accounts/tags
+ Method: GET
+ Argument:
  - startPos 从第几个开始获取
  - endPos 获取到第多少个
+ Return:
  - 成功时 
    {
      "state":"ok",
      "tags": [
        {
          "tagname":"name1",
          "count": 123,
          "excerpt": "name1 is a balabala..."
        }，
        {
          "tagname":"name2",
          "count": 222,
          "excerpt": "name2 is a balabala..."
        }
      ]
    }
  - 失败时
	{"state":"failed"}

### 推荐tags ###
+ URL: /recommended/tags
+ Method: GET
+ Return:
  - 成功时 
	{
	  "state":"ok",
	  "tags": [
	    {
	      "tagname":"name1",
	      "count": 123,
	      "excerpt": "name1 is a balabala..."
	    }，
	    {
	      "tagname":"name2",
	      "count": 222,
	      "excerpt": "name2 is a balabala..."
	    }
	  ]
	}
  - 失败时
	{"state":"failed"}


### 推荐questions ###
+ URL: /recommended/questions
+ Method: GET
+ Return:
  - 成功时 
    {
      "state":"ok",
      "questions": [
        {
          "question_id":123,
          "count": 123,
          "title": "my question is a balabala...",
          "body": "hi,..."
          ...
        }
      ]
    }
  - 失败时
	{"state":"failed"}

**这里先不填了，json部分和Android的小伙伴们关于问题的接口尽量保持一致**

### 推荐answers ###
+ URL: /recommended/answers
+ Method: GET
+ Return:
  - 成功时 
    {
      "state":"ok",
      "answers": [
        {
          "question_id":123,
          "count": 123,
          "body": "hi,..."
          ...
        }
      ]
    }
  - 失败时
	{"state":"failed"}

**这里先不填了，json部分和Android的小伙伴们关于问题的接口尽量保持一致**

## 搜索 ##
+ URL:/search/query
+ Method: GET
+ Return:
  - 成功时
    {
      "tag_description":"Java is an object-orinented....",
      "query_content":"Java",
      question_list[
        {
          "body":"balabala",
          "creation_date":"2014 Oct",
          "score":44,
          "tags_name":"Java",
          "url":"http://abc",
          "view_count":2,
            ......
        },

        {
           ......
        }
      ]
    }
  - 失败时
	query_content不在request.GET中，返回index页面
	无法获得tag的id:{"query_content":"Java"},计划启用solr搜索。

## 问题与回答 ##
### 问题 ##
{
	"qid": //question's identity
	"uid": //user's identity
	"uname": //user's name
	"title":
	"content":
	"shortAns": //问题的简短回答（如果已被选中“最佳答案”）
	"views": //访问数
	"replies": //回复数
	"solved": //是否已采纳“最佳答案
	"PostDateTime": //提出问题的时间	
}

### 回答 ###
{
	"aid": //回答的id
	"qid":
	"uid": 
	"uname":
	"title":
	"Qtitle": //该回答所属问题的标题，用于显示“用户回答过的问题”时
	"content":
	"views":
	"votes":
	"PostDateTime": //回答问题的时间
	"IsBestAns": //判断该answer是否是所属问题的最佳answer
}

### 标签 ###
**此部分内容和前面冲突，审阅时需要重点把握此部分的要点**
{
	"tid": //tag的格式
	"content"： 
}

### 未解决问题 ###
+ URL:/question/getUnservedQuestions
+ Method：
+ Argument：
  - tagid, //标签的id，用于通过标签查询问题
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
  - queryType. //0:用户未登录，只显示 10道题 ； 1：用户已登录，问题数由pageNum或已爬取的问题总数决定
+ Return：  
**此部分在提问回答相关接口.txt文件中似乎是以后端的部分给出，个人理解是Return的部分，特将原文件内容置于下方**  
	{
		"number":
		"questions:"[……(n个问题)]
	}

> **源文件部分内容**
> 一、未解决问题：  
> 前端：  
> URL:  ……//XueBa/Question/getUnservedQuestions?……  
> 参数：tagid, //标签的id，用于通过标签查询问题  
> 			pageNum, //前端所显示问题的页数（现在每页显示10道题）  
> 			queryType. //0:用户未登录，只显示 10道题 ； 1：用户已登录，问题数由pageNum  > 或已爬取的问题总数决定  

> 后端：  
> json格式：  
> {  
> 	"number":  
> 	"questions:"[……(n个问题)]  
> }  
> **源文件部分内容结束符**  

### 热门问题 ###
+ URL:/question/getHotQuestions
+ Method：
+ Argument：
  - tagid, //标签的id，用于通过标签查询问题
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
  - queryType. //0:用户未登录，只显示 10道题 ； 1：用户已登录，问题数由pageNum或已爬取的问题总数决定
+ Return：  
	{
		"number":
		"questions:"[……(n个问题)]
	}

### “我”提出的问题 ###
+ URL:/question/getMyQuestions
+ Method：
+ Argument：
  - uid,
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return：  
	{
		"number":
		"questions:"[……(n个问题)]
	}

### “我”发表的问题 ###
+ URL:/question/getMyAnswers
+ Method：
+ Argument：
  - uid,
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return：  
	{
		"number":
		"answers":[……]
	}

### 获得某道问题的详细信息 ###
+ URL:/question/getQuestionById
+ Method：
+ Argument：
  - qid	//问题的id
+ Return：  
	{
		"question": {……} //问题的详细信息 
		"answerNum": //回答的个数
		"answers":[……]
		
		"tagNum": //标签的格数：
		"tags":[……]
	}

### 提问 ###
+ URL:/question/addQuestion
+ Method：
+ Argument：
  - uid,
  - title,
  - content,
  - tags //各个tag用逗号分隔
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 增加访问数 ###
+ URL:/question/addView
+ Method：
+ Argument：
  - qid	//问题的id
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 选中最佳答案 ###
+ URL:/question/solevdQuestion
+ Method：
+ Argument：
  - qid	//问题的id
  - aid
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 点赞 ###
+ URL:/question/giveVote
+ Method：
+ Argument：
  - aid,
  - voted //判断用户对该答案是否点过赞，如果点过，赞数减一；如果没点过，赞数加一
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 修改问题 ###
+ URL:/question/modifyQuestion
+ Method：
+ Argument：
  - qid,
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 删除问题 ###
+ URL:/question/deleteQuestion
+ Method：
+ Argument：
  - qid,
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 添加答案 ###
+ URL:/question/addAnswer
+ Method：
+ Argument：
  - qid,
  - content //答案的内容
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 删除答案 ###
+ URL:/question/deleteAnswer
+ Method：
+ Argument：
  - aid,
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}

### 修改答案 ###
+ URL:/question/modifyAnswer
+ Method：
+ Argument：
  - aid,
+ Return：  
	{
		"success" : //判断是否成功，值为 "yes" 或 "no"
	}