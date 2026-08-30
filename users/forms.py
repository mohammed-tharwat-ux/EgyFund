from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        # These are the fields the user will fill out to register
        fields = ('email', 'first_name', 'last_name', 'mobile_phone', 'profile_picture')