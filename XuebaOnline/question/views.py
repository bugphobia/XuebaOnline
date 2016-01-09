from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import XBQuestion, XBTag, XBAnswer, XBVote
from .datamanager import *

from accounts.utils import login_required
from django.utils import timezone

from django.contrib.auth import get_user

def getUnsolvedQuestions(request):
    if 'tag' in request.GET and 'pageNum' in request.GET:
        tag_name = request.GET['tag']
        pageNum = int(request.GET['pageNum'])
        questions = get_question_by_tag(tag_name)
        question_list = []
        showcount = 0
        for question in questions:
            if showcount >= pageNum*10 and showcount <(pageNum*10+10) and question.solved == 0:
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

# This funtion for getting the questions order by views.
def getHotQuestions(request):
    if 'tag' in request.GET and 'pageNum' in request.GET:
        tag_name = request.GET['tag']
        pageNum = int(request.GET['pageNum'])
        questions = get_question_by_tag_order(tag_name)
        question_list = []
        showcount = 0
        for question in questions:
            if showcount >= pageNum*10 and showcount <(pageNum*10+10) and question.solved == 0:
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

# This funciton for getting the questions given by the user
@login_required
def getMyQuestions(request):
    user = get_user(request)
    if 'pageNum' in request.GET:
        pageNum = int(request.GET['pageNum'])
        questions = get_my_questions(user.id)
        question_list = []
        showcount = 0
        for question in questions:
            if showcount >= pageNum*10 and showcount <(pageNum*10+10) and question.solved == 0:
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

# This function for getting the questions answered by the user
@login_required
def getMyAnswers(request):
    user = get_user(request)
    if 'pageNum' in request.GET:
        pageNum = int(request.GET['pageNum'])
        questions = get_my_answer(user.id)
        question_list = []
        showcount = 0
        for question in questions:
            if showcount >= pageNum*10 and showcount <(pageNum*10+10) and question.solved == 0:
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

# This function for getting the specific information of question
def getQuestionById(request):
    user = get_user(request)
    if 'question_id' in request.GET:
        question_id = int(request.GET['question_id'])
        question, answers, tags = get_question_by_id(question_id)
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
        answer_lists = []
        for answer in answers:
            ans = {}
            ans['question_id'] = answer.qid
            ans['answer_id'] = answer.aid
            ans['content'] = answer.content
            ans['uid'] = answer.uid
            ans['uname'] = answer.uid.username
            ans['Qtitle'] = question.title
            ans['views'] = question.views
            ans['votes'] = answer.votes
            ans['PostDateTime'] = answer.created
            ans['IsBestAns'] = answer.best
            answer_lists.append(ans)
        tag_lists = []
        for tag in tags:
            tagitem = {}
            tagitem['tagname'] = tag.name
            tagitem['count'] = tag.count
            tagitem['excerpt'] = tag.excerpt
            tag_lists.append(tagitem)
        return JsonResponse({'state':'ok','question':que,'answers':answer_lists,'tags':tag_lists})
    else:
        return JsonResponse({'state':'failed'})


# This function for user to add question
@login_required
def addQuestion(request):
    user = get_user(request)
    if 'title' in request.GET and 'content' in request.GET and 'tags' in request.GET:
        title = request.GET['title']
        content = request.GET['content']
        tagnames = request.GET['tags'].split(',')
        tags = get_tags_by_name(tagnames)
        question = XBQuestion(uid=user, title=title, content=content)
        question.save()
        for tag in tags:
            question.tags.add(tag)
        return JsonResponse({'state':'ok'})
    else:
        return JsonResponse({'state':'failed'})


# This function for add the count of views of a specific question
def addView(request):
    if 'question_id' in request.GET:
        question_id = request.GET['question_id']
        question = XBQuestion.objects.get(qid=question_id)
        question.views += 1
        question.save()
        return JsonResponse({'state':'ok'})
    else:
        return JsonResponse({'state':'failed'}) 

