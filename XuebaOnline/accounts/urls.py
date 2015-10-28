from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'^signin/newuser$', views.signin, {'is_new_user':True}),
    url(r'^signin/$', views.signin, {'is_new_user':False}),
    url(r'^signup/$', views.signup),
    url(r'^logout/$', views.logout_view),
]
