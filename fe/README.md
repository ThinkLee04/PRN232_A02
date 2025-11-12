# FU News Management System - React Frontend

A complete React web application for managing news articles with role-based access control.

## Features

### Public Features
- View all active news articles
- Search and filter news by category
- View detailed news article pages
- No authentication required for viewing active news

### Admin Features (Role: 0)
- **Account Management**
  - Create, read, update, and delete user accounts
  - View account statistics (news count)
  - Cannot delete accounts that have created news articles
  - Search functionality
  
- **Statistics Report**
  - Generate reports by date range
  - View total news, published, draft counts
  - See top categories
  - Daily breakdown with category statistics
  - Visual dashboard with statistics cards

### Staff Features (Role: 1)
- **Category Management**
  - Create, read, update, and delete categories
  - Set parent categories (hierarchical structure)
  - Cannot delete categories used by news articles
  - Search functionality
  
- **News Article Management**
  - Create, read, update, and delete news articles
  - Rich content editor
  - Assign categories and tags
  - Set article status (Draft, Active, Inactive)
  - View all news articles
  
- **My News History**
  - View all news articles created by the logged-in staff
  - Filter by status
  - Statistics dashboard
  
- **Profile Management**
  - View profile information
  - Change password

## Technology Stack

- **React 18** - UI library
- **React Router v6** - Navigation and routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **Vite** - Build tool
- **date-fns** - Date formatting
- **jwt-decode** - JWT token handling

## Project Structure

```
fe/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ConfirmDialog.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin pages
│   │   │   ├── AccountManagement.jsx
│   │   │   └── Statistics.jsx
│   │   ├── staff/          # Staff pages
│   │   │   ├── CategoryManagement.jsx
│   │   │   ├── NewsManagement.jsx
│   │   │   └── NewsHistory.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NewsDetail.jsx
│   │   └── Profile.jsx
│   ├── services/           # API services
│   │   ├── accountService.js
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── newsService.js
│   │   └── tagService.js
│   ├── utils/              # Utility functions
│   │   ├── axios.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- ASP.NET Core Web API running on http://localhost:5000

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API URL (if different):
   - Open `src/utils/axios.js`
   - Update `API_BASE_URL` to your backend URL

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open browser and navigate to:
   ```
   http://localhost:3000
   ```

## Default Credentials

Make sure your backend has these accounts seeded:

- **Admin Account**
  - Email: admin@fpt.edu.vn
  - Password: admin123
  - Role: 0 (Admin)

- **Staff Account**
  - Email: staff@fpt.edu.vn
  - Password: staff123
  - Role: 1 (Staff)

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Key Features Implementation

### Authentication & Authorization
- JWT token-based authentication
- Automatic token injection in API requests
- Protected routes by role
- Automatic redirect on unauthorized access
- Token stored in localStorage

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Modal dialogs for Create/Update operations
- Confirmation dialogs for Delete operations
- Toast notifications for user feedback
- Loading spinners for async operations
- Search and filter functionality
- Pagination-ready structure

### Data Management
- CRUD operations for all entities
- Form validation
- Error handling
- Optimistic UI updates
- Real-time data refresh

### News Article Features
- Rich text content
- Multiple tags support
- Category hierarchy
- Status management (Draft/Active/Inactive)
- Created/Updated tracking
- Author information

## API Integration

The app connects to the following API endpoints:

- `/api/auth/login` - Authentication
- `/api/auth/profile` - Get user profile
- `/api/accounts` - Account management
- `/api/categories` - Category management
- `/api/news-articles` - News article management
- `/api/tags` - Tag management
- `/api/news-articles/statistics` - Statistics reports

## Environment Variables

Create a `.env` file in the `fe` directory if you need to configure:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port already in use
If port 3000 is already in use, Vite will automatically use the next available port.

### API connection errors
- Ensure the backend API is running
- Check the API URL in `src/utils/axios.js`
- Verify CORS is configured on the backend

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache

## Additional Notes

- All dates are formatted using date-fns
- Icons from React Icons library
- Tailwind CSS for consistent styling
- Mobile-first responsive design
- Accessibility considerations included

## License

This project is for educational purposes as part of the PRN3 course assignment.
