
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
      id: 5,
      title: 'Vogue Kış Moda Sayısı Dergi Tasarımı',
      category: 'Broşür',
      description: 'Moda trendleri, makyaj önerileri ve parfüm tanıtımlarını içeren şık bir Vogue dergi düzeni.',
      image: '/projects/img5.jpg',
      imageUrl: '/projects/img5.jpg',
      alt: 'Kapağında bir modelin yer aldığı ve içinde kış defilesi, makyaj ürünleri ve Chanel parfüm tanıtımı bulunan Vogue moda dergisi sayfaları.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 6,
      title: 'The Velvet Rose Çiçek Broşürü Tasarımı',
      category: 'Broşür',
      description: 'Çiçek koleksiyonu, fiyat listesi ve kişiye özel buket hizmeti tanıtımı için hazırlanmış zarif broşür.',
      image: '/projects/img6.jpg',
      imageUrl: '/projects/img6.jpg',
      alt: 'Farklı çiçek aranjmanları, fiyat bilgileri, çiçek türleri ve iletişim detaylarını içeren pastel tonlarda tasarlanmış bir çiçek broşürü.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 7,
      title: 'Modern Kozmetik Koleksiyonu',
      category: '3D Modelleme',
      description: 'Modern kozmetik ürünlerinin minimalist 3D tasarımı. Kozmetik markaları ve e-ticaret platformları için ürün tanıtım görseli.',
      image: '/projects/img7.jpg',
      imageUrl: '/projects/img7.jpg',
      alt: 'Yeşil-mavi zemin üzerinde geometrik platformlarda düzenlenmiş kozmetik ürünleri: parfüm, ruj, maskara, far paleti. Minimalist 3D render.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 8,
      title: 'Ortaçağ Savaş Silahları - 3D Modelleme',
      category: '3D Modelleme',
      description: 'Ortaçağ dönemine ait savaş baltası ve hançer silahlarının detaylı 3D modellenmesi. Oyun tasarımı, tarihi animasyonlar ve eğitim materyalleri için kullanılabilir.',
      image: '/projects/img8.jpg',
      imageUrl: '/projects/img8.jpg',
      alt: 'Gri zemin üzerinde ortaçağ savaş baltası ve bronz renkli hançer. Realistik 3D render, gölgeli kompozisyon, tarihi silah tasarımı.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 9,
      title: 'Şehir Sokağı -  3D Sahne',
      category: '3D Modelleme',
      description: 'Kentsel yaşam alanını temsil eden minimalist 3D sahne tasarımı. Oyun geliştirme, animasyon projeleri ve mimari görselleştirme için kullanılabilir.',
      image: '/projects/img9.jpg',
      imageUrl: '/projects/img9.jpg',
      alt: 'Gri tonlarda low poly stil şehir sahnesi: çok katlı binalar, sokak lambaları, şemsiyeli masa-sandalye setleri. Monokrom 3D render.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 10,
      title: 'Retro Mutfak Tasarımı',
      category: '3D Modelleme',
      description: '1950\'ler tarzı retro mutfak iç mekan tasarımının izometrik 3D görselleştirmesi. İç mimarlık portfolyoları ve oyun sahneleri için ideal.',
      image: '/projects/img10.jpg',
      imageUrl: '/projects/img10.jpg',
      alt: 'İzometrik açıdan retro mutfak: yeşil buzdolabı, mavi mutfak dolapları, beyaz tezgah, davlumbaz, bar tabureleri, kareli zemin. Vintage stil 3D render.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 11,
      title: 'Üniversite Bilgisayar Sınıfı - 3D  Modeli',
      category: '3D Modelleme',
      description: 'Öğrencilik döneminden üniversite bilgisayar sınıfının nostaljik 3D yeniden yaratımı.',
      image: '/projects/img11.jpg',
      imageUrl: '/projects/img11.jpg',
      alt: 'Low poly stil üniversite bilgisayar sınıfı: sıralı masalar, monitörler, sandalyeler, projeksiyon ekranı, gri duvarlar. İzometrik 3D görünüm.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 12,
      title: 'Klasik Satranç Takımı - 3D Modelleme',
      category: '3D Modelleme',
      description: 'Geleneksel satranç takımının detaylı 3D görselleştirmesi. Oyun tasarımı, eğitim materyalleri ve dijital sanat projeleri için kullanılabilir.',
      image: '/projects/img12.jpg',
      imageUrl: '/projects/img12.jpg',
      alt: 'Siyah-beyaz kareli satranç tahtası üzerinde klasik satranç taşları: siyah ve beyaz taşlar başlangıç pozisyonunda dizili. Realistik 3D render.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 13,
      title: 'Luna Jewellry -logo Tasarımı',
      category: 'Logo Tasarımı',
      description: 'Mücevher firması için minimalist kartvizit tasarımı. Elmas logosu ve temiz tipografi ile lüks marka kimliği yansıtılmış.',
      image: '/projects/img13.jpg',
      imageUrl: '/projects/img13.jpg',
      alt: 'Ahşap zemin üzerinde beyaz kartvizitler: Luna Jewellry logosu, elmas simgesi, iletişim bilgileri. Minimalist tasarım, ön-arka görünüm.',
      createdAt: new Date().toISOString(),
      likes: 0
    },
    {
      id: 14,
      title: "Berry's Bakery Tiramisu - Sosyal Medya Kampanyası",
      category: 'Sosyal Medya',
      description: 'Fırın işletmesi için tiramisu ürününe özel %50 indirim kampanyası sosyal medya postu. Instagram ve Facebook paylaşımları için tasarlanmış.',
      image: '/projects/img14.jpg',
      imageUrl: '/projects/img14.jpg',
      alt: "Kahverengi-bordo tonlarda sosyal medya postu: Berry's Bakery logosu, tiramisu fotoğrafı, %50 indirim etiketi, ORDER NOW çağrısı ve web sitesi bilgisi.",
      createdAt: new Date().toISOString(),
      likes: 0
    }
  ]);
}, []);

  const categories = ['Tümü', 'Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya', 'Broşür', 'Kartvizit', '3D Modelleme'];
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const handleLike = (projectId) => {
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    const alreadyLiked = likedProjects.includes(projectId);

    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(p =>
        p.id === projectId
          ? { ...p, likes: (p.likes || 0) + (alreadyLiked ? -1 : 1) }
          : p
      );
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      // Toggle işlemi
      if (alreadyLiked) {
        localStorage.setItem('likedProjects', JSON.stringify(likedProjects.filter(id => id !== projectId)));
        toast({ title: "Beğeni kaldırıldı", description: "Beğeniniz geri alındı." });
      } else {
        localStorage.setItem('likedProjects', JSON.stringify([...likedProjects, projectId]));
        toast({ title: "Beğenildi!", description: "Projeyi beğendiniz." });
      }
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

  const filteredProjects = selectedCategory === 'Tümü'
  ? projects
  : projects.filter(project => project.category === selectedCategory);

  return (
  <div className="min-h-screen">
    <Header />
    <AdminSecretButton />
    
    <section className="pt-24 pb-10 px-2 sm:pt-32 sm:pb-20 sm:px-6">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold text-gradient mb-4 sm:mb-6">
            Projelerim
          </h1>
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-xs xs:max-w-md sm:max-w-3xl mx-auto">
            Yaratıcılık ve profesyonelliğin buluştuğu tasarım portföyüm. 
            Her proje, benzersiz bir hikaye anlatıyor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                (selectedCategory === category ? "gradient-bg text-white " : "") +
                "sm:w-auto sm:px-8"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
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
                      className="w-full h-40 xs:h-52 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                      alt={project.alt || project.title}
                      src={project.imageUrl || project.image || "https://images.unsplash.com/photo-1595872018818-97555653a011"} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2 flex gap-1 sm:gap-2">
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
                  <CardContent className="p-3 xs:p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <div className="text-xs sm:text-sm text-primary font-medium">
                        {project.category}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleLike(project.id)} className="flex items-center">
                        <Heart className={`h-4 w-4 mr-1 ${ (project.likes || 0) > 0 ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} /> 
                        <span className="text-xs text-muted-foreground">({project.likes || 0})</span>
                      </Button>
                    </div>
                    <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-3">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
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
              className="col-span-full text-center py-10 sm:py-20"
            >
              <p className="text-base sm:text-xl text-muted-foreground">
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
