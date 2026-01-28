from django.db import models

# Create your models here.
class Pipelines(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    project = models.ForeignKey("projects.Project", on_delete=models.CASCADE)