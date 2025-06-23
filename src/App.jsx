
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ContactPage from '@/pages/ContactPage';
import AdminDashboard from '@/pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pattern-bg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hakkimda" element={<AboutPage />} />
          <Route path="/projeler" element={<ProjectsPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/admin-dashboard-secret" element={<AdminDashboard />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
