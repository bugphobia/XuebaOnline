from django.shortcuts import render

from django.http import HttpResponse
from django.template import RequestContext, loader, Context

from .models import CrawlProcess
from .tasks import crawl

import json

# Create your views here.
def static_page(request,template_name):
    return HttpResponse(loader.get_template(template_name).render(RequestContext(request)))

def get_process(request,type_name):
    page = 0
    if type_name == 'tag' or type_name == 'question':
        crawl_process = None
        try:
            crawl_process = CrawlProcess.objects.get(type_name = type_name)
        except CrawlProcess.DoesNotExist:
            crawl_process = CrawlProcess(type_name = type_name,page = 0)
            crawl_process.save()
        page = crawl_process.page
    return HttpResponse(json.dumps({'page':page}))

def lauch_fetch(request,type_name):
    if type_name == 'tag' or type_name == 'question':
        crawl(type_name)
