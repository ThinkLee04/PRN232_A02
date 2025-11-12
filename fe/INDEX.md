# 📖 Documentation Index

Quick links to all documentation files for the FU News Management System.

## 🚀 Getting Started (Start Here!)

### For Quick Setup
1. **[QUICKSTART.md](QUICKSTART.md)** ⭐ **START HERE**
   - 3-step setup guide
   - Testing instructions
   - Feature checklist
   - Troubleshooting

2. **[HUONG_DAN_TIENG_VIET.md](HUONG_DAN_TIENG_VIET.md)** ⭐ **BẮT ĐẦU TẠI ĐÂY (Tiếng Việt)**
   - Hướng dẫn chi tiết bằng Tiếng Việt
   - Các bước cài đặt
   - Giải quyết lỗi thường gặp

### Automated Setup
- **[setup.ps1](setup.ps1)** - PowerShell script for automatic setup
  ```powershell
  .\setup.ps1
  ```

---

## 📚 Complete Documentation

### Technical Documentation
1. **[README.md](README.md)** - Complete technical documentation
   - Full feature list
   - Technology stack
   - Project structure
   - Environment setup
   - Build instructions

2. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview
   - Files created (40 total)
   - Feature completion checklist
   - Success criteria
   - Bonus features
   - Statistics

---

## 🔌 API Documentation

**[API_REFERENCE.md](API_REFERENCE.md)** - Complete API documentation
- All endpoints with examples
- Request/response formats
- Authentication
- Error handling
- Status codes
- Service usage examples

---

## ✅ Testing

**[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Comprehensive testing guide
- 200+ features to test
- Step-by-step testing instructions
- Public features checklist
- Admin features checklist
- Staff features checklist
- Security testing
- UI/UX testing
- Browser compatibility

---

## 📁 Project Files

### Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS config
- `postcss.config.js` - PostCSS config
- `index.html` - HTML entry point
- `.gitignore` - Git ignore rules

### Source Code Structure
```
src/
├── components/          # Reusable UI components
│   ├── ConfirmDialog.jsx
│   ├── LoadingSpinner.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── contexts/            # React contexts
│   └── AuthContext.jsx
├── pages/               # Page components
│   ├── admin/           # Admin pages
│   ├── staff/           # Staff pages
│   └── [common pages]
├── services/            # API services
├── utils/               # Utilities & helpers
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

---

## 🎯 Quick Reference

### Commands
```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Automated setup
.\setup.ps1
```

### URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/swagger (if enabled)

### Default Credentials
- **Admin**: admin@fpt.edu.vn / admin123
- **Staff**: staff@fpt.edu.vn / staff123

### Main Routes
- `/` - Home (public)
- `/news/:id` - News detail (public)
- `/login` - Login
- `/profile` - Profile (authenticated)
- `/admin/accounts` - Account management (admin)
- `/admin/statistics` - Statistics (admin)
- `/staff/categories` - Category management (staff)
- `/staff/news` - News management (staff)
- `/staff/news-history` - News history (staff)

---

## 🎨 Technology Stack

### Frontend
- React 18.2.0
- React Router 6.20.0
- Tailwind CSS 3.3.6
- Vite 5.0.8

### Libraries
- Axios 1.6.2 (HTTP)
- React Toastify 9.1.3 (Notifications)
- React Icons 4.12.0 (Icons)
- date-fns 2.30.0 (Date formatting)
- jwt-decode 4.0.0 (JWT handling)

---

## 📊 Project Statistics

- **Total Files**: 40
- **Components**: 15
- **Pages**: 10
- **Services**: 5
- **Lines of Code**: 5,000+
- **Features**: 200+
- **Documentation Pages**: 7

---

## 🎓 Feature Categories

### ✅ Public Features (15+)
- Browse news
- Search & filter
- View details
- Responsive design

### ✅ Authentication (15+)
- Login/logout
- JWT tokens
- Role-based access
- Protected routes

### ✅ Admin Features (30+)
- Account CRUD
- Statistics reports
- User management
- Data validation

### ✅ Staff Features (40+)
- Category CRUD
- News CRUD
- Tag management
- Personal history

### ✅ Common Features (10+)
- Profile management
- Password change
- Notifications
- Error handling

### ✅ UI/UX Features (30+)
- Modal dialogs
- Confirmation dialogs
- Loading states
- Toast notifications
- Search functionality
- Responsive design

---

## 🚨 Important Notes

### Before Running
1. ✅ Backend API must be running on port 5000
2. ✅ Database must be seeded with test accounts
3. ✅ CORS must be enabled in backend
4. ✅ Node.js v16+ installed

### Development
- Use `npm run dev` for hot reload
- Check browser console for errors
- Use React DevTools for debugging

### Production
- Run `npm run build` to create production build
- Test production build with `npm run preview`
- Deploy `dist/` folder to hosting

---

## 📞 Support & Help

### If Something Doesn't Work

1. **Check Prerequisites**
   - Node.js installed?
   - Backend running?
   - Dependencies installed?

2. **Common Issues**
   - Port in use → Vite will use next available port
   - Cannot connect → Check backend URL
   - Build errors → Delete node_modules and reinstall

3. **Debug Steps**
   - Open browser console (F12)
   - Check Network tab for API calls
   - Check backend console for errors
   - Read error messages carefully

4. **Documentation**
   - Start with QUICKSTART.md
   - Check API_REFERENCE.md for API issues
   - Use TESTING_CHECKLIST.md to verify features

---

## 🎉 Success Checklist

- [ ] Read QUICKSTART.md
- [ ] Backend API is running
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Can access http://localhost:3000
- [ ] Can login as admin
- [ ] Can login as staff
- [ ] All features work
- [ ] Tests pass using TESTING_CHECKLIST.md

---

## 📄 Document Quick Links

| Document | Purpose | Language |
|----------|---------|----------|
| [QUICKSTART.md](QUICKSTART.md) | Quick setup guide | English |
| [HUONG_DAN_TIENG_VIET.md](HUONG_DAN_TIENG_VIET.md) | Hướng dẫn nhanh | Tiếng Việt |
| [README.md](README.md) | Full documentation | English |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Project overview | English |
| [API_REFERENCE.md](API_REFERENCE.md) | API documentation | English |
| [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) | Testing guide | English |
| [INDEX.md](INDEX.md) | This file | English |

---

## 🎯 Next Steps

1. Choose your starting point:
   - **New to project?** → Start with QUICKSTART.md
   - **Want Vietnamese?** → Read HUONG_DAN_TIENG_VIET.md
   - **Need API info?** → Check API_REFERENCE.md
   - **Ready to test?** → Use TESTING_CHECKLIST.md

2. Run the setup:
   ```powershell
   .\setup.ps1
   ```
   Or manually:
   ```powershell
   npm install
   npm run dev
   ```

3. Test features:
   - Login as admin: admin@fpt.edu.vn / admin123
   - Login as staff: staff@fpt.edu.vn / staff123
   - Test all CRUD operations
   - Generate statistics

4. Build for production:
   ```powershell
   npm run build
   ```

---

**🎉 Happy coding! Everything you need is documented here.**

**Made with ❤️ for FPT University PRN3 Assignment**

**Student**: SE181755  
**Course**: PRN3  
**Project**: FU News Management System  
**Technology**: React + JavaScript + ASP.NET Core Web API
