import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import Login from './pages/Login';

// Common authenticated pages
import Profile from './pages/Profile';

// Admin pages
import AccountManagement from './pages/admin/AccountManagement';
import Statistics from './pages/admin/Statistics';

// Staff pages
import CategoryManagement from './pages/staff/CategoryManagement';
import NewsManagement from './pages/staff/NewsManagement';
import NewsHistory from './pages/staff/NewsHistory';
import TagManagement from './pages/staff/TagManagement';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Common authenticated routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin routes - Role 0 */}
            <Route
              path="/admin/accounts"
              element={
                <ProtectedRoute allowedRoles={[0]}>
                  <AccountManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <ProtectedRoute allowedRoles={[0]}>
                  <Statistics />
                </ProtectedRoute>
              }
            />

            {/* Staff routes - Role 1 */}
            <Route
              path="/staff/categories"
              element={
                <ProtectedRoute allowedRoles={[1]}>
                  <CategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/news"
              element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                  <NewsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/news-history"
              element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                  <NewsHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/tags"
              element={
                <ProtectedRoute allowedRoles={[1]}>
                  <TagManagement />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
