import React, { useState } from 'react';
import { Trash2, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';

const AdminCvManagement = ({ cvFile, onUpdateCv, onDeleteCv }) => {
  const [showCvDeleteDialog, setShowCvDeleteDialog] = useState(false);

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const dummyFileUrl = URL.createObjectURL(file); 
      const cvData = {
        name: file.name,
        size: file.size,
        uploadDate: new Date().toISOString(),
        fileUrl: dummyFileUrl 
      };
      onUpdateCv(cvData);
      toast({ title: "CV Yüklendi!", description: "CV dosyası başarıyla yüklendi." });
    }
  };

  const confirmCvDelete = () => {
    onDeleteCv();
    setShowCvDeleteDialog(false);
  };

  return (
    <Card className="glass-effect border-0">
      <CardHeader>
        <CardTitle>CV Yönetimi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvFile && cvFile.name ? (
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold truncate w-4/5" title={cvFile.name}>{cvFile.name}</h3>
              <AlertDialog open={showCvDeleteDialog} onOpenChange={setShowCvDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>CV Dosyasını Sil</AlertDialogTitle>
                    <AlertDialogDescription>
                      CV dosyasını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmCvDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="text-sm text-muted-foreground">
              Yüklenme: {new Date(cvFile.uploadDate).toLocaleDateString('tr-TR')}
            </p>
            {cvFile.fileUrl && (
                <a href={cvFile.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center mt-1">
                    <LinkIcon className="h-3 w-3 mr-1" /> Görüntüle/İndir
                </a>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">CV dosyası yüklenmemiş</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-2">
            {cvFile && cvFile.name ? 'CV Güncelle' : 'CV Yükle'}
          </label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCvUpload}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCvManagement;