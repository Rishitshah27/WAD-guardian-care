from django.contrib import admin
from .models import Category, Provider, UserProfile, Booking, Review

admin.site.register(Category)
admin.site.register(Provider)
admin.site.register(UserProfile)
admin.site.register(Booking)
admin.site.register(Review)
