from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Question, Tag, Answer, Vote
from .datamanager import *

from django.contrib.auth.decorators import login_required

def getUnsolvedQuestions(request):
    if 'tag' in request.GET and 'pageNum' in request.GET:
        tag_name = request.GET['tag']
        pageNum = request.GET['pageNum']
        questions = get_question_by_tag(tag_name)
        question_list = []
        for question in questions:
            if question.solved == 0:
                que = {}
                que['question_id'] = question.qid
                que['title'] = question.title
                que['content'] = question.content
                que['uid'] = question.uid
                que['uname'] = question.uid.name
                que['shortAns'] = ""
                que['views'] = question.views
                que['replies'] = question.repies
                que['solved'] = question.solved
                que['PostDatatime'] = question.created
                qiestopm_list.append(que)
        return JsonResponse({'state':'ok', 'question':question_list})
    else:
        return JsonResponse({'state':'failed'})

def getHotQuestions(request):
    pass

@login_required
def getMyQuestions(request):
    pass

@login_required
def getQuestionById(request):
    pass

@login_required
def addQuestion(request):
    pass

def addView(request):
    pass

@login_required
def solvedQuestion(request):
    pass

def giveVote(request):
    pass

@login_required
def modifyQuestion(request):
    pass

@login_required
def deleteQuestion(request):
    pass

@login_required
def addAnswer(request):
    pass

@login_required
def deleteAnswer(request):
    pass

@login_required
def modifyAnswer(request):
    pass
