from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)

    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("editor", "Editor"),
        ("viewer", "Viewer"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="viewer")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
