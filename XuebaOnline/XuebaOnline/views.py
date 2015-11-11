from django.http import HttpResponse
from django.template import RequestContext, loader, Context
from django.contrib.auth import get_user
from django.shortcuts import render,redirect,render_to_response

from django.contrib.auth.models import User
from stackExchange.models import *
from stackExchange.func import *

def static_page(request,template_name):
    user = get_user(request)
    return render(request, template_name, {'user': user})


# This func will never be invoked because of the mapping setted in urls.py.
# but will be redirected
def index(request):
    user = get_user(request)
    return render(request, 'index.djhtml', {'user': user})

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


def test_display_meta(request):
        values = request.META.items()
        html = []
        for k, v in values:
                html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
        return HttpResponse('<table>%s</table>' % '\n'.join(html))
