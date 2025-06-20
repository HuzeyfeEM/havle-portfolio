
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Heart } from 'lucide-react';
import Header from '@/components/Header';
import AdminSecretButton from '@/components/AdminSecretButton';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  const skills = [
    'Logo ve Kurumsal Kimlik Tasarımı',
    'Afiş Tasarımı',
    'Sosyal Medya Postları',
    'Broşür ve Dergi Tasarımı',
    'Kartvizit / Davetiye',
    '3D Modelleme'
  ];

  const [stats, setStats] = useState([
    { icon: Award, number: '0', label: 'Tamamlanan Proje' },
    { icon: Users, number: '0', label: 'Mutlu Müşteri' },
    { icon: Clock, number: '0+', label: 'Yıl Deneyim' },
    { icon: Heart, number: '0%', label: 'Müşteri Memnuniyeti' }
  ]);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const adminSettings = JSON.parse(localStorage.getItem('adminSettings') || '{}');

    const totalProjects = savedProjects.length;
    const happyClients = Math.floor(totalProjects * 0.8 + Math.random() * 5);
    const yearsExperience = adminSettings.yearsExperience || '1'; 
    
    let totalLikes = 0;
    let projectsWithLikes = 0;
    savedProjects.forEach(p => {
      if (p.likes && p.likes > 0) {
        totalLikes += p.likes;
        projectsWithLikes++;
      }
    });
    const averageLikesPerProject = projectsWithLikes > 0 ? totalLikes / projectsWithLikes : 0;
    const customerSatisfaction = Math.min(100, Math.floor( (averageLikesPerProject / 5) * 100)); 


    setStats([
      { icon: Award, number: `${totalProjects}`, label: 'Tamamlanan Proje' },
      { icon: Users, number: `${happyClients}`, label: 'Mutlu Müşteri' },
      { icon: Clock, number: `${yearsExperience}+`, label: 'Yıl Deneyim' },
      { icon: Heart, number: `${customerSatisfaction}%`, label: 'Müşteri Memnuniyeti' }
    ]);
  }, []);


  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <AdminSecretButton />

      {/* Hakkımda Bölümü */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20">
        <div className="w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-6xl font-bold text-gradient mb-3 sm:mb-6">
              Hakkımda
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-xs xs:max-w-md sm:max-w-3xl mx-auto">
              Yaratıcılık ve profesyonelliği harmanlayan bir grafik tasarımcı olarak, markaların görsel kimliklerini güçlendiriyorum
            </p>
          </motion.div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 lg:mb-0"
            >
              <img
                className="w-full max-w-full h-60 xs:h-72 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                alt="Havle El Muhammed portre fotoğrafı, doğal ışıkta, minimalist bir arka plan"
                src="https://images.unsplash.com/photo-1688428017697-30426b7a4c0f"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
                Merhaba, Ben Havle!
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Grafik tasarım dünyasında yaratıcılığımı ve teknik becerilerimi
                birleştirerek, markaların hikayelerini görsel dille anlatıyorum.
                Her proje benim için yeni bir macera ve yaratıcı bir meydan okuma.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Minimalist ve artistik yaklaşımımla, markanızın özünü yansıtan
                tasarımlar yaratıyor, dijital ve basılı medyada etkili çözümler sunuyorum.
              </p>
              <div className="pt-2 sm:pt-4">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Uzmanlık Alanlarım:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 gradient-bg rounded-full"></div>
                      <span className="text-muted-foreground text-sm sm:text-base">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Başarılar Bölümü */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-4 sm:mb-6">
              Rakamlarla Başarım
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Her proje, yeni bir başarı hikayesi ve müşteri memnuniyeti demek
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-effect border-0 text-center">
                  <CardContent className="p-4 sm:p-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 gradient-bg rounded-full flex items-center justify-center">
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="text-xl sm:text-3xl font-bold text-gradient mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-base">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tasarım Felsefem Bölümü */}
      <section className="py-14 sm:py-20">
        <div className="w-full max-w-5xl mx-auto px-3 xs:px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-6 sm:mb-8">
              Tasarım Felsefem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              <Card className="glass-effect border-0">
                <CardContent className="p-4 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Minimalizm</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Sadelik içinde güç. Her tasarımda gereksiz detayları ayıklayarak,
                    mesajın net bir şekilde iletilmesini sağlıyorum.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-0">
                <CardContent className="p-4 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Yaratıcılık</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Her proje benzersiz bir hikaye. Markanızın kimliğini yansıtan,
                    özgün ve etkileyici tasarımlar yaratıyorum.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-effect border-0">
                <CardContent className="p-4 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Kalite</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Detaylara verdiğim önem ve profesyonel yaklaşımımla,
                    her tasarımda mükemmelliği hedefliyorum.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
