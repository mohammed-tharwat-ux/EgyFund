from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email=email, password=password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    # Egyptian Mobile Validation (010, 011, 012, 015 + 8 digits)
    phone_regex = RegexValidator(
        regex=r'^01[0125][0-9]{8}$',
        message="Mobile number must be a valid Egyptian phone number (e.g., 01012345678)."
    )
    mobile_phone = models.CharField(validators=[phone_regex], max_length=11)

    profile_picture = models.ImageField(upload_to="profiles/", blank=True, null=True)

    # Account Activation
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    activation_token = models.CharField(max_length=255, unique=True, blank=True, null=True)
    activation_expires_at = models.DateTimeField(blank=True, null=True)

    # Optional / Bonus Profile Data
    birthdate = models.DateField(blank=True, null=True)
    facebook_profile = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email