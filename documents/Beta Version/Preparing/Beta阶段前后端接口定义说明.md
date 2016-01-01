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

## 修改记录 ##
### 2016-1-1 ###
1. 增加logined_required语义描述。
2. 获取用户信息接口新增了一些字段，用于网页端保持登陆状态。

## 补充说明 ##
### login_required ###
若已经登陆，则一切功能如文档所述。若未登陆，则会返回
`{'state':'failed','errors':['Login Required']}`。
在具体代码中，login_required采用Python装饰器实现，主要用于处理
有些服务需要用户登陆后才能请求的情况。如果用户未登陆，则直接返回错误。

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
	 "username":"USERNAME",
	 "email":"example@example.com",
	 "creation_time":UNIXTimestamp,
	 "realname":"example_real_name",
	 "description":"I'm a example",
	 "credit":123,
	 "forgottime":UNIXTimestamp,
	 "download":123,
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
        },
        ...
      ],
      "questions": [
        {
          "question_id":123,
          "title": "my question is a balabala...",
          "content": "hi,..."
          "uid": "user id" //提问者id
          "uname": "user name"//提问者姓名
          "shortAns": "answer is balabala"//问题的简短回答（如果已被选中“最佳答案”）
          "views": 123 //访问数
          "replies": 1 //回复数
          "solved": true //是否已采纳“最佳答案
          "PostDateTime": UNIXTimestamp//提出问题的时间
        },
        ...
      ],
      "answers": [
        {
          "question_id":123,
          "answer_id":111,
          "count": 123,
          "content": "hi,...",
          "uid": 66666666,
          "uname": "answer's name",
          "title": "answer title",
          "Qtitle": //该回答所属问题的标题，用于显示“用户回答过的问题”时
          "views": 222,
          "votes": 123,
          "PostDateTime": UNIXTimestamp, //回答问题的时间
          "IsBestAns": true//判断该answer是否是所属问题的最佳answer
        },
        ...
      ]
	 }
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
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
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
+ Argument:
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
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
+ Argument:
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return:
  - 成功时 
    {
      "state":"ok",
      "questions": [
        {
          "question_id":123,
          "title": "my question is a balabala...",
          "content": "hi,..."
          "uid": "user id" //提问者id
          "uname": "user name"//提问者姓名
          "shortAns": "answer is balabala"//问题的简短回答（如果已被选中“最佳答案”）
          "views": 123 //访问数
          "replies": 1 //回复数
          "solved": true //是否已采纳“最佳答案
          "PostDateTime": UNIXTimestamp//提出问题的时间
        },
        ...
      ]
    }
  - 失败时
	{"state":"failed"}

### 推荐answers ###
+ URL: /recommended/answers
+ Method: GET
+ Argument:
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return:
  - 成功时 
    {
      "state":"ok",
      "answers": [
        {
          "question_id":123,
          "answer_id":111,
          "count": 123,
          "content": "hi,...",
          "uid": 66666666,
          "uname": "answer's name",
          "title": "answer title",
          "Qtitle": //该回答所属问题的标题，用于显示“用户回答过的问题”时
          "views": 222,
          "votes": 123,
          "PostDateTime": UNIXTimestamp, //回答问题的时间
          "IsBestAns": true//判断该answer是否是所属问题的最佳answer
        }
      ]
    }
  - 失败时
	{"state":"failed"}

## 搜索 ##
+ URL:/search/query
+ Method: GET
+ Argument:
    - query_content 待搜索的内容或tag
