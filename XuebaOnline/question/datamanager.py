"""
This file include the functions for database interaction
"""

from .models import *

def get_question_by_tag(text):
    tag = XBTag.objects.get(name__iexact = text)
    question_list = tag.question_set.all()
    return question_list

def get_question_by_tag_order(text):
    tag = XBTag.objects.order_by('-views')
    question_list = tag.question_set.all()
    return question_list

def get_my_questions(userid):
    question_list = XBQuestion.objects.filter(uid=userid)
    return question_list

def get_my_answer(userid):
    answer_list = XBAnswer.objects.filter(uid=userid)
    question_list = []
    for answer in answer_list:
    	question_list.append(answer)
    return question_list

def get_question_by_id(questionid):
    theQuestion = XBQuestion.objects.filter(qid=questionid)
    answers = theQuestion.xbanswer_set.all()
    tags = XBQuestion.xbtags.all()
    return theQuestion, answers, tags

def get_tags_by_name(tagnames):
    tags = []
    for tagname in tagnames:
        tag = None
        try:
            tag = XBTag.objects.get(name = tagname)
        except:
            tag = XBTag(name = tagname,
                        count = 0,
                        excerpt = "")
            tag.save()
        tags.append(tag)
    return tags
