
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn, Heart } from 'lucide-react';
import Header from '@/components/Header';
import AdminSecretButton from '@/components/AdminSecretButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToView, setImageToView] = useState('');

  useEffect(() => {
  setProjects([
    {
      id: 1,
      title: 'Golden Bean Latte Afişi',
      category: 'Afiş tasarımı',
      description: 'Yeni çıkan latte ürününü tanıtan sade ve şık bir kahve afişi tasarımıdır.',
      image: '/projects/img1.jpg',
      imageUrl: '/projects/img1.jpg',
      alt: 'Üstten çekilmiş latte fincanı, koyu yeşil arka plan ve bilgilendirici etiketlerle afiş tasarımı.',
      createdAt: new Date().toISOString(),
      likes: 0
    }
  ]);
}, []);

  const categories = ['Tümü', 'Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya', 'Broşür', 'Kartvizit', '3D Modelleme'];
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredProjects = selectedCategory === 'Tümü' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleLike = (projectId) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(p => 
        p.id === projectId ? { ...p, likes: (p.likes || 0) + 1 } : p
      );
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      toast({ title: "Beğenildi!", description: "Projeyi beğendiniz." });
      return updatedProjects;
    });
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const openImageZoom = (imageUrl) => {
    setImageToView(imageUrl);
    setShowImageModal(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AdminSecretButton />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Projelerim
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Yaratıcılık ve profesyonelliğin buluştuğu tasarım portföyüm. 
              Her proje, benzersiz bir hikaye anlatıyor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "gradient-bg text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="glass-effect border-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img  
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                        alt={project.image || project.title}
                        src={project.imageUrl || project.image || "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <Button size="sm" variant="secondary" className="flex-1" onClick={() => openProjectDetails(project)}>
                            <Eye className="h-4 w-4 mr-2" />
                            İncele
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => openImageZoom(project.imageUrl || project.image)}>
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-primary font-medium">
                          {project.category}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleLike(project.id)} className="flex items-center">
                          <Heart className={`h-4 w-4 mr-1 ${ (project.likes || 0) > 0 ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} /> 
                          <span className="text-xs text-muted-foreground">({project.likes || 0})</span>
                        </Button>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground text-sm truncate">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-xl text-muted-foreground">
                  Bu kategoride henüz proje bulunmuyor.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      
      <Dialog open={selectedProject !== null} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-gradient">{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.category}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img 
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg mb-4" 
                  alt={selectedProject.image || selectedProject.title} 
                  src={selectedProject.imageUrl || selectedProject.image}
                />
                <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-none">
          <img src={imageToView} alt="Proje Görseli Büyütülmüş" className="w-full h-auto max-h-[90vh] object-contain" />
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ProjectsPage;
