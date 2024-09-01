# Generated by Django 5.0.7 on 2024-08-22 09:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='DOB',
            new_name='birth_date',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='Name',
            new_name='name',
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='./default.png', upload_to='profile_pics'),
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('user', 'followed_user')},
        ),
        migrations.CreateModel(
            name='Tweet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(max_length=280)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('likes', models.ManyToManyField(blank=True, related_name='liked_tweets', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]