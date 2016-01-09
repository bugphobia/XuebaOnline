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
            name='XBAnswer',
            fields=[
                ('aid', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created', models.DateTimeField()),
                ('lastmodified', models.DateTimeField()),
                ('vote', models.IntegerField()),
                ('best', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='XBQuestion',
            fields=[
                ('qid', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256)),
                ('content', models.TextField()),
                ('created', models.DateTimeField()),
                ('lastmodified', models.DateTimeField()),
                ('views', models.IntegerField()),
                ('reples', models.IntegerField()),
                ('solved', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='XBTag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=256)),
                ('count', models.IntegerField()),
                ('excerpt', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='XBVote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('up', models.IntegerField()),
                ('aid', models.ForeignKey(to='question.XBAnswer')),
                ('uid', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='xbquestion',
            name='tags',
            field=models.ManyToManyField(to='question.XBTag'),
        ),
        migrations.AddField(
            model_name='xbquestion',
            name='uid',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='xbanswer',
            name='qid',
            field=models.ForeignKey(to='question.XBQuestion'),
        ),
        migrations.AddField(
            model_name='xbanswer',
            name='uid',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
