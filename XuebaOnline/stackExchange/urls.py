from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', static_page, {'template_name':'crawler.djhtml'}),
    url(r'^crawltags/$', lauch_fetch, {'type_name':'tag'}),
    url(r'^crawlquestions/$', lauch_fetch, {'type_name':'question'}),
]
