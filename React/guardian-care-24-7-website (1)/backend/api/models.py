from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=10, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Provider(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='providers')
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    experience_years = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    availability = models.CharField(max_length=20, blank=True, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    reviews = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class UserProfile(models.Model): # Using UserProfile to avoid conflict with Django's built-in User if needed, though here it just maps to users
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='bookings')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='bookings')
    booking_date = models.DateField()
    booking_time = models.TimeField()
    status = models.CharField(max_length=20, blank=True, null=True)
    is_emergency = models.BooleanField(default=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.name} - {self.provider.name} on {self.booking_date}"

class Review(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, related_name='reviews', null=True, blank=True)
    service_type = models.CharField(max_length=50, blank=True, null=True)
    reviewer_name = models.CharField(max_length=100)
    rating = models.IntegerField() # Should ideally have validators, min 1 max 5
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.rating} stars by {self.reviewer_name}"
