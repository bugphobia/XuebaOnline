# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('stackExchange', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='answers',
            field=models.ManyToManyField(to='stackExchange.Answer'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='creation_date',
            field=models.DateField(default=datetime.datetime(2015, 11, 10, 12, 59, 56, 403473, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='questions',
            field=models.ManyToManyField(to='stackExchange.Question'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='saved_tags',
            field=models.ManyToManyField(to='stackExchange.Tag'),
        ),
    ]
