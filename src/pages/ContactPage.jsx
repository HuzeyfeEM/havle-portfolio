
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, Send } from 'lucide-react';
import Header from '@/components/Header';
import AdminSecretButton from '@/components/AdminSecretButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [adminSettings, setAdminSettings] = useState({});
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const loadAdminSettings = () => {
      const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
      setAdminSettings(settings);
      const loadedCvFile = JSON.parse(localStorage.getItem('portfolioCv') || '{}');
      setCvFile(loadedCvFile);
    };
    loadAdminSettings();
    window.addEventListener('storage', loadAdminSettings);
    return () => window.removeEventListener('storage', loadAdminSettings);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    console.log("Form Verileri:", formData);
    
    localStorage.setItem('contactFormSubmission', JSON.stringify(formData));

    toast({
      title: "Mesaj Gönderildi!",
      description: "En kısa sürede size dönüş yapacağım. Teşekkürler!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCvDownload = () => {
    if (cvFile && cvFile.fileUrl) {
      window.open(cvFile.fileUrl, '_blank');
      
      const currentCvViews = adminSettings.cvViews || 0;
      const updatedAdminSettings = { ...adminSettings, cvViews: currentCvViews + 1 };
      localStorage.setItem('adminSettings', JSON.stringify(updatedAdminSettings));
      setAdminSettings(updatedAdminSettings); 
      
      toast({
        title: "CV İndiriliyor!",
        description: "CV başarıyla indiriliyor.",
      });
    } else {
      toast({
        title: "CV Bulunamadı!",
        description: "Henüz bir CV yüklenmemiş.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      value: 'havleelmuhammed@gmail.com',
      link: 'mailto:havleelmuhammed@gmail.com'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@rose.graphicer',
      link: 'https://instagram.com/rose.graphicer'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Havle El Muhammed',
      link: 'https://www.linkedin.com/in/'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <AdminSecretButton />

      <section className="pt-28 pb-12 px-2 xs:px-3 sm:px-6">
        <div className="w-full max-w-5xl mx-auto px-2 xs:px-3 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl xs:text-4xl md:text-6xl font-bold text-gradient mb-4">
              İletişim
            </h1>
            <p className="text-base xs:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Projeniz için benimle iletişime geçin. Birlikte harika işler çıkaralım!
            </p>
          </motion.div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-10 min-w-0">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-md mx-auto"
            >
              <Card className="glass-effect border-0 w-full rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">
                    Mesaj Gönder
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Adınız
                        </label>
                        <Input
                          className="rounded-lg"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Adınızı girin"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          E-posta
                        </label>
                        <Input
                          className="rounded-lg"
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="E-posta adresinizi girin"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Konu
                      </label>
                      <Input
                        className="rounded-lg"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Mesaj konusu"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Mesajınız
                      </label>
                      <Textarea
                        className="rounded-lg"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mesajınızı buraya yazın..."
                        rows={6}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-bg text-white rounded-lg">
                      <Send className="h-4 w-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sağ Kartlar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col w-full max-w-md mx-auto space-y-8"
            >
              <Card className="glass-effect border-0 w-full rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">
                    İletişim Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-0">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        <p className="text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 w-full rounded-2xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">CV İndir</h3>
                  <p className="text-muted-foreground mb-6">
                    Detaylı özgeçmişimi indirmek için aşağıdaki butona tıklayın.
                  </p>
                  <Button
                    className="gradient-bg text-white rounded-lg"
                    onClick={handleCvDownload}
                  >
                    CV İndir
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );


};

export default ContactPage;
