# API Documentation Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication

All authenticated endpoints require Bearer token in header:
```
Authorization: Bearer <JWT_TOKEN>
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@fpt.edu.vn",
  "password": "admin123"
}

Response:
{
  "data": {
    "userId": 1,
    "userName": "Admin",
    "userEmail": "admin@fpt.edu.vn",
    "role": 0,
    "token": "eyJhbGci..."
  },
  "message": "Login successfully",
  "statusCode": "200"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response:
{
  "data": {
    "accountId": 1,
    "accountEmail": "admin@fpt.edu.vn",
    "accountName": "Admin",
    "accountRole": 0
  },
  "message": "Profile retrieved successfully",
  "statusCode": "200"
}
```

## Accounts (Admin Only - Role: 0)

### Get All Accounts
```http
GET /accounts
Authorization: Bearer <token>
```

### Get Account Detail
```http
GET /accounts/{accountId}
Authorization: Bearer <token>
```

### Create Account
```http
POST /accounts
Authorization: Bearer <token>
Content-Type: application/json

{
  "accountName": "New User",
  "accountEmail": "user@fpt.edu.vn",
  "accountPassword": "password123",
  "accountRole": 1
}
```

### Update Account
```http
PUT /accounts/{accountId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "accountName": "Updated Name",
  "accountEmail": "user@fpt.edu.vn",
  "accountRole": 1,
  "accountPassword": "newpassword"  // Optional
}
```

### Delete Account
```http
DELETE /accounts/{accountId}
Authorization: Bearer <token>
```

### Change Password
```http
PUT /accounts/{accountId}/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "current123",
  "newPassword": "new123"
}
```

## Categories (Staff Only - Role: 1)

### Get All Categories (Public)
```http
GET /categories
```

### Get Category Detail (Public)
```http
GET /categories/{id}
```

### Create Category
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryName": "Technology",
  "categoryDescription": "Tech news",
  "parentCategoryId": null,
  "isActive": true
}
```

### Update Category
```http
PUT /categories/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryName": "Updated Tech",
  "categoryDescription": "Updated description",
  "parentCategoryId": 1
}
```

### Delete Category
```http
DELETE /categories/{id}
Authorization: Bearer <token>
```

## News Articles

### Get All News (Public)
```http
GET /news-articles

Response: Array of news with status = 1 (Active)
```

### Search News (Public)
```http
GET /news-articles/search?searchTerm=technology
```

### Get My News (Authenticated)
```http
GET /news-articles/my-news
Authorization: Bearer <token>

Response: Array of news created by current user
```

### Get News Detail (Public)
```http
GET /news-articles/{id}
```

### Create News
```http
POST /news-articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "newsTitle": "Breaking News",
  "headline": "Short description",
  "newsContent": "Full article content...",
  "newsSource": "Reuters",
  "categoryId": 1,
  "newsStatus": 1,
  "tagIds": [1, 2, 3]
}
```

### Update News
```http
PUT /news-articles/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "newsTitle": "Updated Title",
  "headline": "Updated headline",
  "newsContent": "Updated content...",
  "newsSource": "Reuters",
  "categoryId": 1,
  "newsStatus": 1,
  "tagIds": [1, 2]
}
```

### Delete News
```http
DELETE /news-articles/{id}
Authorization: Bearer <token>
```

### Get Statistics (Admin Only)
```http
POST /news-articles/statistics
Authorization: Bearer <token>
Content-Type: application/json

{
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}

Response:
{
  "data": {
    "totalNews": 50,
    "totalPublished": 40,
    "totalDraft": 10,
    "totalAuthors": 5,
    "topCategory": {
      "categoryId": 1,
      "categoryName": "Technology",
      "count": 20
    },
    "dailyBreakdown": [...]
  }
}
```

### Get Statistics Summary (Admin Only)
```http
POST /news-articles/statistics/summary
Authorization: Bearer <token>
```

### Get Daily Breakdown (Admin Only)
```http
POST /news-articles/statistics/daily-breakdown
Authorization: Bearer <token>
```

## Tags

### Get All Tags (Public)
```http
GET /tags

Response: Array of active tags
```

### Get All Tags for Management (Admin Only)
```http
GET /tags/management
Authorization: Bearer <token>

Response: Array of all tags including inactive
```

### Get Tag by ID (Admin Only)
```http
GET /tags/{id}
Authorization: Bearer <token>
```

### Create Tag (Admin Only)
```http
POST /tags
Authorization: Bearer <token>
Content-Type: application/json

{
  "tagName": "AI",
  "note": "Artificial Intelligence related"
}
```

### Update Tag (Admin Only)
```http
PUT /tags/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "tagName": "Machine Learning",
  "note": "Updated note"
}
```

## Response Format

All API responses follow this format:

```json
{
  "data": {},          // Response data (object or array)
  "message": "string", // Success or error message
  "statusCode": "200"  // HTTP status code as string
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized / Invalid Token
- `403` - Forbidden / Insufficient Permissions
- `404` - Not Found
- `500` - Internal Server Error

## Role Values

- `0` - Admin
- `1` - Staff
- `2` - Lecturer

## News Status Values

- `0` - Draft
- `1` - Active (Published)
- `2` - Inactive

## Common Error Responses

### 401 Unauthorized
```json
{
  "data": null,
  "message": "Email or password is incorrect",
  "statusCode": "401"
}
```

### 400 Bad Request
```json
{
  "data": null,
  "message": "Category is being used by news articles",
  "statusCode": "400"
}
```

### 404 Not Found
```json
{
  "data": null,
  "message": "Account not found",
  "statusCode": "404"
}
```

## Frontend Service Usage Examples

### AuthService
```javascript
import { authService } from './services/authService';

// Login
const response = await authService.login('admin@fpt.edu.vn', 'admin123');

// Get current user
const user = authService.getCurrentUser();

// Logout
authService.logout();
```

### NewsService
```javascript
import { newsService } from './services/newsService';

// Get all news
const news = await newsService.getAllNews();

// Search news
const results = await newsService.searchNews('technology');

// Create news
const newArticle = await newsService.createNews({
  newsTitle: 'Title',
  newsContent: 'Content',
  categoryId: 1,
  newsStatus: 1,
  tagIds: [1, 2]
});
```

### AccountService
```javascript
import { accountService } from './services/accountService';

// Get all accounts
const accounts = await accountService.getAllAccounts();

// Create account
const newAccount = await accountService.createAccount({
  accountName: 'New User',
  accountEmail: 'user@fpt.edu.vn',
  accountPassword: 'password123',
  accountRole: 1
});
```

## Notes

1. All date fields are in ISO 8601 format: `2024-01-01T00:00:00`
2. JWT tokens expire after a configured time (check backend settings)
3. File uploads are not supported in current version
4. All text fields support Unicode characters
5. Password minimum length: 6 characters
