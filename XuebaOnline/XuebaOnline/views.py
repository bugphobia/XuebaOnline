from django.http import HttpResponse, JsonResponse
from django.template import RequestContext, loader, Context
from django.contrib.auth import get_user

from django.shortcuts import render,redirect,render_to_response

from django.contrib.auth.models import User
from stackExchange.models import *
from stackExchange.func import *

from urllib.request import urlopen
from urllib.parse import urlencode
import json

from stackExchange.models import Tag

def static_page(request,template_name):
    user = get_user(request)
    return render(request, template_name, {'user': user})


# This func will never be invoked because of the mapping setted in urls.py.
# but will be redirected
def index(request):
    tags_color = ['red','orange','yellow','olive','green','teal',
                  'blue','violet','purple','pink','brown','grey','black']
    tags = Tag.objects.all().order_by('-count')[0:len(tags_color)]
    if get_user(request) is not None:
        user = get_user(request)
        return HttpResponse(loader.get_template('index.djhtml').render(RequestContext(request,{"user": user,'tags':zip(tags_color,tags)})))
    else:
        return HttpResponse(loader.get_template('index.djhtml').render(RequestContext(request,{'tags':zip(tags_color,tags)})))

def feedback(request):
    user = get_user(request)
    return render(request, 'feedback.djhtml', {'user': user})

# def query(request):
#     if request.method == "GET":
#         user = get_user(request)
#         cont = {"user": user}        
#         if 'query_content' not in request.GET:
#             return JsonResponse({'state':'invalid'})
#         else:
#             query_content = request.GET['query_content']
#             if get_tag_id(query_content) is True:
#                 cont['tag_description'] = get_tag_description(query_content)
#                 cont['query_content'] = query_content
#                 questions = get_question_list(query_content)
#                 question_list = []
#                 for question in questions:
#                     que = {}
#                     que['body'] = question.body
#                     que['creation_date'] = question.creation_date
#                     que['question_id'] = question.question_id
#                     que['score'] = question.score
#                     que['tags_name'] = []
#                     que['ans_num'] = question.answer_set.count()
#                     for tag in get_tags_by_questionid(question.question_id):
#                         que['tags_name'].append(tag.name)
#                     print(len(que['tags_name']))
#                     que['tages_name'] = query_content
#                     que['title'] = question.title
#                     que['url'] = question.url
#                     que['view_count'] = question.view_count
#                     question_list.append(que)
#                 cont['question_list'] = question_list
#                 return JsonResponse(cont)
#             else:
#                 cont['query_content'] = query_content
#                 cont['state'] = 'failed'
#                 # TODO use solr to search
#                 return JsonResponse(cont)
#     else:
#         return JsonResponse({'state':'invalid'})

# This func use for search
# If query_content can't be found in request.GET or the method isn't GET, return {'state':'invalid'}
# If can't get the tag's id, return {"state":"failed","query_content":""};
# Else get all the search result
def query(request):
    if request.method == "GET":
        user = get_user(request)
        if 'query_content' not in request.GET:
            return JsonResponse({'state':'invalid'})
        else:
            query_content = request.GET['query_content']
            solr_url = 'http://xueba.nlsde.buaa.edu.cn:8080/solr/collection1/select'
            content = query_content.encode('utf-8')
            params = urlencode({'q':content,'wt':'json'})
            requrl = solr_url + '?%s' % params
            responseText = urlopen(requrl)
            rsp = eval(responseText.read())

            res = rsp['response']
            cont = dict();
            cont['query_content'] = query_content
            cont['numFound'] = res['numFound']
            question_list = []
            for doc in res['docs']:
                que = {}
                que['id'] = doc['id']
                que['title'] = doc['title']
                que['owner'] = doc['owner_s']
                que['view_count'] = doc['view_count_i']
                que['ans_num'] =doc['answer_count_i']
                que['creation_date'] = doc['creation_date_s']
                que['url'] = doc['links'][0]
                que['body'] = doc['body_t']
                que['tags_name'] = doc['tags_ss']
                question_list.append(que)
            cont['question_list'] = question_list
            return JsonResponse(cont)
    else:
        return JsonResponse({'state':'invalid'})


def robot(request):
    user = get_user(request)
    return render(request, 'airobot/index.djhtml', {'user': user})

def robot_contact(request):
    api_key = '5dac53a40b604ab5486d8cb6a96ad160'
    api_url = 'http://www.tuling123.com/openapi/api'
    u_line = request.GET['content_text']
    info = u_line.encode('utf-8')
    params = urlencode({'key':api_key, 'info':info})
    requrl = api_url + '?%s' % params
    responseText = urlopen(requrl)
    rsp = eval(responseText.read())

    kind = rsp['code']
    text = rsp['text']
    print(text)
    return JsonResponse(rsp)

def course(request):
    user = get_user(request)
    return render(request,'course/home.djhtml',{'user':user})

def courseCompiler(request):
    user = get_user(request)
    return render(request,'course/pdfshow.djhtml')

def test_display_meta(request):
    values = request.META.items()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))