# This function using for choose the best answer of the question.
# The first step is to judge whether the user has right to do so.
@login_required
def solvedQuestion(request):
    user = get_user(request)
    if 'qid' in request.GET and 'aid' in request.GET:
        qid = request.GET['qid']
        aid = request.GET['aid']
        question = XBQuestion.objects.get(qid=qid)
        if user.id == question.uid.id :  # question.uid is a object of auth.models.User
            answer = XBAnswer.objects.get(aid=aid)
            answer.best = 1
            answer.save()
            return JsonResponse({'state':'ok'})
        else:
            return JsonResponse({'state':'denied'})
    else:
        return JsonResponse({'state':'failed'})

# This function for user to give vote to a answer
# If there is a vote given by the user to this answer, then it means take back the vote
# Else it means giving a vote
@login_required
def giveVote(request):
    user = get_user(request)
    if 'answer_id' in request.GET:
        answer_id = request.GET['answer_id']
        answer = XBAnswer.objects.get(aid=answer_id)    # Note that in django's model, ForeignKey is an object
        vote = XBVote.objects.filter(aid=answer, uid=user)
        if len(vote) == 0:
            newVote = XBVote(aid=answer, uid=user)
            newVote.save()
            answer.vote += 1
            answer.save()
        elif vote.up == 1:
            vote.up = 0
            vote.save()
            answer.vote -= 1
            answer.save()
        else:
            vote.up = 1
            vote.save()
            answer.vote += 1
            answer.save()
        return JsonResponse({'state':'ok'})
    else:
        return JsonResponse({'state':'failed'})


# This function for user to modify his question
# Note that front-end should sent four 
@login_required
def modifyQuestion(request):
    user = get_user(request)
    if 'question_id' in request.GET and 'title' in request.GET and 'content' in request.GET and 'tags' in request.GET:
        qid = request.GET['question_id']
        title = request.GET['title']
        content = request.GET['content']
        tagnames = request.GET['tags'].split(',')
        tags = get_tags_by_name(tagnames)
        question = XBQuestion.objects.get(qid=qid)
        if user.id == question.uid.id :
            question.title = title
            question.content = content
            question.tag_set.clear()
            question.tags.add(tags)
            return JsonResponse({'state':'ok'})
        else:
            return JsonResponse({'state':'denied'})
    else:
        return JsonResponse({'state':'failed'})

# This function for user to delete his question
@login_required
def deleteQuestion(request):
    user = get_user(request)
    if 'question_id' in request.GET:
        qid = request.GET['question_id']
        question = XBQuestion.objects.get(qid=qid)
        if user == question.uid:
            question.delete()
            return JsonResponse({'state':'ok'})
        else:
            return JsonResponse({'state':'denied'})
    else:
        return JsonResponse({'state':'failed'})

# This function for user to add answer
@login_required
def addAnswer(request):
    user = get_user(request)
    if 'qid' in request.GET and 'content' in request.GET:
        qid = request.GET['qid']
        content = request.GET['content']
        question = XBQuestion.objects.get(qid=qid)
        newanswer = XBAnswer(uid=user, qid=question, content=content)
        newanswer.save()
        return JsonResponse({'state':'ok'})
    else:
        return JsonResponse({'state':'failed'})

# This function for delete answers
@login_required
def deleteAnswer(request):
    user = get_user(request)
    if 'answer_id' in request.GET:
        answer_id = request.GET['answer_id']
        answer = XBAnswer.objects.get(aid=answer_id)
        if user == answer.uid:
            answer.delete()
            return JsonResponse({'state':'ok'})
        else:
            return JsonResponse({'state':'denied'})
    else:
        return JsonResponse({'state':'failed'})


# This function for modify answers
# In this function need content, the interface define has mistakes
#####################################
@login_required
def modifyAnswer(request):
    user = get_user(request)
    if 'answer_id' in request.GET and 'content' in request.GET:
        answer_id = request.GET['answer_id']
        content = request.GET['content']
        answer = XBAnswer.objects.get(aid=answer_id)
        if user == answer.uid:
            answer.content = content
            answer.save()
            return JsonResponse({'state':'ok'})
        else:
            return JsonResponse({'state':'denied'})
    else:
        return JsonResponse({'state':'failed'})
