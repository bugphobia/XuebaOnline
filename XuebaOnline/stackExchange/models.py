from django.db import models

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length = 256)
    count = models.IntegerField()
    excerpt = models.TextField(blank = True)

class Question(models.Model):
    body = models.TextField()
    creation_date = models.DateTimeField()
    question_id = models.BigIntegerField()
    score = models.IntegerField()
    tags = models.ManyToManyField(Tag)
    title = models.CharField(max_length = 256)
    url = models.URLField()
    view_count = models.IntegerField()

class Answer(models.Model):
    body = models.TextField()
    creation_date = models.DateTimeField()
    answer_id = models.BigIntegerField()
    is_accepted = models.BooleanField()
    last_activity_date = models.DateTimeField()
    question = models.ForeignKey('Question')
    score = models.IntegerField()
    url = models.URLField()

class CrawlProcess(models.Model):
    type_name = models.CharField(max_length = 256)
    page = models.IntegerField()
