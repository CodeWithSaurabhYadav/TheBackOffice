from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.IntegerField()
    def __str__(self):
        return self.name    

class CustomUser(AbstractUser):
    hashed_password = models.CharField(max_length=128)

    email = models.EmailField(unique=True)  # Set email as the unique identifier

    USERNAME_FIELD = 'email'  # Use email as the unique identifier for authentication
    REQUIRED_FIELDS = [] # Remove username as a required field

    # Add related_name attributes to resolve clashes with auth.User
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='customuser_set',  # Add a related_name to resolve the clash
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='customuser_set',  # Add a related_name to resolve the clash
        help_text='Specific permissions for this user.',
    )

