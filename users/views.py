from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from .forms import CustomUserCreationForm

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True  # Hack to bypass email activation for the deadline
            try:
                user.save()
            except IntegrityError:
                # Email already exists — surface a clean error on the email field
                form.add_error(
                    'email',
                    'An account with this email address already exists. Please sign in instead.'
                )
                return render(request, 'users/register.html', {'form': form})
            login(request, user)
            return redirect('/')  # Redirects to homepage after successful signup
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/register.html', {'form': form})

@login_required(login_url='/users/login/')
def profile_view(request):
    user = request.user
    # Fetch all projects created by this user
    user_projects = user.projects.all()
    context = {
        'user': user,
        'user_projects': user_projects,
    }
    return render(request, 'users/profile.html', context)