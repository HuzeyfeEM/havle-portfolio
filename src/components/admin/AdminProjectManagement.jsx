import React, { useState } from 'react';
import { Plus, Edit, Trash2, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

const AdminProjectManagement = ({ projects, onUpdateProjects }) => {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    description: '',
    image: '', 
    imageUrl: '',
    likes: 0
  });
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  const categories = ['Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya', 'Broşür', 'Kartvizit', '3D Modelleme'];

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...editingProject, ...projectForm }
          : p
      );
      toast({ title: "Proje Güncellendi!", description: "Proje başarıyla güncellendi." });
    } else {
      const newProject = {
        ...projectForm,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        likes: 0
      };
      updatedProjects = [...projects, newProject];
      toast({ title: "Proje Eklendi!", description: "Yeni proje başarıyla eklendi." });
    }
    onUpdateProjects(updatedProjects);
    setProjectForm({ title: '', category: '', description: '', image: '', imageUrl: '', likes: 0 });
    setEditingProject(null);
    setIsProjectDialogOpen(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      imageUrl: project.imageUrl,
      likes: project.likes || 0
    });
    setIsProjectDialogOpen(true);
  };

  const confirmDeleteProject = () => {
    const updatedProjects = projects.filter(p => p.id !== deleteProjectId);
    onUpdateProjects(updatedProjects);
    toast({ title: "Proje Silindi!", description: "Proje başarıyla silindi." });
    setDeleteProjectId(null);
  };

  return (
    <Card className="glass-effect border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Proje Yönetimi</CardTitle>
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg text-white">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Proje
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <Input
                placeholder="Proje Başlığı"
                value={projectForm.title}
                onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                required
              />
              <select
                className="w-full p-2 border rounded-md bg-background text-foreground"
                value={projectForm.category}
                onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                required
              >
                <option value="">Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Textarea
                placeholder="Proje Açıklaması"
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                required
              />
              <Input
                placeholder="Görsel URL Adresi"
                value={projectForm.imageUrl}
                onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                required
              />
              <Input
                placeholder="Görsel Açıklaması (Alt Text)"
                value={projectForm.image}
                onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                required
              />
              <Button type="submit" className="w-full gradient-bg text-white">
                {editingProject ? 'Güncelle' : 'Ekle'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.category}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <ThumbsUp className="h-4 w-4 mr-1 text-blue-500" />
                  {project.likes || 0} Beğeni
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setDeleteProjectId(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Projeyi Sil</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDeleteProject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Henüz proje eklenmemiş.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProjectManagement;