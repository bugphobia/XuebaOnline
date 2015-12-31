from django.conf.urls import url

from . import views
# Create your views here.

urlpatterns = [
    url(r'^getUnsolvedQuestions$', views.getUnsolvedQuestions),
    url(r'^getHotQuestions$', views.getHotQuestions),
    url(r'^getMyQuestions$', views.getMyQuestions),
    url(r'^getQuestionById$', views.getUnsolvedQuestions),
    url(r'^addQuestion$', views.addQuestion),
    url(r'^addView$', views.addView),
    url(r'^solvedQuestion$', views.solvedQuestion),
    url(r'^giveVote$', views.giveVote),
    url(r'^modifyQuestion$', views.modifyQuestion),
    url(r'^deleteQuestion$', views.deleteQuestion),
    url(r'^addAnswer$', views.addAnswer),
    url(r'^deleteAnswer$', views.deleteQuestion),
    url(r'^modifyAnswer$', views.modifyAnswer),
]
