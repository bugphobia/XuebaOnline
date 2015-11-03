from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    birthday = models.DateField(null=True, blank = True)
    location = models.CharField(null=True, blank = True,max_length = 256)
    display = models.CharField(null=True, blank = True,max_length = 256)
    friends = models.ManyToManyField("self",blank=True)
