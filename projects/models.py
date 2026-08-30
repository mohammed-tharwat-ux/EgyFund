from django.conf import settings
from django.db import models
from django.db.models import Sum, Avg

class Category(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True
    )

    def __str__(self):
        return self.name


class Project(models.Model):
    @property
    def total_donations(self):
        if hasattr(self, 'donations'):
            total = self.donations.aggregate(total=Sum('amount'))['total']
            return total if total else 0
        if hasattr(self, 'donation_set'):
            total = self.donation_set.aggregate(total=Sum('amount'))['total']
            return total if total else 0
        return 0

    @property
    def average_rating(self):
        # Calculates the math average of all 1-5 star ratings
        avg = self.ratings.aggregate(avg=Avg('rating'))['avg']
        return round(avg, 1) if avg else 0

    @property
    def can_be_cancelled(self):
        # The 25% Rule: Returns True if current funding is strictly less than 25%
        if self.target_amount == 0:
            return False
        funding_ratio = (self.total_donations / self.target_amount) * 100
        return funding_ratio < 25
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        RUNNING = "RUNNING", "Running"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="projects"
    )

    title = models.CharField(
        max_length=255
    )

    details = models.TextField()

    target_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    start_at = models.DateTimeField()
    end_at = models.DateTimeField()

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT
    )

    is_featured = models.BooleanField(
        default=False
    )

    cancelled_at = models.DateTimeField(
        blank=True,
        null=True
    )

    tags = models.ManyToManyField(
        Tag,
        through="ProjectTag",
        related_name="projects"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(
        upload_to="projects/"
    )

    display_order = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["display_order", "id"]

    def __str__(self):
        return f"{self.project.title} - Image {self.id}"


class ProjectTag(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )

    tag = models.ForeignKey(
        Tag,
        on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["project", "tag"],
                name="unique_project_tag"
            )
        ]

    def __str__(self):
        return f"{self.project.title} - {self.tag.name}"


class ProjectRating(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="project_ratings"
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="ratings"
    )

    rating = models.PositiveSmallIntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "project"],
                name="unique_user_project_rating"
            )
        ]

    def __str__(self):
        return f"{self.project.title} - {self.rating}"


class ProjectReport(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="project_reports"
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="reports"
    )
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.user.email} on {self.project.title}"


class CommentReport(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="comment_reports"
    )
    comment = models.ForeignKey(
        "comments.Comment",
        on_delete=models.CASCADE,
        related_name="reports"
    )
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report by {self.user.email} on comment {self.comment_id}"