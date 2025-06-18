
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import AdminProjectManagement from '@/components/admin/AdminProjectManagement';
import AdminCvManagement from '@/components/admin/AdminCvManagement';
import AdminGeneralSettings from '@/components/admin/AdminGeneralSettings';
import AdminStatsCards from '@/components/admin/AdminStatsCards';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [cvFile, setCvFile] = useState(null);
  const [adminSettings, setAdminSettings] = useState({
    yearsExperience: '1',
    cvViews: 0,
    siteVisitors: 0,
  });

  const loadData = useCallback(() => {
    const savedProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const savedCv = JSON.parse(localStorage.getItem('portfolioCv') || '{}');
    const savedAdminSettings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    const siteVisitors = parseInt(localStorage.getItem('siteVisitors') || '0', 10);

    setProjects(savedProjects.map(p => ({ ...p, likes: p.likes || 0 })));
    setCvFile(savedCv.name ? savedCv : null); // Ensure cvFile is null if no name
    setAdminSettings({
      yearsExperience: savedAdminSettings.yearsExperience || '1',
      cvViews: savedAdminSettings.cvViews || 0,
      siteVisitors: siteVisitors,
    });
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      const currentVisitors = parseInt(localStorage.getItem('siteVisitors') || '0', 10);
      const newVisitors = currentVisitors + Math.floor(Math.random() * 3) + 1; 
      localStorage.setItem('siteVisitors', newVisitors.toString());
      setAdminSettings(prev => ({ ...prev, siteVisitors: newVisitors }));
    }, 60000);
    
    window.addEventListener('storage', loadData); 

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadData);
    };
  }, [loadData]);

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
    loadData(); 
  };

  const handleProjectUpdate = (updatedProjects) => {
    setProjects(updatedProjects);
    saveData('portfolioProjects', updatedProjects);
  };

  const handleCvUpdate = (updatedCv) => {
    setCvFile(updatedCv);
    saveData('portfolioCv', updatedCv);
  };
  
  const handleCvDelete = () => {
    setCvFile(null);
    localStorage.removeItem('portfolioCv');
    window.dispatchEvent(new Event('storage'));
    toast({
      title: "CV Silindi!",
      description: "CV dosyası başarıyla silindi.",
    });
    loadData();
  };

  const handleSettingsUpdate = (updatedSettings) => {
    setAdminSettings(updatedSettings);
    saveData('adminSettings', updatedSettings);
  };
  
  const statsData = [
    { icon: FolderOpen, title: 'Toplam Proje', value: projects.length, color: 'bg-blue-500' },
    { icon: FileText, title: 'CV Görüntüleme', value: adminSettings.cvViews, color: 'bg-green-500' },
    { icon: Users, title: 'Site Ziyaretçi', value: adminSettings.siteVisitors, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pattern-bg">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground">Portfolyo yönetim paneli</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
        </motion.div>

        <AdminStatsCards stats={statsData} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AdminProjectManagement 
              projects={projects} 
              onUpdateProjects={handleProjectUpdate} 
            />
          </div>
          <div className="space-y-8">
            <AdminCvManagement 
              cvFile={cvFile} 
              onUpdateCv={handleCvUpdate}
              onDeleteCv={handleCvDelete}
            />
            <AdminGeneralSettings 
              settings={adminSettings} 
              onUpdateSettings={handleSettingsUpdate} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
