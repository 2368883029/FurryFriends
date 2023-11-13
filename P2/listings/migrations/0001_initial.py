# Generated by Django 4.2 on 2023-11-12 21:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Pet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("breed", models.CharField(max_length=255)),
                ("sex", models.CharField(max_length=10)),
                ("age", models.IntegerField()),
                ("size", models.IntegerField()),
                ("color", models.CharField(max_length=50)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("available", "Available"),
                            ("not_available", "Not Available"),
                        ],
                        default="available",
                        max_length=20,
                    ),
                ),
                ("description", models.TextField()),
                ("medical_history", models.TextField(blank=True, null=True)),
                ("other_notes", models.TextField(blank=True, null=True)),
                (
                    "shelter",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
