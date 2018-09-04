# Generated by Django 2.1.1 on 2018-09-03 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('address1', models.CharField(blank=True, max_length=255)),
                ('address2', models.CharField(blank=True, max_length=255)),
                ('address3', models.CharField(blank=True, max_length=255)),
                ('postnr', models.IntegerField(max_length=4)),
                ('poststed', models.CharField(max_length=255)),
                ('phone', models.CharField(blank=True, max_length=30)),
                ('email', models.EmailField(blank=True, max_length=64)),
                ('webpage', models.URLField(blank=True, max_length=64)),
            ],
        ),
    ]
