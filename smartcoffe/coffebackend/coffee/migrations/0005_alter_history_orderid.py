# Generated by Django 5.1.1 on 2024-10-04 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coffee', '0004_history'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='orderid',
            field=models.CharField(blank=True),
        ),
    ]
