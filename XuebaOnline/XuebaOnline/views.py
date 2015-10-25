from django.http import HttpResponse
from django.template import RequestContext, loader

def static_page(request,template_name):
    return HttpResponse(loader.get_template(template_name).render())
