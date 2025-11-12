# 🎯 Feature Testing Checklist

Use this checklist to test all features of the FU News Management System.

## 🔧 Initial Setup
- [ ] Backend API is running on http://localhost:5000
- [ ] Frontend is running on http://localhost:3000
- [ ] No console errors on page load
- [ ] Can navigate to different pages

---

## 🌍 Public Features (No Login Required)

### Home Page
- [ ] Can access home page at `/`
- [ ] See grid of news articles
- [ ] All articles have status "Active" (status = 1)
- [ ] Each article shows:
  - [ ] Title
  - [ ] Headline
  - [ ] Category badge
  - [ ] Author name
  - [ ] Created date
  - [ ] Tags

### Search & Filter
- [ ] Search bar works
- [ ] Search updates results in real-time
- [ ] Can filter by category
- [ ] Category dropdown shows all categories
- [ ] Result count updates correctly

### News Detail Page
- [ ] Click on news article navigates to detail page
- [ ] URL is `/news/{id}`
- [ ] Shows full article content
- [ ] Shows all metadata (author, date, source)
- [ ] Shows all tags
- [ ] Back button works
- [ ] Content is properly formatted

---

## 🔐 Authentication

### Login Page
- [ ] Can access login page at `/login`
- [ ] Email input field works
- [ ] Password input field works
- [ ] Shows validation errors if fields empty
- [ ] Loading spinner shows during login
- [ ] Success message on successful login
- [ ] Error message on failed login

### Admin Login
- [ ] Can login with admin@fpt.edu.vn / admin123
- [ ] Redirects to `/admin/accounts`
- [ ] Navbar shows admin menu items
- [ ] Shows "Accounts" link
- [ ] Shows "Statistics" link
- [ ] Shows username "Admin"

### Staff Login
- [ ] Can login with staff@fpt.edu.vn / staff123
- [ ] Redirects to `/staff/news`
- [ ] Navbar shows staff menu items
- [ ] Shows "Categories" link
- [ ] Shows "News" link
- [ ] Shows "My News" link

### Logout
- [ ] Logout button in navbar
- [ ] Clicking logout shows success message
- [ ] Redirects to login page
- [ ] Cannot access protected pages after logout

---

## 👑 Admin Features (Role: 0)

### Account Management (`/admin/accounts`)
- [ ] Can access page
- [ ] Shows table of all accounts
- [ ] Table shows: Name, Email, Role, News Count
- [ ] Search bar works
- [ ] "Create Account" button visible

#### Create Account
- [ ] Click "Create Account" opens modal
- [ ] Modal shows all fields:
  - [ ] Name (required)
  - [ ] Email (required)
  - [ ] Password (required, min 6 chars)
  - [ ] Role dropdown (Admin/Staff/Lecturer)
- [ ] Cancel button closes modal
- [ ] Create button submits form
- [ ] Shows success message on create
- [ ] New account appears in table
- [ ] Modal closes after create

#### Update Account
- [ ] Click edit icon opens modal
- [ ] Modal pre-fills with account data
- [ ] Can modify all fields
- [ ] Password field is optional
- [ ] Update button submits form
- [ ] Shows success message on update
- [ ] Table updates with new data
- [ ] Modal closes after update

#### Delete Account
- [ ] Click delete icon opens confirmation dialog
- [ ] Dialog shows account name
- [ ] Cancel button closes dialog
- [ ] Delete button attempts deletion
- [ ] Success if account has no news
- [ ] Error if account has news articles
- [ ] Account removed from table if successful

#### Search Accounts
- [ ] Search by name works
- [ ] Search by email works
- [ ] Results update in real-time
- [ ] Shows message if no results

### Statistics Report (`/admin/statistics`)
- [ ] Can access page
- [ ] Shows date range form
- [ ] Start date picker works
- [ ] End date picker works
- [ ] "Generate Report" button works

#### Report Display
- [ ] Shows 4 statistics cards:
  - [ ] Total News
  - [ ] Published count
  - [ ] Draft count
  - [ ] Total Authors
