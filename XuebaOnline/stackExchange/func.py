"""
This file include some function capsulated,
and will make other modules' development smooth.
"""
from .models import *

# This function get the tag_id of the input string
# If nothing in the database matches, return 0; 
def get_tag_id(text):
    tag = Tag.objects.filter(name__iexact = text)
    if len(tag) == 0:
        return False
    else:
        return True 

# use get_tag_id before invoke this one
def get_tag_description(text):
	tag = Tag.objects.get(name__iexact = text)
	return tag.excerpt

# use get_tag_id before invoke this one
# return a list of question_object 
def get_question_list(text):
    tag = Tag.objects.get(name__iexact = text)
    question_list = tag.question_set.all()
    return question_list

def get_tags_by_questionid(qid):
	question = Question.objects.get(question_id__iexact = qid)
	tags_list = question.tags.all()
	return tags_list