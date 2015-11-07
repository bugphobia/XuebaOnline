# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('body', models.TextField()),
                ('creation_date', models.DateTimeField()),
                ('answer_id', models.BigIntegerField()),
                ('is_accepted', models.BooleanField()),
                ('last_activity_date', models.DateTimeField()),
                ('score', models.IntegerField()),
                ('url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='CrawlProcess',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('type_name', models.CharField(max_length=256)),
                ('page', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('body', models.TextField()),
                ('creation_date', models.DateTimeField()),
                ('question_id', models.BigIntegerField()),
                ('score', models.IntegerField()),
                ('title', models.CharField(max_length=256)),
                ('url', models.URLField()),
                ('view_count', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('count', models.IntegerField()),
                ('excerpt', models.TextField(blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='tags',
            field=models.ManyToManyField(to='stackExchange.Tag'),
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(to='stackExchange.Question'),
        ),
    ]
