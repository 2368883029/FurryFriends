# Generated by Django 4.2.7 on 2023-11-13 02:02

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0002_alter_pet_shelter"),
    ]

    operations = [
        migrations.AddField(
            model_name="pet",
            name="avatar",
            field=models.ImageField(default="blank-profile.png", upload_to="media-pet"),
        ),
    ]
