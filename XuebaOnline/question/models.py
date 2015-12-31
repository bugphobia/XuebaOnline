from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length = 256)
    count = models.IntegerField()
    excerpt = models.TextField(blank = True)

class Question(models.Model):
    qid = models.AutoField(primary_key = True)
    uid = models.OneToOneField(User)
    title = models.CharField(max_length = 256)
    content = models.TextField()
    created = models.DataTimeField()
    lastmodified = models.DataTimeField()
    views = models.IntegerField()
    reples = models.IntegerField()
    solved = models.BooleanField()
    tags = models.ManyToManyField(Tag)

class Answer(models.Model):
	aid = models.AutoField(primary_key = True)
    uid = models.OneToOneField(User)
    qid = models.ForeignKey('Question', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DataTimeField()
    lastmodified = models.DataTimeField()
    vote = models.IntegerField()
    best = models.IntegerField()

class Vote(models.Model):
    aid = models.IntegerField(primary_key=True)
    uid = models.IntegerField(primary_key=True)
    up = models.IntegerField()

