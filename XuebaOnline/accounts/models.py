from django.db import models
from django.contrib.auth.models import User

from stackExchange.models import Tag,Question,Answer
from django.utils import timezone
# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    birthday = models.DateField(null=True, blank = True)
    location = models.CharField(null=True, blank = True,max_length = 256)
    display = models.CharField(null=True, blank = True,max_length = 256)
    creation_date = models.DateField(auto_now_add = True)
    friends = models.ManyToManyField("self",blank=True)
    saved_tags = models.ManyToManyField(Tag)
    questions = models.ManyToManyField(Question)
    answers = models.ManyToManyField(Answer)
    credit = models.IntegerField(default=0)
    download = models.IntegerField(default=0)
    description = models.CharField(null = True, blank = True,max_length = 256)
    forgettime = models.DateTimeField(default=timezone.now)
