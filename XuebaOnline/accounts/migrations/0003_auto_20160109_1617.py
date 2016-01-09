# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20151110_1259'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='credit',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='description',
            field=models.CharField(max_length=256, blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='download',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='forgettime',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
