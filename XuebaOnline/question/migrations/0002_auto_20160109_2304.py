# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='xbanswer',
            name='best',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='xbanswer',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='xbanswer',
            name='lastmodified',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='xbanswer',
            name='vote',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='xbquestion',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='xbquestion',
            name='lastmodified',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='xbquestion',
            name='reples',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='xbquestion',
            name='solved',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='xbquestion',
            name='views',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='xbtag',
            name='count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='xbtag',
            name='excerpt',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='xbvote',
            name='up',
            field=models.IntegerField(default=0),
        ),
    ]
