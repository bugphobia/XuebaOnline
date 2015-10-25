from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'^signin/$', views.signin),
    url(r'^signup/$', views.signup),
]
