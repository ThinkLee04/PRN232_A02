# Quick Start Guide - FU News Management System

## 🚀 Getting Started in 3 Steps

### Step 1: Start the Backend API

1. Open a terminal in the backend directory:
   ```powershell
   cd d:\FPT\PRN3\Assignment_SE181755\FUNewsManagementSystem\FUNewsManagementSystem.API
   ```

2. Run the API:
   ```powershell
   dotnet run
   ```

3. Verify the API is running at: `http://localhost:5000`

### Step 2: Install Frontend Dependencies

1. Open a **NEW** terminal in the frontend directory:
   ```powershell
   cd d:\FPT\PRN3\Assignment_SE181755\fe
   ```

2. Install all required packages:
   ```powershell
   npm install
   ```

   This will install:
   - React & React DOM
   - React Router
   - Axios (API calls)
   - Tailwind CSS (styling)
   - React Toastify (notifications)
   - React Icons
   - date-fns (date formatting)
   - jwt-decode (authentication)
   - Vite (build tool)

### Step 3: Start the Frontend

```powershell
npm run dev
```

The app will automatically open in your browser at: `http://localhost:3000`

## 🎯 Test the Application

### 1. Public Access (No Login)
- Go to `http://localhost:3000`
- Browse all active news articles
- Search and filter news
- View news details

### 2. Login as Admin
- Click "Login" button
- Email: `admin@fpt.edu.vn`
- Password: `admin123`

**Admin Can:**
- ✅ Manage all user accounts (CRUD)
- ✅ Generate statistics reports
- ✅ View account details
- ✅ Change password

### 3. Login as Staff
- Click "Login" button
- Email: `staff@fpt.edu.vn`
- Password: `staff123`

**Staff Can:**
- ✅ Manage categories (CRUD)
- ✅ Manage news articles (CRUD)
- ✅ Assign tags to news
- ✅ View their news history
- ✅ Change password

## 📋 Feature Checklist

### Public Features ✓
- [x] View active news articles
- [x] Search news
- [x] Filter by category
- [x] View news detail page

### Admin Features ✓
- [x] Account Management (CRUD with popup dialogs)
- [x] Delete validation (cannot delete accounts with news)
- [x] Search accounts
- [x] Statistics report by date range
- [x] View daily breakdown
- [x] Top category statistics

### Staff Features ✓
- [x] Category Management (CRUD with popup dialogs)
- [x] Delete validation (cannot delete categories in use)
- [x] News Article Management (CRUD with popup dialogs)
- [x] Tag selection for news
- [x] News status management (Draft/Active/Inactive)
- [x] View personal news history
- [x] Profile management
- [x] Change password

### Technical Features ✓
- [x] JWT Authentication
- [x] Role-based authorization
- [x] Protected routes
- [x] Responsive design
- [x] Modal dialogs for Create/Update
- [x] Confirmation dialogs for Delete
- [x] Toast notifications
- [x] Loading spinners
- [x] Error handling
- [x] Form validation

## 🎨 UI Components

The application includes:
- **Navbar** - Navigation with role-based menu items
- **Modal** - For Create/Update forms
- **ConfirmDialog** - For Delete confirmations
- **LoadingSpinner** - For async operations
- **ProtectedRoute** - For authorization

## 🔧 Troubleshooting

### Backend not running?
```powershell
cd d:\FPT\PRN3\Assignment_SE181755\FUNewsManagementSystem\FUNewsManagementSystem.API
dotnet run
```

### Frontend errors?
```powershell
cd d:\FPT\PRN3\Assignment_SE181755\fe
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

### Can't connect to API?
- Check backend is running on port 5000
- Check `src/utils/axios.js` has correct API URL
- Verify CORS is enabled in backend

### Port 3000 in use?
- Vite will automatically use next available port (3001, 3002, etc.)
- Or kill the process using port 3000

## 📱 Navigation

### Public
- **Home** (`/`) - Browse all active news
- **News Detail** (`/news/:id`) - View article details
- **Login** (`/login`) - Authentication page

### Admin
- **Accounts** (`/admin/accounts`) - Manage accounts
- **Statistics** (`/admin/statistics`) - View reports

### Staff
- **Categories** (`/staff/categories`) - Manage categories
- **News** (`/staff/news`) - Manage all news articles
- **My News** (`/staff/news-history`) - View personal news

### Common
- **Profile** (`/profile`) - View and edit profile

## 🎓 Project Structure

```
fe/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context (Auth)
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin-only pages
│   │   └── staff/      # Staff-only pages
│   ├── services/       # API service functions
│   ├── utils/          # Helper functions & constants
│   ├── App.jsx         # Main app with routing
│   └── main.jsx        # Entry point
```

## 💡 Tips

1. **Testing Delete Operations:**
   - Try deleting an account that created news → Should fail
   - Try deleting a category used in news → Should fail
   - Delete unused items → Should succeed

2. **Testing Role-Based Access:**
   - Login as Staff → Cannot access `/admin/*` routes
   - Login as Admin → Cannot access `/staff/categories`
   - Not logged in → Redirected to login for protected routes

3. **Testing News Management:**
   - Create news with Draft status → Not visible on home page
   - Change status to Active → Now visible on home page
   - Add multiple tags → Displayed on news cards

4. **Testing Search & Filter:**
   - Search works on title and content
   - Category filter updates results
   - Results update in real-time

## 🚀 Next Steps

1. Test all CRUD operations
2. Verify all validations work
3. Test responsive design on mobile
4. Generate statistics reports
5. Test authentication flow
6. Verify all error handling

## 📞 Need Help?

Check:
1. README.md - Full documentation
2. Browser Console - For JavaScript errors
3. Network Tab - For API call issues
4. Backend Console - For server errors

---

**Enjoy using the FU News Management System! 🎉**
