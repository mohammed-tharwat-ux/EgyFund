from django.contrib.auth.decorators import user_passes_test
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

from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Sum
from projects.models import Project, Category, ProjectReport, CommentReport
from donations.models import Donation
from .models import User

@staff_member_required(login_url='/')
@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_dashboard_view(request):
    # Overall statistics
    total_users = User.objects.count()
    total_projects = Project.objects.count()
    active_projects = Project.objects.filter(status=Project.Status.RUNNING).count()
    total_donations = Donation.objects.aggregate(total=Sum('amount'))['total'] or 0
    reported_projects = ProjectReport.objects.count()
    reported_comments = CommentReport.objects.count()

    # Lists for tables
    users_list = User.objects.all().order_by('-created_at')
    projects_list = Project.objects.all().order_by('-created_at')
    categories_list = Category.objects.all()
    project_reports_list = ProjectReport.objects.all().order_by('-created_at')
    comment_reports_list = CommentReport.objects.all().order_by('-created_at')
    featured_projects = Project.objects.filter(is_featured=True)

    context = {
        'total_users': total_users,
        'total_projects': total_projects,
        'active_projects': active_projects,
        'total_donations': total_donations,
        'reported_projects': reported_projects,
        'reported_comments': reported_comments,
        'users_list': users_list,
        'projects_list': projects_list,
        'categories_list': categories_list,
        'project_reports_list': project_reports_list,
        'comment_reports_list': comment_reports_list,
        'featured_projects': featured_projects,
    }
    return render(request, 'admin/admin.html', context)

from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from projects.models import Project, ProjectReport, CommentReport
from comments.models import Comment

@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_toggle_featured(request, project_id):
    if not request.user.is_superuser:
        return redirect('projects:homepage')
    if request.method == "POST":
        project = get_object_or_404(Project, id=project_id)
        project.is_featured = not project.is_featured
        project.save()
        messages.success(request, f"Project '{project.title}' featured status updated.")
    return redirect('/admin/#featured')

@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_delete_comment(request, comment_id):
    if not request.user.is_superuser:
        return redirect('projects:homepage')
    if request.method == "POST":
        comment = get_object_or_404(Comment, id=comment_id)
        comment.delete()
        messages.success(request, "Comment deleted successfully.")
    return redirect('/admin/#reports')

@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_delete_project(request, project_id):
    if not request.user.is_superuser:
        return redirect('projects:homepage')
    if request.method == "POST":
        project = get_object_or_404(Project, id=project_id)
        project.delete()
        messages.success(request, "Project deleted successfully.")
    return redirect('/admin/#projects')

from projects.models import Category

@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_add_category(request):
    if not request.user.is_superuser:
        return redirect('projects:homepage')
    if request.method == "POST":
        name = request.POST.get('name')
        if name:
            Category.objects.get_or_create(name=name.strip())
            messages.success(request, f"Category '{name}' added successfully.")
    return redirect('/admin/#categories')

@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_edit_category(request, category_id):
    if not request.user.is_superuser:
        return redirect('projects:homepage')
    if request.method == "POST":
        category = get_object_or_404(Category, id=category_id)
        new_name = request.POST.get('name')
        if new_name:
            category.name = new_name.strip()
            category.save()
            messages.success(request, f"Category updated successfully.")
    return redirect('/admin/#categories')

@user_passes_test(lambda u: u.is_superuser, login_url='/')
def admin_delete_category(request, category_id):
    if not request.user.is_superuser:
        return redirect('projects:homepage')
    if request.method == "POST":
        category = get_object_or_404(Category, id=category_id)
        category.delete()
        messages.success(request, "Category deleted successfully.")
    return redirect('/admin/#categories')
