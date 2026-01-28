from django.contrib import admin
from .models import Pipelines

@admin.register(Pipelines)
class PipelinesAdmin(admin.ModelAdmin):
    list_display = ("name", "project", "created_at", "updated_at")
    list_filter = ("created_at",)
    search_fields = ("name", "description")
