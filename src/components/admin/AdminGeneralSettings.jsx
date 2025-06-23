import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const AdminGeneralSettings = ({ settings, onUpdateSettings }) => {
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  const handleChange = (e) => {
    setCurrentSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onUpdateSettings(currentSettings);
    toast({ title: "Ayarlar Kaydedildi!" });
  };

  return (
    <Card className="glass-effect border-0">
      <CardHeader>
        <CardTitle>Genel Ayarlar</CardTitle>
        <CardDescription>Site ile ilgili genel ayarları buradan yönetebilirsiniz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-muted-foreground mb-1">
            Yıl Deneyimi
          </label>
          <Input 
            type="number"
            id="yearsExperience"
            name="yearsExperience"
            value={currentSettings.yearsExperience}
            onChange={handleChange}
            className="w-full"
            min="0"
          />
        </div>
        <Button onClick={handleSave} className="w-full gradient-bg text-white">
          <Save className="h-4 w-4 mr-2" /> Ayarları Kaydet
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminGeneralSettings;