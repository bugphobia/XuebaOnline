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
        return HttpResponse(loader.get_template('index.djhtml').render(Context({"user": user,'tags':zip(tags_color,tags)})))
    else:
        return HttpResponse(loader.get_template('index.djhtml').render(Context({'tags':zip(tags_color,tags)})))

def feedback(request):
    user = get_user(request)
    return render(request, 'feedback.djhtml', {'user': user})

def query(request):
    if request.method == "GET":
        user = get_user(request)
        cont = {"user": user}        
        if 'query_content' not in request.GET:
            return redirect(index)
        else:
            query_content = request.GET['query_content']
            if get_tag_id(query_content) is True:
                cont['tag_description'] = get_tag_description(query_content)
                cont['query_content'] = query_content
                questions = get_question_list(query_content)
                question_list = []
                for question in questions:
                    que = {}
                    que['body'] = question.body
                    que['creation_date'] = question.creation_date
                    que['question_id'] = question.question_id
                    que['score'] = question.score
                    que['tags_name'] = []
                    que['ans_num'] = question.answer_set.count()
                    for tag in get_tags_by_questionid(question.question_id):
                        que['tags_name'].append(tag.name)
                    print(len(que['tags_name']))
                    que['tages_name'] = query_content
                    que['title'] = question.title
                    que['url'] = question.url
                    que['view_count'] = question.view_count
                    question_list.append(que)
                cont['question_list'] = question_list
                return render(request, 'search/result.djhtml', cont)
            else:
                cont['query_content'] = query_content
                # TODO use solr to search
                return render(request, 'search/result.djhtml', cont)
    else:
        return redirect(index) 

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

def test_display_meta(request):
    values = request.META.items()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))
