from __future__ import absolute_import

import urllib.request
import json
import datetime

from celery import shared_task
from .models import *

import stackexchange

# @shared_task
def crawl(type_name):
    site = stackexchange.Site(stackexchange.StackOverflow,'U4DMV*8nvpm3EOpvf69Rxw((')
    site.be_inclusive()
    crawl_process = None
    try:
        crawl_process = CrawlProcess.objects.get(type_name = type_name)
    except CrawlProcess.DoesNotExist:
        crawl_process = CrawlProcess(type_name = type_name,page = 1)

    if type_name == 'tag':
        tags = site.tags()
        page = crawl_process.page if crawl_process.page > 0 else 1
        requests_left = site.requests_left
        while site.requests_left > 0:
            print("[DEBUG] crawl_tag:")
            print('[DEBUG] page=%d'%page)
            tags = tags.fetch_page(page)
            is_page_finished = True
            print("[DEBUG] crawl_tag: requests_left=%d"%requests_left)
            for tag in tags.items:
                print('[DEBUG] processing ... > %s <'%tag.name)
                if site.requests_left <= 0:
                    is_page_finished = False
                    break
                model_tag = None
                tag_excerpt = site.tag_wiki(tag.name)[0].excerpt
                try:
                    model_tag = Tag.objects.get(name = tag.name)
                except Tag.DoesNotExist:
                    model_tag = Tag(name = tag.name,
                                    count =tag.count,
                                    excerpt = tag_excerpt)
                model_tag.excerpt = tag_excerpt
                model_tag.count = tag.count
                model_tag.save()
            if is_page_finished:
                page += 1
            crawl_process.page = page
            crawl_process.save()

    elif type_name == 'question':
        questions = site.questions()
        page = crawl_process.page if crawl_process.page > 0 else 1
        requests_left = site.requests_left
        print("[DEBUG] crawl_questions:")
        print('[DEBUG] page=%d'%page)
        while requests_left > 0:
            questions = questions.fetch_page(page)
            requests_left = site.requests_left
            is_page_finished = True
            print("[DEBUG] crawl_questions: requests_left=%d"%requests_left)
            for question in questions.items:
                print('[DEBUG] processing ... > %s <'%question.title)
                if requests_left <= 0:
                    is_page_finished = False
                    break
                model_question = None
                try:
                    model_question = Question.objects.get(
                        question_id = question.id)
                except Question.DoesNotExist:
                    model_question = Question(body = question.body,
                                              creation_date = question.creation_date,
                                              question_id = question.id,
                                              score = question.score,
                                              title = question.title,
                                              url = question.url,
                                              view_count = question.view_count)
                    model_question.save()
                for tag in question.tags:
                    print("[DEBUG]     |- tag %s --- ok!"%tag)
                    try:
                        # keep going!!!
                        model_tag = None
                        try:
                            model_tag = Tag.objects.get(name = tag)
                        except Tag.DoesNotExist:
                            tag = site.tag(tag)
                            tag_excerpt = ""
                            try:
                                tag_excerpt = site.tag_wiki(tag.name)[0].excerpt
                            except:
                                tag_excerpt = ""
                            model_tag = Tag(name = tag.name,
                                            count = tag.count,
                                            excerpt = tag_excerpt)
                            model_tag.save()
                        model_question.tags.add(model_tag)
                        model_question.save()
                    except:
                        print('[ERROR] --- unknown error ---')
                        print('tag.name:%s'%tag.name)
                        # let the program going    
                for answer in question.answers:
                    print("[DEBUG]     |- answer > %d <"%answer.id)
                    model_answer = Answer(body = answer.body,
                                          creation_date = answer.creation_date,
                                          answer_id = answer.id,
                                          is_accepted = answer.is_accepted,
                                          last_activity_date = answer.last_activity_date,
                                          question = model_question,
                                          score = answer.score,
                                          url = answer.url)
                    model_answer.save()
            if is_page_finished:
                page += 1
            crawl_process.page = page
            crawl_process.save()

        
