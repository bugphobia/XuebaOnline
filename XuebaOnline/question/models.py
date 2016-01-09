from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class XBTag(models.Model):
    name = models.CharField(max_length = 256)
    count = models.IntegerField()
    excerpt = models.TextField(blank = True)

class XBQuestion(models.Model):
    qid = models.AutoField(primary_key = True)
    uid = models.ForeignKey(User)
    title = models.CharField(max_length = 256)
    content = models.TextField()
    created = models.DateTimeField()
    lastmodified = models.DateTimeField()
    views = models.IntegerField()
    reples = models.IntegerField()
    solved = models.BooleanField()
    tags = models.ManyToManyField(XBTag)

class XBAnswer(models.Model):
    aid = models.AutoField(primary_key = True)
    uid = models.ForeignKey(User)
    qid = models.ForeignKey('XBQuestion', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField()
    lastmodified = models.DateTimeField()
    vote = models.IntegerField()
    best = models.IntegerField()

class XBVote(models.Model):
    aid = models.ForeignKey(XBAnswer)
    uid = models.ForeignKey(User)
    up = models.IntegerField()

