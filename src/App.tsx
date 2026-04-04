import React, { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralNetwork';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    { name: 'Desarrollo Full-Stack', level: 95 },
    { name: 'Arquitectura de IA', level: 90 },
    { name: 'Inteligencia de Negocios', level: 85 },
    { name: 'React / Next.js', level: 92 },
    { name: 'Node.js / Python', level: 88 },
    { name: 'Diseño de Sistemas', level: 90 }
  ];

  const softSkills = [
    'Comunicación', 'Adaptabilidad', 'Responsabilidad', 
    'Liderazgo', 'Resolución de Problemas', 'Trabajo en Equipo'
  ];

  const education = [
    {
      title: 'Ingeniero en Sistemas',
      period: 'Corporación Universitaria Rafael Núñez | 2023 - 2025',
      desc: 'Formación avanzada en arquitectura de software y gestión de proyectos.'
    },
    {
      title: 'Diplomado de Inteligencia de Negocios',
      period: 'Corporación Universitaria Rafael Núñez | 2025',
      desc: 'Especialización en análisis de datos y toma de decisiones estratégica.'
    },
    {
      title: 'Tecnólogo en Desarrollo de Software',
      period: 'Corporación Universitaria Rafael Núñez | 2021 - 2023',
      desc: 'Proyecto final: Sistema de gestión escolar integral.'
    }
  ];

  const colors = {
    electricBlue: '#00C6FF',
    deepBlue: '#0072FF',
    accentBlue: 'rgba(0, 198, 255, 0.2)',
    textMain: '#F5F5F5',
    textSec: '#94A3B8',
    bg: '#050505'
  };

  const navItems = ['Inicio', 'Sobre Mí', 'Habilidades', 'Educación', 'Contacto'];

  return (
    <div className="app-container">
      <NeuralBackground scrollProgress={scrollYProgress} />

      {/* Responsive Header */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: isMobile ? '20px 25px' : '30px 100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(5, 5, 5, 0.3)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ 
          color: colors.electricBlue, 
          fontSize: isMobile ? '0.8rem' : '1rem', 
          fontWeight: 600, 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          textShadow: `0 0 15px ${colors.accentBlue}`
        }}>
          DAVID FELIPE AITE TREJO
        </div>

        {isMobile ? (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '40px', margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 400,
                    opacity: 0.6,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              height: '100vh',
              background: '#050505',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px'
            }}
          >
            {navItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontSize: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '4px'
                }}
              >{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: isMobile ? '0 25px' : '0 100px' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '900px' }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '3.5rem' : '8rem', 
            margin: '0 0 20px', 
            color: 'white', 
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: isMobile ? '0' : '-2px'
          }}>
            David Felipe<br/>Aite Trejo
            <motion.span 
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ 
                display: 'inline-block', 
                width: isMobile ? '8px' : '14px', 
                height: isMobile ? '8px' : '14px', 
                backgroundColor: colors.electricBlue, 
                borderRadius: '50%', 
                marginLeft: isMobile ? '8px' : '15px',
                boxShadow: `0 0 20px ${colors.electricBlue}`,
                verticalAlign: 'baseline',
                position: 'relative',
                bottom: isMobile ? '5px' : '15px'
              }} 
            />
          </h1>
          
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.4rem', 
            color: colors.textMain, 
            fontWeight: 300,
            letterSpacing: '0.5px',
            lineHeight: 1.6,
            marginBottom: isMobile ? '40px' : '60px',
            maxWidth: '650px',
            opacity: 0.8
          }}>
            Transformando visión en realidad técnica con diseño de alto impacto y arquitectura de software de elite.
          </p>

          <motion.a 
            href="#contacto" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-block',
              padding: isMobile ? '15px 35px' : '20px 50px',
              border: `1.5px solid white`,
              color: 'white',
              textDecoration: 'none',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'transparent',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              fontWeight: 600
            }}
          >
            Contactar Ahora
          </motion.a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre-mí" style={{ 
        padding: isMobile ? '60px 25px' : '150px 100px', 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: isMobile ? '40px' : '120px', 
        alignItems: 'center' 
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', maxWidth: isMobile ? '260px' : 'none', margin: '0 auto' }}
        >
          <div style={{ 
            width: '100%', 
            aspectRatio: '1', 
            background: `linear-gradient(135deg, ${colors.bg}, ${colors.deepBlue})`,
            borderRadius: '50%',
            padding: isMobile ? '8px' : '12px',
            border: `1px solid ${colors.accentBlue}`,
            overflow: 'hidden'
          }}>
            <img src="/portada.jpeg" alt="David Felipe Aite Trejo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(20%) brightness(0.9)' }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: isMobile ? '-10px' : '30px', 
            right: isMobile ? '-10px' : '30px', 
            background: 'rgba(5, 5, 5, 0.8)', 
            padding: isMobile ? '15px' : '35px', 
            border: `1px solid ${colors.accentBlue}`,
            borderRadius: '20px',
            backdropFilter: 'blur(15px)'
          }}>
            <h3 style={{ color: colors.electricBlue, fontSize: isMobile ? '1.5rem' : '3rem', margin: 0, fontWeight: 700 }}>5+</h3>
            <p style={{ color: colors.textSec, fontSize: isMobile ? '0.6rem' : '0.7rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Años de Pasión</p>
          </div>
        </motion.div>

        <div>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '15px' }}>Perfil Profesional</span>
          <h2 style={{ color: 'white', fontSize: isMobile ? '2.2rem' : '4.5rem', margin: '0 0 20px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Quién soy?</h2>
          <p style={{ color: colors.textSec, fontSize: isMobile ? '0.95rem' : '1.2rem', lineHeight: 1.6, marginBottom: '20px', fontWeight: 300 }}>
            Soy un profesional altamente motivado y con una sólida formación técnica, comprometido con la excelencia en el diseño, desarrollo y gestión de soluciones tecnológicas.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
            {softSkills.map(skill => (
              <span key={skill} style={{ 
                padding: '6px 16px', 
                background: 'rgba(0, 198, 255, 0.08)', 
                color: colors.electricBlue, 
                borderRadius: '40px', 
                fontSize: '0.7rem',
                border: `1px solid ${colors.electricBlue}33`
              }}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" style={{ padding: isMobile ? '60px 25px' : '150px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '100px' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>Especialidades</span>
          <h2 style={{ color: 'white', fontSize: isMobile ? '2.2rem' : '4rem', marginTop: '15px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Competencias Técnicas</h2>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: isMobile ? '30px' : '80px', 
          maxWidth: '1100px', 
          margin: '0 auto' 
        }}>
          {skills.map(skill => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'white', fontWeight: 500, letterSpacing: '1px', fontSize: isMobile ? '0.85rem' : '1rem' }}>{skill.name}</span>
                <span style={{ color: colors.electricBlue, fontWeight: 600 }}>{skill.level}%</span>
              </div>
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: colors.electricBlue, boxShadow: `0 0 15px ${colors.electricBlue}` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="educación" style={{ padding: isMobile ? '60px 25px' : '150px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? '40px' : '120px' }}>
          <div>
            <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>Trayectoria</span>
            <h2 style={{ color: 'white', fontSize: isMobile ? '2.2rem' : '4rem', marginTop: '15px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Formación Académica</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                style={{ 
                  padding: isMobile ? '25px' : '50px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderLeft: `2px solid ${colors.electricBlue}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 style={{ color: 'white', fontSize: isMobile ? '1.1rem' : '1.6rem', margin: '0 0 10px', fontWeight: 600 }}>{edu.title}</h4>
                <p style={{ color: colors.electricBlue, fontSize: '0.8rem', margin: '0 0 15px', letterSpacing: '2px', fontWeight: 500 }}>{edu.period}</p>
                <p style={{ color: colors.textSec, margin: 0, lineHeight: 1.6, fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 300 }}>{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{ padding: isMobile ? '80px 25px' : '200px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: isMobile ? '50px 25px' : '100px 50px', 
            background: 'rgba(255,255,255,0.01)', 
            border: `1px solid ${colors.accentBlue}`, 
            borderRadius: '30px',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 style={{ color: 'white', fontSize: isMobile ? '2.2rem' : '4.5rem', marginBottom: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Hablamos?</h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'center', 
            gap: isMobile ? '20px' : '60px',
            marginTop: '40px'
          }}>
            {['EMAIL', 'LINKEDIN', 'GITHUB'].map(link => (
              <a key={link} href="#" style={{ 
                color: colors.electricBlue, 
                textDecoration: 'none', 
                fontWeight: 600, 
                letterSpacing: '4px',
                fontSize: '0.9rem'
              }}>{link}</a>
            ))}
          </div>
        </motion.div>
      </section>

      <footer style={{ 
        padding: '60px 0', 
        textAlign: 'center', 
        borderTop: `1px solid rgba(255,255,255,0.05)`, 
        background: 'rgba(0,0,0,0.8)' 
      }}>
        <p style={{ color: colors.textSec, fontSize: '0.7rem', letterSpacing: '3px', padding: '0 20px' }}>
          © 2026 DAVID FELIPE AITE TREJO | NEURAL DESIGN SYSTEM
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background: #050505;
          color: white;
          overflow-x: hidden;
        }
        ::selection { background: ${colors.electricBlue}; color: black; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: ${colors.electricBlue}; }
      `}</style>
    </div>
  );
};

export default App;
