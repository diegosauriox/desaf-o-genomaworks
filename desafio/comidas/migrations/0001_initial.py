# Generated by Django 3.2.7 on 2022-11-07 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ComidasModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'comidas',
                'managed': False,
            },
        ),
    ]
