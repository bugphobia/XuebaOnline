from django.conf.urls import url

from . import views

# Warming!
# The urls and the views function may not use the same name.
urlpatterns = [
    url(r'^$', views.home),
    url(r'^login/newuser$', views.signin, {'is_new_user':True}), 
    url(r'^login/$', views.signin, {'is_new_user':False}),
    url(r'^signup/$', views.signup),
    url(r'^logout/$', views.logout_view),
    url(r'^tags/$', views.get_tags),
    url(r'^get_settings/$', views.get_settings),
    url(r'^liketag/', views.like_tag),
    url(r'^disliketag/', views.dislike_tag),
    url(r'^updateprofile/$', views.updateprofile),
    url(r'^userinfo/$', views.userinfo),
]
