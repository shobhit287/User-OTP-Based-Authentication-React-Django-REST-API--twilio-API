# Generated by Django 5.0.1 on 2024-03-08 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0002_remove_customuser_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=50, unique=True),
        ),
    ]
