from django.shortcuts import render
from .models import Project, Category

def homepage(request):
    # Fetches up to 5 projects where the 'is_featured' box was checked
    featured_projects = Project.objects.filter(is_featured=True)[:5]
    
    # Fetches all categories for the navigation bar
    categories = Category.objects.all()

    context = {
        'featured_projects': featured_projects,
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
            start_at=f"{start_date} 00:00:00",  # Appending time since the database expects DateTime
            end_at=f"{end_date} 23:59:59"
        )

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
    return render(request, 'projects/homepage.html', context)