+ Return:
  - 成功时
    {
      "tag_description":"Java is an object-orinented....",
      "query_content":"Java",
      "question_list":[
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
	query_content不在request.GET中，返回{"state":"invalid"}
	无法获得tag的id:{"state":"failed","query_content":"Java"},计划启用solr搜索。

## 问题与回答 ##

### 未解决问题 ###
（用户未登录，最多只返回10道题，若用户已登录，问题数由pageNum或已爬取的问题总数决定。
登录与否通过Cookies来判断，利用Django自带的机制即可，无需额外传参。）
+ URL:/question/getUnservedQuestions
+ Method：GET
+ Argument：
  - tag, //标签名，用于通过标签查询问题（可选，没有的话就随便给一些）
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return：  
成功时 {
	  "state":"ok",
      "questions": [
        {
          "question_id":123,
          "title": "my question is a balabala...",
          "content": "hi,..."
          "uid": "user id" //提问者id
          "uname": "user name"//提问者姓名
          "shortAns": "answer is balabala"//问题的简短回答（如果已被选中“最佳答案”）
          "views": 123 //访问数
          "replies": 1 //回复数
          "solved": true //是否已采纳“最佳答案
          "PostDateTime": UNIXTimestamp//提出问题的时间
        },
        ...
      ]
	}
失败时 {"state":"failed"}

### 热门问题 ###
+ URL:/question/getHotQuestions
+ Method：GET
+ Argument：
  - tag, //标签名，用于通过标签查询问题（可选，没有的话就随便给一些）
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return：  
成功时{
        "state":"ok",
		"questions": [
          {
            "question_id":123,
            "title": "my question is a balabala...",
            "content": "hi,..."
            "uid": "user id" //提问者id
            "uname": "user name"//提问者姓名
            "shortAns": "answer is balabala"//问题的简短回答（如果已被选中“最佳答案”）
            "views": 123 //访问数
            "replies": 1 //回复数
            "solved": true //是否已采纳“最佳答案
            "PostDateTime": UNIXTimestamp//提出问题的时间
          },
          ...
        ]
	 }
失败时 {"state":"failed"}

### “我”提出的问题(login_required) ###
+ URL:/question/getMyQuestions
+ Method：GET
+ Argument：
  - uid,
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return：  
成功时{
        "state":"ok",
		"questions": [
          {
            "question_id":123,
            "title": "my question is a balabala...",
            "content": "hi,..."
            "uid": "user id" //提问者id
            "uname": "user name"//提问者姓名
            "shortAns": "answer is balabala"//问题的简短回答（如果已被选中“最佳答案”）
            "views": 123 //访问数
            "replies": 1 //回复数
            "solved": true //是否已采纳“最佳答案
            "PostDateTime": UNIXTimestamp//提出问题的时间
          },
          ...
        ]
	}
失败时 {"state":"failed"}

### “我”发表的问题(login_required) ###
+ URL:/question/getMyAnswers
+ Method：GET
+ Argument：
  - uid,
  - pageNum, //前端所显示问题的页数（现在每页显示10道题）
+ Return：  
成功时{
        "state":"ok",
		"answers": [
        {
          "question_id":123,
          "answer_id":111,
          "count": 123,
          "content": "hi,...",
          "uid": 66666666,
          "uname": "answer's name",
          "title": "answer title",
          "Qtitle": //该回答所属问题的标题，用于显示“用户回答过的问题”时
          "views": 222,
          "votes": 123,
          "PostDateTime": UNIXTimestamp, //回答问题的时间
          "IsBestAns": true//判断该answer是否是所属问题的最佳answer
        }，
        ...
      ]
	}
失败时 {"state":"failed"}

### 获得某道问题的详细信息 ###
+ URL:/question/getQuestionById
+ Method：GET
+ Argument：
  - question_id	//问题的id
+ Return：  
成功时{
        "state":"ok",
		"question": {
            "question_id":123,
            "title": "my question is a balabala...",
            "content": "hi,..."
            "uid": "user id" //提问者id
            "uname": "user name"//提问者姓名
            "shortAns": "answer is balabala"//问题的简短回答（如果已被选中“最佳答案”）
            "views": 123 //访问数
            "replies": 1 //回复数
            "solved": true //是否已采纳“最佳答案
            "PostDateTime": UNIXTimestamp//提出问题的时间
          },
		"answers": [
          {
            "question_id":123,
            "answer_id":111,
            "count": 123,
            "content": "hi,...",
            "uid": 66666666,
            "uname": "answer's name",
            "title": "answer title",
            "Qtitle": //该回答所属问题的标题，用于显示“用户回答过的问题”时
            "views": 222,
            "votes": 123,
            "PostDateTime": UNIXTimestamp, //回答问题的时间
            "IsBestAns": true//判断该answer是否是所属问题的最佳answer
          }，
          ...
        ],
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
          },
          ...
        ]
	}
失败时 {"state":"failed"}

### 提问(login_required) ###
+ URL:/question/addQuestion
+ Method：GET
+ Argument：
  - uid,
  - title,
  - content,
  - tags //各个tag用逗号分隔
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"failed"}

### 增加访问数 ###
+ URL:/question/addView
+ Method：GET
+ Argument：
  - question_id	//问题的id
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"failed"}

### 选中最佳答案(login_required) ###
+ URL:/question/solevdQuestion
+ Method：GET
+ Argument：
  - qid //问题的id
  - aid
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"denied"} // 没权限被拒绝
    {"state":"failed"} // 其他原因导致失败

### 点赞(login_required) ###
判断用户对该答案是否点过赞，如果点过，赞数减一；如果没点过，赞数加一
+ URL:/question/giveVote
+ Method：GET
+ Argument：
  - answer_id
+ Return：
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"failed"}

### 修改问题(login_required) ###
+ URL:/question/modifyQuestion
+ Method：GET
+ Argument：
  - question_id
  - title,
  - content,
  - tags //各个tag用逗号分隔
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"denied"} // 没权限被拒绝
    {"state":"failed"} // 其他原因导致失败

### 删除问题(login_required) ###
+ URL:/question/deleteQuestion
+ Method：GET
+ Argument：
  - question_id,
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"denied"} // 没权限被拒绝
    {"state":"failed"} // 其他原因导致失败

### 添加答案(login_required) ###
+ URL:/question/addAnswer
+ Method：GET
+ Argument：
  - qid,
  - content //答案的内容
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"failed"}

### 删除答案(login_required) ###
+ URL:/question/deleteAnswer
+ Method：GET
+ Argument：
  - answer_id,
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"denied"} // 没权限被拒绝
    {"state":"failed"} // 其他原因导致失败

### 修改答案 ###
+ URL:/question/modifyAnswer
+ Method：GET
+ Argument：
  - answer_id
+ Return：  
  - 成功时 
    {"state":"ok"}
  - 失败时
    {"state":"denied"} // 没权限被拒绝
    {"state":"failed"} // 其他原因导致失败