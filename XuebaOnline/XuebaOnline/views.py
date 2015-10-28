from django.http import HttpResponse
from django.template import RequestContext, loader, Context
from django.contrib.auth import get_user

from django.contrib.auth.models import User

def static_page(request,template_name):
    if get_user(request) is not None:
        user = get_user(request)
        print(user)
        return HttpResponse(loader.get_template(template_name).render(Context({"user": user})))
    else:
        print("request has no user")
        return HttpResponse(loader.get_template(template_name).render())

def index(request):
    if get_user(request) is not None:
        user = get_user(request)
        print(user)
        return HttpResponse(loader.get_template('index.djhtml').render(Context({"user": user})))
    else:
        print("request has no user")
        return HttpResponse(loader.get_template('index.djhtml').render())

def test_display_meta(request):
        values = request.META.items()
        html = []
        for k, v in values:
                html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
        return HttpResponse('<table>%s</table>' % '\n'.join(html))
