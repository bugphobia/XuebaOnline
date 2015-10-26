from django.http import HttpResponse
from django.template import RequestContext, loader

def static_page(request,template_name):
    return HttpResponse(loader.get_template(template_name).render())

def index(request):
    return HttpResponse(loader.get_template('index.djhtml').render())

def test_display_meta(request):
        values = request.META.items()
        html = []
        for k, v in values:
                html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
        return HttpResponse('<table>%s</table>' % '\n'.join(html))
