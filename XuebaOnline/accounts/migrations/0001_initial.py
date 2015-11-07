# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('birthday', models.DateField(blank=True, null=True)),
                ('location', models.CharField(max_length=256, blank=True, null=True)),
                ('display', models.CharField(max_length=256, blank=True, null=True)),
                ('friends', models.ManyToManyField(blank=True, related_name='_friends_+', to='accounts.UserProfile')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
