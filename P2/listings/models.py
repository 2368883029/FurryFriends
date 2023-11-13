from django.db import models
from accounts.models import Account


class Pet(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("not_available", "Not Available"),
    ]

    name = models.CharField(max_length=255)
    breed = models.CharField(max_length=255)
    sex = models.CharField(max_length=10)
    age = models.IntegerField()
    size = models.IntegerField()
    color = models.CharField(max_length=50)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="available",
    )
    description = models.TextField()
    medical_history = models.TextField(blank=True, null=True)
    other_notes = models.TextField(blank=True, null=True)
    shelter = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
