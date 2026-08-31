from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Project, Category

from django.db.models import Avg
from django.db.models.functions import Coalesce

def homepage(request):
    latest_projects = Project.objects.filter(status=Project.Status.RUNNING).order_by('-created_at')[:5]
    featured_projects = Project.objects.filter(is_featured=True)[:5]
    top_rated_projects = Project.objects.filter(status=Project.Status.RUNNING).annotate(
        avg_rating=Coalesce(Avg('ratings__rating'), 0.0)
    ).order_by('-avg_rating', '-created_at')[:5]
    categories = Category.objects.all()

    context = {
        'latest_projects': latest_projects,
        'featured_projects': featured_projects,
        'top_rated_projects': top_rated_projects,
        'categories': categories,
    }
    return render(request, 'projects/homepage.html', context)
from django.shortcuts import get_object_or_404

def project_details(request, project_id):
    # Fetches the specific project or returns a 404 if the ID doesn't exist
    project = get_object_or_404(Project, id=project_id)
    
    # Fetches up to 3 other projects in the same category, excluding this one
    similar_projects = Project.objects.filter(category=project.category).exclude(id=project.id)[:3]
    
    # Fetches all categories for the navigation bar dropdown
    categories = Category.objects.all()
    
    context = {
        'project': project,
        'similar_projects': similar_projects,
        'categories': categories,
    }
    return render(request, 'projects/project-details.html', context)
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from .models import Project, Category

@login_required(login_url='users:login')
def create_project(request):
    if request.method == 'POST':
        # 1. Catch the data sent from the HTML form's 'name' attributes
        title = request.POST.get('title')
        category_name = request.POST.get('category')
        description = request.POST.get('description')
        target_amount = request.POST.get('amount')
        start_date = request.POST.get('startDate')
        end_date = request.POST.get('endDate')

        # 2. Case-insensitive category lookup to avoid duplicates like "education" vs "Education"
        category = Category.objects.filter(name__iexact=category_name).first()
        if not category:
            category = Category.objects.create(name=category_name.strip().title())
        
        # 3. Ensure we have a user (fallback to the first user if you happen to be logged out while testing)
        User = get_user_model()
        current_user = request.user if request.user.is_authenticated else User.objects.first()

                # 4. Save the new project to the database
        new_project = Project.objects.create(
            owner=current_user,
            title=title,
            category=category,
            details=description,
            target_amount=target_amount,
            start_at=f"{start_date} 00:00:00",
            end_at=f"{end_date} 23:59:59"
        )

        image_file = request.FILES.get('image')
        if image_file:
            from .models import ProjectImage
            ProjectImage.objects.create(project=new_project, image=image_file)

        # 5. Instantly redirect them to their newly created project page!
        return redirect('projects:project_details', project_id=new_project.id)

    # If it is a GET request (just visiting the page), show them the empty form
    return render(request, 'projects/create-project.html')
from django.contrib import messages
from donations.models import Donation

def make_donation(request, project_id):
    if request.method == 'POST':
        project = get_object_or_404(Project, id=project_id)
        amount = request.POST.get('amount')
        
        # Verify user or pick first user if unauthenticated
        User = get_user_model()
        current_user = request.user if request.user.is_authenticated else User.objects.first()
        
        if amount and float(amount) > 0:
            Donation.objects.create(
                project=project,
                user=current_user,
                amount=amount
            )
            messages.success(request, f"Successfully donated {amount} EGP!")
            
        return redirect('projects:project_details', project_id=project.id)
    return redirect('projects:homepage')

def category_projects(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    projects = Project.objects.filter(category=category)
    categories = Category.objects.all()
    context = {
        'category': category,
        'featured_projects': projects,   # reuse homepage template's loop variable
        'categories': categories,
    }
    return render(request, 'projects/category.html', context)

from comments.models import Comment
from .models import ProjectReport, CommentReport
from django.contrib import messages

@login_required(login_url='/users/login/')
def add_comment(request, project_id):
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            project = get_object_or_404(Project, id=project_id)
            Comment.objects.create(user=request.user, project=project, content=content)
            messages.success(request, "Comment added successfully.")
    return redirect('projects:project_details', project_id=project_id)

@login_required(login_url='/users/login/')
def add_reply(request, project_id, comment_id):
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            project = get_object_or_404(Project, id=project_id)
            parent_comment = get_object_or_404(Comment, id=comment_id)
            Comment.objects.create(user=request.user, project=project, parent_comment=parent_comment, content=content)
            messages.success(request, "Reply added successfully.")
    return redirect('projects:project_details', project_id=project_id)

@login_required(login_url='/users/login/')
def report_project(request, project_id):
    if request.method == 'POST':
        reason = request.POST.get('reason', 'Inappropriate content')
        project = get_object_or_404(Project, id=project_id)
        # Prevent duplicate reports from same user
        if not ProjectReport.objects.filter(user=request.user, project=project).exists():
            ProjectReport.objects.create(user=request.user, project=project, reason=reason)
            messages.success(request, "Project reported successfully.")
        else:
            messages.info(request, "You have already reported this project.")
    return redirect('projects:project_details', project_id=project_id)

@login_required(login_url='/users/login/')
def report_comment(request, project_id, comment_id):
    if request.method == 'POST':
        reason = request.POST.get('reason', 'Inappropriate content')
        comment = get_object_or_404(Comment, id=comment_id)
        if not CommentReport.objects.filter(user=request.user, comment=comment).exists():
            CommentReport.objects.create(user=request.user, comment=comment, reason=reason)
            messages.success(request, "Comment reported successfully.")
        else:
            messages.info(request, "You have already reported this comment.")
    return redirect('projects:project_details', project_id=project_id)

def all_projects(request):
    # Group projects by category
    categories_with_projects = []
    for cat in Category.objects.all():
        projs = Project.objects.filter(category=cat)
        if projs.exists():
            categories_with_projects.append({
                'category': cat,
                'projects': projs
            })
    context = {
        'categories_with_projects': categories_with_projects,
        'categories': Category.objects.all()
    }
    return render(request, 'projects/all-projects.html', context)

def search_projects(request):
    query = request.GET.get('q', '')
    cat_id = request.GET.get('category', '')
    projects = Project.objects.all()
    
    if query:
        projects = projects.filter(title__icontains=query) | projects.filter(details__icontains=query)
    if cat_id:
        projects = projects.filter(category_id=cat_id)
        
    context = {
        'query': query,
        'selected_category': cat_id,
        'projects': projects,
        'categories': Category.objects.all()
    }
    return render(request, 'projects/search.html', context)

def go_fund(request):
    categories = Category.objects.all()
    context = {'categories': categories}
    return render(request, 'projects/go-fund.html', context)

def generic_page(request, page_name):
    titles = {
        'trust': 'Trust & Safety',
        'help': 'Help Center',
        'terms': 'Terms of Use',
        'privacy': 'Privacy Policy',
        'cookies': 'Cookie Policy',
    }
    context = {
        'title': titles.get(page_name, 'Information'),
        'page_name': page_name
    }
    return render(request, 'projects/generic.html', context)
