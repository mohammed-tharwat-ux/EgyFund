from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CustomUserCreationForm

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True  # Hack to bypass email activation for the deadline
            user.save()
            login(request, user)
            return redirect('/') # Redirects to homepage after successful signup
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/register.html', {'form': form})