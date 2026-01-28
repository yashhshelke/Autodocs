from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Template

@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ("name", "project")
    search_fields = ("name",)
