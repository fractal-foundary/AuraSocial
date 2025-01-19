from django.contrib import admin
from .models import Post, RePost


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "content_preview",
        "created_at",
        "updated_at",
        "likes_count",
    )
    list_filter = ("created_at", "updated_at")
    search_fields = ("content", "author__username")
    readonly_fields = ("created_at", "updated_at")

    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content

    content_preview.short_description = "Content Preview"


@admin.register(RePost)
class RePostAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "original_post",
        "content_preview",
        "created_at",
        "likes_count",
    )
    list_filter = ("created_at", "updated_at")
    search_fields = ("content", "author__username", "original_post__content")
    readonly_fields = ("created_at", "updated_at")

    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content

    content_preview.short_description = "Content Preview"
