import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './ProtectedRoute.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import CreatorDashboard from '../pages/creator/CreatorDashboard.jsx';
import CreatorProfilePage from '../pages/creator/CreatorProfilePage.jsx';
import CreatorPostsPage from '../pages/creator/CreatorPostsPage.jsx';
import CreatorGoalsPage from '../pages/creator/CreatorGoalsPage.jsx';
import CreatorReportsPage from '../pages/creator/CreatorReportsPage.jsx';
import FollowerDashboard from '../pages/follower/FollowerDashboard.jsx';
import CreatorsPage from '../pages/follower/CreatorsPage.jsx';
import CreatorPublicPage from '../pages/follower/CreatorPublicPage.jsx';
import FavoritesPage from '../pages/follower/FavoritesPage.jsx';
import DonationHistoryPage from '../pages/follower/DonationHistoryPage.jsx';
import RoleRedirect from './RoleRedirect.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      <Route element={<ProtectedRoute role="creator" />}>
        <Route path="/creador" element={<CreatorDashboard />} />
        <Route path="/creador/perfil" element={<CreatorProfilePage />} />
        <Route path="/creador/posts" element={<CreatorPostsPage />} />
        <Route path="/creador/metas" element={<CreatorGoalsPage />} />
        <Route path="/creador/reportes" element={<CreatorReportsPage />} />
      </Route>

      <Route element={<ProtectedRoute role="follower" />}>
        <Route path="/seguidor" element={<FollowerDashboard />} />
        <Route path="/seguidor/creadores" element={<CreatorsPage />} />
        <Route path="/seguidor/creadores/:id" element={<CreatorPublicPage />} />
        <Route path="/seguidor/favoritos" element={<FavoritesPage />} />
        <Route path="/seguidor/historial" element={<DonationHistoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
