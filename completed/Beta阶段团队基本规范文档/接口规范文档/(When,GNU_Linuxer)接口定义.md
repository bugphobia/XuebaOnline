# 用户管理 #
注意，必须启用cookies，特别是Android端的小伙伴。
经查，Android的HttpClient会自动管理Cookies，这一点请再行确认一下。
Django是靠cookies来确定用户状态的。

## 用户登陆 ##
URL: /accounts/login

Method:  POST

Argument:
+ username 用户名
+ password 密码

Return:
+ 成功时 {"state":"ok"}
+ 密码错误时 {"state":"failed"}
+ 无此用户时 {"state":"missing"}

## 用户注销 ##
URL: /accounts/logout

Method:  POST

Return:
+ 成功时 {"state":"ok"}
+ 失败时 {"state":"failed"}

## 设定用户信息(login required) ##
URL: /accounts/updateprofile

Method: POST

Argument:
(所有参数均可选)
+ email 邮件地址
+ realname 真实姓名
+ description 一句话自我介绍

Return:
+ 成功时 {"state":"ok"}
+ 失败时 {"state":"failed"}

## 获取用户信息(login required) ##
URL: /accounts/userinfo

Method: GET

Return:
+ 成功时
{"state":"ok",
 "email":"example@example.com",
 "creation_time":"YYYY/MM/DD",
 "realname":"example_real_name",
 "description":"I'm a example",
 "credit":123,
 "forgottime":"YYYY/MM/DD",
 "download":123}
+ 失败时 {"state":"failed"} 

credit为积分。
forgottime不明，待和Android的小伙伴确认。
download不明，待和Android的小伙伴确认。

# Tag相关 #

## 关注Tag(login required) ##
URL: /accounts/liketag

Method: GET

Argument:
+ tag 标签名

Return:
+ 成功时
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
+ 失败时 {"state":"failed"}

## 取消关注Tag(login required) ##
URL: /accounts/disliketag

Method: GET

Argument:
+ tag 标签名

Return:
+ 成功时 
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
+ 失败时 {"state":"failed"}

## 获取tags ##
按照count降序排列获取tags。
URL: /accounts/tags

Method: GET

Argument:
+ startPos 从第几个开始获取
+ endPos 获取到第多少个

Return:
+ 成功时 
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
+ 失败时 {"state":"failed"}

## 推荐tags ##
URL: /recommended/tags

Method: GET

Return:
+ 成功时 
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
+ 失败时 {"state":"failed"}


## 推荐questions ##
URL: /recommended/questions

Method: GET

Return:
+ 成功时 
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
+ 失败时 {"state":"failed"}

（这里先不填了，json部分和Android的小伙伴们关于问题的接口尽量保持一致）

## 推荐answers ##
URL: /recommended/answers

Method: GET

Return:
+ 成功时 
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
+ 失败时 {"state":"failed"}

（这里先不填了，json部分和Android的小伙伴们关于答案的接口尽量保持一致）

## 搜索 ##
URL:/search/query

Method: GET

Return:
+成功时
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
+失败时
query_content不在request.GET中，返回index页面
无法获得tag的id:{"query_content":"Java"},计划启用solr搜索。