- [ ] Shows top category section
- [ ] Shows daily breakdown table
- [ ] Daily breakdown sorted descending
- [ ] Each day shows category breakdown
- [ ] All numbers are accurate

#### Report Validation
- [ ] Validates both dates required
- [ ] Validates start date before end date
- [ ] Shows error for invalid range
- [ ] Shows success message on generate

---

## 👨‍💼 Staff Features (Role: 1)

### Category Management (`/staff/categories`)
- [ ] Can access page
- [ ] Shows table of all categories
- [ ] Table shows: Name, Description, Parent, Status
- [ ] Search bar works
- [ ] "Create Category" button visible

#### Create Category
- [ ] Click "Create Category" opens modal
- [ ] Modal shows all fields:
  - [ ] Name (required)
  - [ ] Description (optional)
  - [ ] Parent Category dropdown
  - [ ] Active checkbox
- [ ] Parent category dropdown shows all categories
- [ ] "None" option for parent
- [ ] Create button submits form
- [ ] Success message on create
- [ ] New category appears in table

#### Update Category
- [ ] Click edit icon opens modal
- [ ] Modal pre-fills with category data
- [ ] Can modify all fields
- [ ] Cannot select self as parent
- [ ] Update button submits form
- [ ] Success message on update
- [ ] Table updates with new data

#### Delete Category
- [ ] Click delete icon opens confirmation
- [ ] Dialog shows category name
- [ ] Delete works if no news uses it
- [ ] Error if category is in use
- [ ] Category removed if successful

### News Management (`/staff/news`)
- [ ] Can access page
- [ ] Shows table of all news articles
- [ ] Table shows: Title, Category, Author, Date, Status
- [ ] Search bar works
- [ ] "Create News" button visible

#### Create News Article
- [ ] Click "Create News" opens modal
- [ ] Modal is large (xlarge)
- [ ] Shows all fields:
  - [ ] Title (required)
  - [ ] Category dropdown (required)
  - [ ] Headline (optional)
  - [ ] Content textarea (required)
  - [ ] Source (optional)
  - [ ] Status dropdown (required)
- [ ] Shows all available tags
- [ ] Can select multiple tags
- [ ] Tags highlight when selected
- [ ] Create button submits form
- [ ] Success message on create
- [ ] New article appears in table

#### Update News Article
- [ ] Click edit icon opens modal
- [ ] Modal pre-fills all fields
- [ ] Can modify all fields
- [ ] Previously selected tags are highlighted
- [ ] Can add/remove tags
- [ ] Update button submits form
- [ ] Success message on update
- [ ] Table updates with new data

#### Delete News Article
- [ ] Click delete icon opens confirmation
- [ ] Dialog shows article title
- [ ] Delete button works
- [ ] Success message on delete
- [ ] Article removed from table

#### View News Article
- [ ] Eye icon navigates to detail page
- [ ] Can view full article
- [ ] Back button returns to management

#### Search News
- [ ] Search by title works
- [ ] Results update in real-time
- [ ] Shows message if no results

### News History (`/staff/news-history`)
- [ ] Can access page
- [ ] Shows only current user's articles
- [ ] Shows statistics cards:
  - [ ] Total Articles
  - [ ] Active count
  - [ ] Draft count
  - [ ] Inactive count
- [ ] Shows status filter dropdown
- [ ] Filter by "All Status" works
- [ ] Filter by "Active" works
- [ ] Filter by "Draft" works
- [ ] Filter by "Inactive" works
- [ ] Each article shows as a card
- [ ] Cards show: Title, Category, Status, Date, Tags
- [ ] "View Details" button works

---

## 👤 Common Authenticated Features

### Profile (`/profile`)
- [ ] Can access page
- [ ] Shows profile avatar
- [ ] Shows all profile information:
  - [ ] Name
  - [ ] Email
  - [ ] Role badge
  - [ ] News count (for staff)
- [ ] "Change Password" button visible

#### Change Password
- [ ] Click button opens modal
- [ ] Shows 3 fields:
  - [ ] Current Password (required)
  - [ ] New Password (required, min 6)
  - [ ] Confirm New Password (required)
