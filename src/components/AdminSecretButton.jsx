
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AdminSecretButton = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    const password = prompt('Admin şifresi:');
    if (password === 'havle2024') {
      navigate('/admin-dashboard-secret');
      toast({
        title: "Hoş geldiniz!",
        description: "Admin paneline başarıyla giriş yaptınız.",
      });
    } else if (password !== null) {
      toast({
        title: "Hata!",
        description: "Yanlış şifre. Erişim reddedildi.",
        variant: "destructive"
      });
    }
  };

  return (
    <button
      onClick={handleAdminAccess}
      className="admin-secret-btn"
      title="Admin Paneli"
    />
  );
};

export default AdminSecretButton;
