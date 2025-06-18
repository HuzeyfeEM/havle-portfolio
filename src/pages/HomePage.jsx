
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import AdminSecretButton from '@/components/AdminSecretButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {
  const specialties = [
    { icon: Palette, title: 'Logo & Kurumsal Kimlik', desc: 'Markanızın kimliğini yaratıyorum' },
    { icon: Zap, title: 'Afiş Tasarımı', desc: 'Etkileyici görsel iletişim' },
    { icon: Star, title: 'Sosyal Medya', desc: 'Dijital dünyada fark yaratın' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <AdminSecretButton />
      
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Havle El Muhammed
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Grafik tasarımda yaratıcılık ve profesyonelliği bir araya getiren, 
              markanızın hikayesini görsel dille anlatan tasarımcı
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg text-white hover:opacity-90">
                <Link to="/projeler">
                  Projelerimi İncele <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/iletisim">İletişime Geç</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <img   
              className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl animate-float" 
              alt="Minimalist bir masa üzerinde çalışan genç bir kadın grafik tasarımcı"
             src="https://images.unsplash.com/photo-1645743943096-fd41e391543c" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Uzmanlık Alanlarım
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Her projede yaratıcılık ve profesyonelliği harmanlayarak, 
              markanızın görsel kimliğini güçlendiriyorum
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass-effect border-0 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                      <specialty.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{specialty.title}</h3>
                    <p className="text-muted-foreground">{specialty.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="gradient-bg rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Projenizi Hayata Geçirelim!
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Markanızın hikayesini görsel dille anlatmaya hazırım. 
              Birlikte yaratıcı çözümler üretelim.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/iletisim">
                Hemen İletişime Geç <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
