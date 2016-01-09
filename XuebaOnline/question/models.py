from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class XBTag(models.Model):
    name = models.CharField(max_length = 256)
    count = models.IntegerField(default=0)
    excerpt = models.TextField(blank = True, null=True)

class XBQuestion(models.Model):
    qid = models.AutoField(primary_key = True)
    uid = models.ForeignKey(User)
    title = models.CharField(max_length = 256)
    content = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    lastmodified = models.DateTimeField(default=timezone.now)
    views = models.IntegerField(default=0)
    reples = models.IntegerField(default=0)
    solved = models.BooleanField(default=False) 
    tags = models.ManyToManyField(XBTag)

class XBAnswer(models.Model):
    aid = models.AutoField(primary_key = True)
    uid = models.ForeignKey(User)
    qid = models.ForeignKey('XBQuestion', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    lastmodified = models.DateTimeField(default=timezone.now)
    vote = models.IntegerField(default=0)
    best = models.IntegerField(default=0)

class XBVote(models.Model):
    aid = models.ForeignKey(XBAnswer)
    uid = models.ForeignKey(User)
    up = models.IntegerField(default=1)

