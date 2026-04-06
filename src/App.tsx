import React, { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralNetwork';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--app-vh', `${vh}px`);
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      updateVh();
      checkMobile();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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

  const experience = [
    {
      company: 'Independiente',
      role: 'Landing Page - Invitación de Matrimonio',
      period: 'Febrero 2026',
      desc: 'Diseño y desarrollo de una landing page interactiva personalizada para invitación de bodas, optimizada para dispositivos móviles.'
    },
    {
      company: 'Grupo BSA',
      role: 'Asistente de sistemas',
      period: '2022 - 2023',
      desc: 'Encargado del soporte técnico, mantenimiento de equipos, gestión de redes y atención a necesidades tecnológicas de la empresa.'
    },
    {
      company: 'Refrigeración H y T',
      role: 'Desarrollador web',
      period: '2023',
      desc: 'Desarrollo y despliegue de un catálogo de productos web con tecnologías HTML, CSS y JavaScript.'
    },
    {
      company: 'Chevrolet',
      role: 'Publicidad y ventas',
      period: '2020 - 2021',
      desc: 'Estrategias de marketing, promoción de vehículos y atención al cliente en área comercial.'
    },
    {
      company: 'MCA',
      role: 'Publicidad y ventas',
      period: '2019 - 2020',
      desc: 'Creación de contenido publicitario y trabajo en ventas directas al consumidor.'
    }
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

  const navItems = ['Inicio', 'Sobre Mí', 'Habilidades', 'Experiencia', 'Educación', 'Contacto'];

  return (
    <div className="app-container">
      <NeuralBackground scrollProgress={scrollYProgress} />
      
      {/* Background Overlay for Mobile Readability */}
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        background: isMobile ? 'linear-gradient(to bottom, rgba(5,5,5,0.7), transparent 30%, transparent 70%, rgba(5,5,5,0.7))' : 'none',
        pointerEvents: 'none'
      }} />

      {/* Responsive Header */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: isMobile ? '15px 20px' : '30px 100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(5, 5, 5, 0.5)',
        backdropFilter: 'blur(15px)',
        borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}>
        <div style={{ 
          color: colors.electricBlue, 
          fontSize: isMobile ? '0.7rem' : '1rem', 
          fontWeight: 700, 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          textShadow: `0 0 15px ${colors.accentBlue}`,
          maxWidth: isMobile ? '180px' : 'none',
          lineHeight: 1.2
        }}>
          {isMobile ? 'DAVID AITE' : 'DAVID FELIPE AITE TREJO'}
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: `1px solid ${colors.accentBlue}`, 
            color: 'white', 
            cursor: 'pointer',
            padding: isMobile ? '8px' : '10px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(14px)'
          }}
        >
          {menuOpen ? <X size={isMobile ? 20 : 22} /> : <Menu size={isMobile ? 20 : 22} />}
        </button>
      </header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: isMobile ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: isMobile ? '100%' : 'min(460px, 92vw)',
                height: 'calc(var(--app-vh, 1vh) * 100)',
                background: 'radial-gradient(circle at 30% 20%, rgba(0, 198, 255, 0.10), rgba(5, 5, 5, 0.98) 55%)',
                borderLeft: isMobile ? 'none' : `1px solid ${colors.accentBlue}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                padding: '20px 22px 30px',
                gap: '12px',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 2px 14px' }}>
                <div style={{ 
                  color: colors.electricBlue, 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  letterSpacing: '3px', 
                  textTransform: 'uppercase',
                  textShadow: `0 0 15px ${colors.accentBlue}`,
                  lineHeight: 1.2
                }}>
                  Menú
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${colors.accentBlue}`,
                    color: 'white',
                    cursor: 'pointer',
                    padding: '10px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(14px)'
                  }}
                >
                  <X size={22} />
                </button>
              </div>
              {navItems.map((item, idx) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileTap={{ scale: 0.98 }}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontSize: '1.05rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    fontWeight: 500,
                    opacity: 0.95,
                    border: `1px solid ${colors.accentBlue}`,
                    borderRadius: '16px',
                    padding: '16px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(14px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ color: colors.electricBlue, fontSize: '0.75rem', letterSpacing: '2px', opacity: 0.9 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </span>
                  <span style={{ color: colors.electricBlue, opacity: 0.85, fontSize: '0.9rem' }}>↗</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" style={{ 
        height: 'calc(var(--app-vh, 1vh) * 100)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: isMobile ? '0 25px' : '0 100px' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: isMobile ? '560px' : '860px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: isMobile ? '16px' : '22px',
              padding: isMobile ? '8px 12px' : '10px 16px',
              border: `1px solid ${colors.accentBlue}`,
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '999px', 
              background: colors.electricBlue, 
              boxShadow: `0 0 18px ${colors.electricBlue}` 
            }} />
            <span style={{ 
              color: colors.textMain, 
              fontSize: isMobile ? '0.68rem' : '0.74rem', 
              letterSpacing: '2.5px', 
              textTransform: 'uppercase',
              opacity: 0.9
            }}>
              Ingeniero • Full-Stack • IA
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
            style={{
              height: '2px',
              width: isMobile ? '140px' : '200px',
              transformOrigin: 'left',
              background: `linear-gradient(90deg, ${colors.electricBlue}, transparent)`,
              boxShadow: `0 0 22px ${colors.electricBlue}`,
              opacity: 0.85,
              marginBottom: isMobile ? '18px' : '26px'
            }}
          />

          <h1 style={{ 
            fontSize: isMobile ? 'clamp(2.6rem, 10.5vw, 3.2rem)' : 'clamp(3.8rem, 5.8vw, 6.2rem)', 
            margin: '0 0 14px', 
            color: 'white', 
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1.06,
            fontWeight: 700,
            letterSpacing: isMobile ? '-1px' : '-2px'
          }}>
            David Felipe<br/>Aite Trejo
          </h1>
          
          <p style={{ 
            fontSize: isMobile ? '1rem' : '1.4rem', 
            color: colors.textMain, 
            fontWeight: 300,
            letterSpacing: '0.5px',
            lineHeight: 1.5,
            marginBottom: isMobile ? '22px' : '28px',
            maxWidth: isMobile ? '100%' : '650px',
            opacity: 0.8
          }}>
            Transformando visión en realidad técnica con diseño de alto impacto y arquitectura de software de elite.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '10px' : '12px',
              maxWidth: isMobile ? '100%' : '720px',
              marginBottom: isMobile ? '26px' : '44px'
            }}
          >
            {[
              { label: 'Enfoque', value: 'Sistemas & Producto' },
              { label: 'Especialidad', value: 'IA + Full-Stack' },
              { label: 'Entrega', value: 'Web responsive' }
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: isMobile ? '10px 12px' : '12px 14px',
                  borderRadius: '999px',
                  border: `1px solid ${colors.accentBlue}`,
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ 
                  color: colors.electricBlue, 
                  fontSize: '0.65rem', 
                  letterSpacing: '3.5px', 
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '4px'
                }}>
                  {item.label}
                </div>
                <div style={{ 
                  color: 'white', 
                  fontSize: isMobile ? '0.95rem' : '1.02rem',
                  fontWeight: 500,
                  letterSpacing: '0.3px'
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.a 
            href="#contacto" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-block',
              padding: isMobile ? '14px 30px' : '20px 50px',
              border: `1px solid white`,
              color: 'white',
              textDecoration: 'none',
              fontSize: isMobile ? '0.75rem' : '0.9rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(5px)',
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
        padding: isMobile ? '40px 25px' : '150px 100px', 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: isMobile ? '30px' : '120px', 
        alignItems: 'center' 
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', maxWidth: isMobile ? '220px' : 'none', margin: isMobile ? '0 auto 20px' : '0 auto' }}
        >
          <div style={{ 
            width: '100%', 
            aspectRatio: '1', 
            background: `linear-gradient(135deg, ${colors.bg}, ${colors.deepBlue})`,
            borderRadius: '50%',
            padding: isMobile ? '6px' : '12px',
            border: `1px solid ${colors.accentBlue}`,
            overflow: 'hidden',
            boxShadow: isMobile ? `0 0 30px ${colors.accentBlue}` : 'none'
          }}>
            <img src="/portada.jpeg" alt="David Felipe Aite Trejo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(20%) brightness(0.9)' }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: isMobile ? '-5px' : '30px', 
            right: isMobile ? '-5px' : '30px', 
            background: 'rgba(5, 5, 5, 0.9)', 
            padding: isMobile ? '12px 20px' : '35px', 
            border: `1px solid ${colors.accentBlue}`,
            borderRadius: isMobile ? '15px' : '20px',
            backdropFilter: 'blur(15px)',
            zIndex: 2
          }}>
            <h3 style={{ color: colors.electricBlue, fontSize: isMobile ? '1.2rem' : '3rem', margin: 0, fontWeight: 700 }}>5+</h3>
            <p style={{ color: colors.textSec, fontSize: isMobile ? '0.5rem' : '0.7rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Años de Pasión</p>
          </div>
        </motion.div>

        <div>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Perfil Profesional</span>
          <h2 style={{ color: 'white', fontSize: isMobile ? '2rem' : '4.5rem', margin: '0 0 15px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Quién soy?</h2>
          <p style={{ color: colors.textSec, fontSize: isMobile ? '0.9rem' : '1.2rem', lineHeight: 1.6, marginBottom: '20px', fontWeight: 300 }}>
            Soy un profesional altamente motivado y con una sólida formación técnica, comprometido con la excelencia en el diseño, desarrollo y gestión de soluciones tecnológicas.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
            {softSkills.map(skill => (
              <span key={skill} style={{ 
                padding: '5px 14px', 
                background: 'rgba(0, 198, 255, 0.08)', 
                color: colors.electricBlue, 
                borderRadius: '40px', 
                fontSize: '0.65rem',
                border: `1px solid ${colors.electricBlue}33`
              }}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" style={{ padding: isMobile ? '40px 25px' : '150px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '100px' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: 600 }}>Especialidades</span>
          <h2 style={{ color: 'white', fontSize: isMobile ? '2rem' : '4rem', marginTop: '10px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Competencias Técnicas</h2>
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

      {/* Experience Section - Card Deck Accordion */}
      <section id="experiencia" style={{ padding: isMobile ? '40px 25px' : '150px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '100px' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: 600 }}>Trayectoria Profesional</span>
          <h2 style={{ color: 'white', fontSize: isMobile ? '2rem' : '4rem', marginTop: '10px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Experiencia Laboral</h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          padding: isMobile ? '20px 0' : '100px 0'
        }}>
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={isMobile ? { y: 0, rotate: 0 } : { y: idx * 20, rotate: idx % 2 === 0 ? 1 : -1 }}
              whileHover={{ 
                y: -50,
                rotate: 0,
                scale: 1.05,
                zIndex: 50,
                transition: { type: 'spring', stiffness: 300 }
              }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${colors.accentBlue}`,
                borderRadius: '16px',
                padding: isMobile ? '20px' : '40px',
                backdropFilter: 'blur(20px)',
                cursor: 'pointer',
                marginTop: isMobile ? '16px' : (idx === 0 ? 0 : '-100px'),
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                position: 'relative',
                zIndex: isMobile ? 1 : idx
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: isMobile ? '1.1rem' : '1.6rem', margin: 0, fontFamily: "'Playfair Display', serif" }}>{exp.role}</h3>
                  <p style={{ color: colors.electricBlue, fontSize: '0.85rem', fontWeight: 600, marginTop: '8px', letterSpacing: '1px' }}>{exp.company}</p>
                </div>
                <span style={{ 
                  color: colors.electricBlue, 
                  fontSize: '0.7rem', 
                  padding: '4px 12px', 
                  border: `1px solid ${colors.accentBlue}`,
                  borderRadius: '20px',
                  background: 'rgba(0, 198, 255, 0.05)'
                }}>{exp.period}</span>
              </div>
              <p style={{ color: colors.textSec, fontSize: isMobile ? '0.9rem' : '1.1rem', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="educación" style={{ padding: isMobile ? '40px 25px' : '150px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: isMobile ? '30px' : '120px' }}>
          <div>
            <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: 600 }}>Trayectoria</span>
            <h2 style={{ color: 'white', fontSize: isMobile ? '2rem' : '4rem', marginTop: '10px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Formación Académica</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                style={{ 
                  padding: isMobile ? '20px' : '50px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderLeft: `2px solid ${colors.electricBlue}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 style={{ color: 'white', fontSize: isMobile ? '1rem' : '1.6rem', margin: '0 0 8px', fontWeight: 600 }}>{edu.title}</h4>
                <p style={{ color: colors.electricBlue, fontSize: '0.7rem', margin: '0 0 12px', letterSpacing: '2px', fontWeight: 500 }}>{edu.period}</p>
                <p style={{ color: colors.textSec, margin: 0, lineHeight: 1.6, fontSize: isMobile ? '0.85rem' : '1.1rem', fontWeight: 300 }}>{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{ padding: isMobile ? '60px 25px' : '200px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: isMobile ? '40px 20px' : '100px 50px', 
            background: 'rgba(255,255,255,0.01)', 
            border: `1px solid ${colors.accentBlue}`, 
            borderRadius: isMobile ? '20px' : '30px',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 style={{ color: 'white', fontSize: isMobile ? '2rem' : '4.5rem', marginBottom: '15px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Hablamos?</h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'center', 
            gap: isMobile ? '15px' : '60px',
            marginTop: '30px'
          }}>
            {['EMAIL', 'LINKEDIN', 'GITHUB'].map(link => (
              <a key={link} href="#" style={{ 
                color: colors.electricBlue, 
                textDecoration: 'none', 
                fontWeight: 600, 
                letterSpacing: '4px',
                fontSize: isMobile ? '0.8rem' : '0.9rem'
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
        :root { --app-vh: 1vh; }
        html, body, #root { height: 100%; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background: #050505;
          color: white;
          overflow-x: hidden;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
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
