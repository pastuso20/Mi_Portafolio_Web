import React, { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralNetwork';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

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
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.55), transparent 28%, transparent 72%, rgba(5,5,5,0.6))',
        pointerEvents: 'none'
      }} />

      {/* Responsive Header */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: 'clamp(14px, 2.4vw, 28px) clamp(18px, 6vw, 100px)',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + clamp(12px, 2vw, 20px))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(5, 5, 5, 0.5)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <a href="#inicio" onClick={() => setMenuOpen(false)} style={{ 
          color: colors.electricBlue, 
          fontSize: 'clamp(0.72rem, 1.6vw, 1rem)', 
          fontWeight: 700, 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          textShadow: `0 0 15px ${colors.accentBlue}`,
          maxWidth: '70vw',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textDecoration: 'none',
          cursor: 'pointer'
        }}>
          DAVID FELIPE AITE TREJO
        </a>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: `1px solid ${colors.accentBlue}`, 
            color: 'white', 
            cursor: 'pointer',
            padding: 'clamp(8px, 1.2vw, 10px)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(14px)'
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
              background: 'rgba(0,0,0,0.55)',
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
                width: 'min(460px, 100vw)',
                background: 'radial-gradient(circle at 30% 20%, rgba(0, 198, 255, 0.10), rgba(5, 5, 5, 0.98) 55%)',
                borderLeft: `1px solid ${colors.accentBlue}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                padding: 'calc(env(safe-area-inset-top, 0px) + 20px) 22px calc(env(safe-area-inset-bottom, 0px) + 30px)',
                gap: '12px',
                overflowY: 'auto'
              }}
              className="fullVh"
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
      <section
        id="inicio"
        className="fullVh"
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          padding: `calc(env(safe-area-inset-top, 0px) + clamp(100px, 14vh, 170px)) clamp(18px, 6vw, 100px) calc(env(safe-area-inset-bottom, 0px) + 36px)`,
          boxSizing: 'border-box'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ width: '100%', maxWidth: '860px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: 'clamp(14px, 2.2vw, 22px)',
              padding: 'clamp(8px, 1.6vw, 10px) clamp(12px, 2.2vw, 16px)',
              border: `1px solid ${colors.accentBlue}`,
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              maxWidth: '100%',
              flexWrap: 'wrap'
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
              fontSize: 'clamp(0.66rem, 1.4vw, 0.74rem)', 
              letterSpacing: 'clamp(2px, 0.3vw, 2.5px)', 
              textTransform: 'uppercase',
              opacity: 0.9,
              lineHeight: 1.2
            }}>
              <span style={{ whiteSpace: 'nowrap' }}>Ingeniero</span>
              <span style={{ opacity: 0.65, padding: '0 10px' }}>•</span>
              <span style={{ whiteSpace: 'nowrap' }}>Full‑Stack</span>
              <span style={{ opacity: 0.65, padding: '0 10px' }}>•</span>
              <span style={{ whiteSpace: 'nowrap' }}>IA</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
            style={{
              height: '2px',
              width: 'clamp(140px, 18vw, 200px)',
              transformOrigin: 'left',
              background: `linear-gradient(90deg, ${colors.electricBlue}, transparent)`,
              boxShadow: `0 0 22px ${colors.electricBlue}`,
              opacity: 0.85,
              marginBottom: 'clamp(18px, 2.8vw, 26px)'
            }}
          />

          <h1 style={{ 
            fontSize: 'clamp(2.35rem, 8.8vw, 6.2rem)', 
            margin: '0 0 14px', 
            color: 'white', 
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1.06,
            fontWeight: 700,
            letterSpacing: 'clamp(-2px, -0.18vw, -1px)'
          }}>
            David Felipe<br/>Aite Trejo
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(0.92rem, 2.4vw, 1.4rem)', 
            color: colors.textMain, 
            fontWeight: 300,
            letterSpacing: '0.5px',
            lineHeight: 1.55,
            marginBottom: 'clamp(22px, 3vw, 28px)',
            maxWidth: '650px',
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
              gap: 'clamp(10px, 1.8vw, 12px)',
              maxWidth: '720px',
              marginBottom: 'clamp(26px, 4vw, 44px)'
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
                  padding: 'clamp(10px, 1.6vw, 12px) clamp(12px, 2vw, 14px)',
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
                  fontSize: 'clamp(0.95rem, 2vw, 1.02rem)',
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
              padding: 'clamp(14px, 2vw, 20px) clamp(30px, 6vw, 50px)',
              border: `1px solid white`,
              color: 'white',
              textDecoration: 'none',
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
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
        padding: 'clamp(56px, 10vw, 150px) clamp(20px, 6vw, 100px)', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', 
        gap: 'clamp(24px, 6vw, 120px)', 
        alignItems: 'center' 
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', maxWidth: 'min(260px, 70vw)', margin: '0 auto' }}
        >
          <div style={{ 
            width: '100%', 
            aspectRatio: '1', 
            background: `linear-gradient(135deg, ${colors.bg}, ${colors.deepBlue})`,
            borderRadius: '50%',
            padding: 'clamp(6px, 1.2vw, 12px)',
            border: `1px solid ${colors.accentBlue}`,
            overflow: 'hidden',
            boxShadow: `0 0 30px ${colors.accentBlue}`
          }}>
            <img src="/portada.jpeg" alt="David Felipe Aite Trejo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(20%) brightness(0.9)' }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: 'clamp(-6px, -0.6vw, 30px)', 
            right: 'clamp(-6px, -0.6vw, 30px)', 
            background: 'rgba(5, 5, 5, 0.9)', 
            padding: 'clamp(12px, 2.4vw, 35px)', 
            border: `1px solid ${colors.accentBlue}`,
            borderRadius: 'clamp(15px, 2vw, 20px)',
            backdropFilter: 'blur(15px)',
            zIndex: 2
          }}>
            <h3 style={{ color: colors.electricBlue, fontSize: 'clamp(1.2rem, 3.2vw, 3rem)', margin: 0, fontWeight: 700 }}>5+</h3>
            <p style={{ color: colors.textSec, fontSize: 'clamp(0.5rem, 1vw, 0.7rem)', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Años de Pasión</p>
          </div>
        </motion.div>

        <div>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Perfil Profesional</span>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 6vw, 4.5rem)', margin: '0 0 15px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Quién soy?</h2>
          <p style={{ color: colors.textSec, fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)', lineHeight: 1.6, marginBottom: '20px', fontWeight: 300 }}>
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
      <section id="habilidades" style={{ padding: 'clamp(56px, 10vw, 150px) clamp(20px, 6vw, 100px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 7vw, 100px)' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)', fontWeight: 600 }}>Especialidades</span>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 6vw, 4rem)', marginTop: '10px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Competencias Técnicas</h2>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(520px, 100%), 1fr))', 
          gap: 'clamp(24px, 6vw, 80px)', 
          maxWidth: '1100px', 
          margin: '0 auto' 
        }}>
          {skills.map(skill => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'white', fontWeight: 500, letterSpacing: '1px', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>{skill.name}</span>
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
      <section id="experiencia" style={{ padding: 'clamp(56px, 10vw, 150px) clamp(20px, 6vw, 100px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 7vw, 100px)' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)', fontWeight: 600 }}>Trayectoria Profesional</span>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 6vw, 4rem)', marginTop: '10px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Experiencia Laboral</h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          padding: 'clamp(20px, 6vw, 100px) 0'
        }}>
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ y: idx * 20, rotate: idx % 2 === 0 ? 1 : -1 }}
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
                padding: 'clamp(18px, 3vw, 40px)',
                backdropFilter: 'blur(20px)',
                cursor: 'pointer',
                marginTop: idx === 0 ? 0 : 'calc(-1 * min(90px, 9vh))',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                position: 'relative',
                zIndex: idx
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: 'clamp(1.05rem, 2.6vw, 1.6rem)', margin: 0, fontFamily: "'Playfair Display', serif" }}>{exp.role}</h3>
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
              <p style={{ color: colors.textSec, fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="educación" style={{ padding: 'clamp(56px, 10vw, 150px) clamp(20px, 6vw, 100px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(460px, 100%), 1fr))', gap: 'clamp(24px, 6vw, 120px)' }}>
          <div>
            <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)', fontWeight: 600 }}>Trayectoria</span>
            <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 6vw, 4rem)', marginTop: '10px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Formación Académica</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                style={{ 
                  padding: 'clamp(20px, 4vw, 50px)', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderLeft: `2px solid ${colors.electricBlue}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 style={{ color: 'white', fontSize: 'clamp(1rem, 2.6vw, 1.6rem)', margin: '0 0 8px', fontWeight: 600 }}>{edu.title}</h4>
                <p style={{ color: colors.electricBlue, fontSize: '0.7rem', margin: '0 0 12px', letterSpacing: '2px', fontWeight: 500 }}>{edu.period}</p>
                <p style={{ color: colors.textSec, margin: 0, lineHeight: 1.6, fontSize: 'clamp(0.85rem, 2.2vw, 1.1rem)', fontWeight: 300 }}>{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{ padding: 'clamp(60px, 12vw, 200px) clamp(20px, 6vw, 100px)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: 'clamp(40px, 8vw, 100px) clamp(20px, 4vw, 50px)', 
            background: 'rgba(255,255,255,0.01)', 
            border: `1px solid ${colors.accentBlue}`, 
            borderRadius: 'clamp(20px, 3vw, 30px)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 6vw, 4.5rem)', marginBottom: '15px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Hablamos?</h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 'clamp(15px, 4vw, 60px)',
            marginTop: '30px'
          }}>
            {['EMAIL', 'LINKEDIN', 'GITHUB'].map(link => (
              <a key={link} href="#" style={{ 
                color: colors.electricBlue, 
                textDecoration: 'none', 
                fontWeight: 600, 
                letterSpacing: '4px',
                fontSize: 'clamp(0.8rem, 1.6vw, 0.9rem)'
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
        html, body, #root { height: 100%; }
        .fullVh { height: 100vh; }
        @supports (height: 100svh) { .fullVh { height: 100svh; } }
        @supports (height: 100dvh) { .fullVh { height: 100dvh; } }
        section { scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 110px); }
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
