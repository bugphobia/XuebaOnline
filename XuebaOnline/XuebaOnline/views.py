from django.http import HttpResponse
from django.template import RequestContext, loader

def index(request):
    return HttpResponse(loader.get_template('index.djhtml').render())
