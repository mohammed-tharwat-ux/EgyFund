# 🇪🇬 EgyFund

### Egyptian Crowdfunding Platform

EgyFund is a web-based crowdfunding platform designed to help people in Egypt create fundraising campaigns and receive financial support from other users.

The platform allows users to create projects, set fundraising targets, receive donations, interact through comments, and discover other crowdfunding campaigns.

---

## 📌 Project Overview

**EgyFund** aims to provide a simple and secure platform for launching and supporting fundraising campaigns in Egypt.

Users can register, activate their accounts, create fundraising projects, donate to projects, comment on campaigns, rate projects, and discover similar projects.

The project specification defines the platform as a crowdfunding web application focused on raising small amounts of money from a large number of people through the Internet.

---

## ✨ Features

### 🔐 Authentication

* User registration
* First name and last name
* Email and password
* Egyptian mobile phone validation
* Profile picture
* Email account activation
* Activation link expiration after 24 hours
* Login after account activation
* Forgot password functionality
* Optional Facebook login

The account activation system prevents users from logging in before their accounts have been activated.

---

### 👤 User Profile

Users can:

* View their profile
* View their projects
* View their donations
* Edit their profile information
* Keep additional information such as:

  * Birthdate
  * Facebook profile
  * Country
* Delete their account with confirmation

The project specification also defines password confirmation for account deletion as a bonus feature.

---

### 🚀 Projects

Users can create fundraising campaigns containing:

* Project title
* Project details
* Category
* Multiple project pictures
* Total fundraising target
* Multiple tags
* Campaign start date/time
* Campaign end date/time

Users can browse projects and donate toward their fundraising targets.

---

### 💰 Donations

Users can donate to fundraising projects.

The platform tracks:

* Donor
* Project
* Donation amount
* Donation date/time

Donations contribute toward the project's total fundraising target.

---

### 💬 Comments

Users can add comments to projects.

The platform also supports comment replies, allowing users to create discussions around fundraising campaigns.

---

### ⭐ Project Ratings

Users can rate projects.

Each project page displays the overall average rating of the project.

---

### 🚨 Reporting

Users can report:

* Inappropriate projects
* Inappropriate comments

These reports can be used by administrators to review inappropriate content.

---

### ❌ Project Cancellation

A project creator can cancel a campaign when the collected donations are less than **25% of the project's target**.

---

### 🏠 Homepage

The homepage provides:

* Top 5 highest-rated running projects
* Latest 5 projects
* Latest 5 featured projects
* Project categories
* Category-based project browsing
* Project search by title or tag

Featured projects are selected by the administrator.

---

## 🗃️ Main Database Entities

The core database design is based around:

```text
Users
Projects
Donations
Comments
```

Main relationships:

```text
Users
  │
  ├── creates ──────> Projects
  │
  ├── makes ────────> Donations
  │
  └── writes ───────> Comments

Projects
  │
  ├── receives ─────> Donations
  │
  └── contains ─────> Comments

Comments
  │
  └── replies to ───> Comments
```

Additional supporting entities may be required for features such as categories, tags, project images, ratings, and reports.

---

## 🛠️ Technology Stack

The project is designed as a web application and can be implemented using:

* **Backend:** Django
* **Database:** SQLite / PostgreSQL
* **Frontend:** HTML, CSS, JavaScript
* **Authentication:** Django Authentication
* **Version Control:** Git & GitHub

> The exact implementation stack may vary depending on the project's development requirements.

---

## 📂 Project Structure

A typical Django structure can be organized as:

```text
EgyFund/
│
├── manage.py
│
├── project/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── users/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── forms.py
│
├── projects/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── forms.py
│
├── donations/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── comments/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── templates/
├── static/
├── media/
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/mohammed-tharwat-ux/EgyFund.git
```

### 2. Enter the project directory

```bash
cd EgyFund
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows

```powershell
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Apply database migrations

```bash
python manage.py migrate
```

### 7. Run the development server

```bash
python manage.py runserver
```

Then open:

```text
http://127.0.0.1:8000/
```

---

## 🔑 Environment Configuration

If environment variables are required, create a `.env` file:

```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
EMAIL_HOST_USER=your-email
EMAIL_HOST_PASSWORD=your-email-password
```

Do not commit sensitive credentials to GitHub.

---

## 🧪 Testing

Run Django tests using:

```bash
python manage.py test
```

Before deployment, verify:

* User registration
* Email activation
* Login
* Project creation
* Project browsing
* Donations
* Comments
* Comment replies
* Project ratings
* Reporting
* Project cancellation
* Search
* Categories
* Featured projects

---

## 🔒 Security Considerations

The application should protect:

* User passwords
* Authentication sessions
* Email credentials
* CSRF tokens
* User-uploaded files
* Donation data
* Administrative functionality

Passwords must never be stored as plain text.

---

## 📊 Core Business Rules

| Rule                  | Description                                               |
| --------------------- | --------------------------------------------------------- |
| Account Activation    | Users cannot log in before activating their account       |
| Activation Expiration | Activation links expire after 24 hours                    |
| Project Target        | Every fundraising project has a target amount             |
| Project Cancellation  | Creator can cancel when donations are below 25% of target |
| Comments              | Users can comment on projects                             |
| Replies               | Comments can have replies                                 |
| Ratings               | Projects can be rated                                     |
| Reports               | Projects and comments can be reported                     |
| Featured Projects     | Featured projects are selected by admins                  |
| Search                | Projects can be searched by title or tag                  |

## These rules are derived from the provided project specification.

## 🎯 Project Goals

EgyFund is designed to:

* Make fundraising accessible in Egypt
* Connect project creators with potential donors
* Provide an organized project discovery experience
* Enable users to interact with project creators
* Provide project ratings and community feedback
* Provide administrators with moderation capabilities

---

## 🚀 Future Improvements

Potential future improvements include:

* Online payment gateway integration
* Advanced admin dashboard
* Real-time donation updates
* Email notifications
* Social authentication
* Advanced project analytics
* Fraud detection
* Donation receipts
* Mobile application
* REST API
* AI-powered project recommendations

---

## 👨‍💻 Development

This project is developed as a crowdfunding web application following the provided project requirements.

Contributions, improvements, and bug fixes can be managed through GitHub Issues and Pull Requests.

---

## 📄 Project Specification

The original project specification defines the application as a crowdfunding platform for fundraising projects in Egypt and describes the required authentication, projects, donations, comments, ratings, reporting, and homepage functionality.

---

## 📌 Repository

**EgyFund**

GitHub Repository: `mohammed-tharwat-ux/EgyFund`

---

## 📜 License

This project is developed for educational and academic purposes.

---

### 🇪🇬 EgyFund

**Fund Ideas. Support Dreams. Build Egypt.**