- [ ] Validates passwords match
- [ ] Validates minimum length
- [ ] Shows success on change
- [ ] Shows error if current password wrong
- [ ] Modal closes after success

---

## 🔒 Security & Authorization

### Protected Routes
- [ ] Cannot access `/admin/*` without login
- [ ] Cannot access `/staff/*` without login
- [ ] Cannot access `/profile` without login
- [ ] Redirects to `/login` if not authenticated

### Role-Based Access
- [ ] Staff cannot access `/admin/accounts`
- [ ] Staff cannot access `/admin/statistics`
- [ ] Admin cannot access `/staff/categories`
- [ ] Redirects to home if wrong role

### Token Management
- [ ] Token stored in localStorage
- [ ] Token sent with all API requests
- [ ] Auto-logout on 401 error
- [ ] Can refresh page without losing session

---

## 🎨 UI/UX Features

### Responsive Design
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] No horizontal scrolling
- [ ] Touch-friendly buttons

### Notifications
- [ ] Success toasts show on success
- [ ] Error toasts show on errors
- [ ] Toasts auto-dismiss after 3 seconds
- [ ] Can manually close toasts

### Loading States
- [ ] Spinner shows during API calls
- [ ] Buttons disabled during submit
- [ ] Full-screen spinner on page load
- [ ] No layout shift during loading

### Modals
- [ ] Can close by clicking X
- [ ] Cannot close by clicking outside
- [ ] Cancel button closes modal
- [ ] Escape key closes modal
- [ ] Scrollable content if too tall

### Confirmation Dialogs
- [ ] Shows warning message
- [ ] Cancel button works
- [ ] Confirm button works
- [ ] Dialog closes after action

### Navigation
- [ ] Logo links to home
- [ ] All nav links work
- [ ] Active page highlighted
- [ ] Logout button works

---

## 🐛 Error Handling

### API Errors
- [ ] Shows error toast on 400
- [ ] Shows error toast on 404
- [ ] Shows error toast on 500
- [ ] Auto-logout on 401

### Form Validation
- [ ] Required fields show error
- [ ] Email format validated
- [ ] Password length validated
- [ ] Date range validated

### Network Errors
- [ ] Shows error if API unreachable
- [ ] Shows error on timeout
- [ ] Doesn't crash on errors

---

## ⚡ Performance

### Page Load
- [ ] Home page loads in < 2 seconds
- [ ] Detail page loads in < 1 second
- [ ] No unnecessary re-renders

### Search/Filter
- [ ] Search is responsive (< 100ms)
- [ ] Filter updates immediately
- [ ] No lag with large datasets

---

## 📱 Browser Compatibility

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Proper rendering

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Proper rendering

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] Proper rendering

---

## 🎉 Final Checks

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Clean code structure
- [ ] Proper component organization

### Documentation
- [ ] README.md complete
- [ ] QUICKSTART.md clear
- [ ] API_REFERENCE.md accurate
- [ ] Comments in complex code

### Deployment Ready
- [ ] Build succeeds: `npm run build`
- [ ] Production build works
- [ ] No development dependencies in build
- [ ] Optimized bundle size

---

## 📊 Testing Summary

Total Features: 200+
- [ ] Public Features: 15
- [ ] Authentication: 15
- [ ] Admin Features: 30
- [ ] Staff Features: 40
- [ ] Common Features: 10
- [ ] Security: 10
- [ ] UI/UX: 30
- [ ] Error Handling: 15
- [ ] Performance: 5
- [ ] Browser Compatibility: 10
- [ ] Final Checks: 10

---

## ✅ Test Result

**Date Tested**: _______________

**Tested By**: _______________

**Pass Rate**: _____ / 200+ features

**Issues Found**: _______________

**Status**: _______________
- [ ] Ready for Demo
- [ ] Ready for Submission
- [ ] Ready for Production
- [ ] Needs Fixes

---

**🎉 Congratulations on completing the testing!**
