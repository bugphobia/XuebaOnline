from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'^signin/newuser$', views.signin, {'is_new_user':True}),
    url(r'^signin/$', views.signin, {'is_new_user':False}),
    url(r'^signup/$', views.signup),
    url(r'^logout/$', views.logout_view),
    url(r'^more_tags/$', views.get_tags),
    url(r'^get_settings/$', views.get_settings),
    url(r'^like_tag/', views.like_tag),
    url(r'^dislike_tag/', views.dislike_tag),
]
