"""
This file include the functions for database interaction
"""

from .models import *

def get_question_by_tag(text):
	tag = Tag.objects.get(name__iexact = text)
	question_list = tag.question_set.all()
	return question_list