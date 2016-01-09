# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0002_auto_20160109_2304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='xbvote',
            name='up',
            field=models.IntegerField(default=1),
        ),
    ]
