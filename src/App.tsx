import React from 'react';
import NeuralBackground from './components/NeuralNetwork';
import { motion, useScroll } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();

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

  return (
    <div className="app-container">
      <NeuralBackground scrollProgress={scrollYProgress} />

      {/* Header */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '25px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(5, 5, 5, 0.3)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.accentBlue}`
      }}>
        <div style={{ color: colors.electricBlue, fontSize: '1.2rem', fontWeight: 600, letterSpacing: '2px', fontFamily: "'Playfair Display', serif" }}>
          DAVID FELIPE AITE TREJO
        </div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '35px', margin: 0 }}>
            {['Inicio', 'Sobre Mí', 'Habilidades', 'Educación', 'Contacto'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(' ', '-')}`} style={{ 
                  color: colors.textSec, 
                  textDecoration: 'none', 
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSec}
                >{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 100px' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '800px' }}
        >
          <span style={{ color: colors.electricBlue, letterSpacing: '6px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '20px' }}>
            Sistemas & Desarrollo Full-Stack
          </span>
          <h1 style={{ 
            fontSize: '6.5rem', 
            margin: '0 0 30px', 
            color: 'white', 
            fontFamily: "'Playfair Display', serif",
            lineHeight: 1.1,
            textShadow: `0 0 40px ${colors.accentBlue}`
          }}>
            David Felipe<br/>Aite Trejo
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: colors.textSec, 
            fontWeight: 300,
            letterSpacing: '1px',
            lineHeight: 1.8,
            marginBottom: '40px'
          }}>
            Transformando visión en realidad técnica con diseño de alto impacto y arquitectura de software de elite.
          </p>
          <a href="#contacto" style={{
            display: 'inline-block',
            padding: '18px 45px',
            border: `1px solid ${colors.electricBlue}`,
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            background: 'rgba(0, 198, 255, 0.05)',
            transition: 'all 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.electricBlue;
            e.currentTarget.style.color = 'black';
            e.currentTarget.style.boxShadow = `0 0 30px ${colors.electricBlue}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 198, 255, 0.05)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            Contactar Ahora
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre-mí" style={{ padding: '150px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative' }}
        >
          <div style={{ 
            width: '100%', 
            aspectRatio: '1', 
            background: `linear-gradient(135deg, ${colors.bg}, ${colors.deepBlue})`,
            borderRadius: '50%',
            padding: '10px',
            border: `1px solid ${colors.accentBlue}`
          }}>
            <img src="/portada.jpeg" alt="David Felipe Aite Trejo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(30%) brightness(0.9)' }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            right: '20px', 
            background: colors.bg, 
            padding: '30px', 
            border: `1px solid ${colors.accentBlue}`,
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: colors.electricBlue, fontSize: '2.5rem', margin: 0 }}>5+</h3>
            <p style={{ color: colors.textSec, fontSize: '0.8rem', margin: 0, textTransform: 'uppercase' }}>Años de Pasión</p>
          </div>
        </motion.div>

        <div>
          <span style={{ color: colors.electricBlue, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>Perfil Profesional</span>
          <h2 style={{ color: 'white', fontSize: '4rem', margin: '20px 0 40px', fontFamily: "'Playfair Display', serif" }}>¿Quién soy?</h2>
          <p style={{ color: colors.textSec, fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '25px' }}>
            Soy un profesional altamente motivado y con una sólida formación técnica, comprometido con la excelencia en el diseño, desarrollo y gestión de soluciones tecnológicas.
          </p>
          <p style={{ color: colors.textSec, fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '40px' }}>
            Poseo habilidades en comunicación, adaptabilidad y responsabilidad. Actualmente enfocado en tecnologías de vanguardia relacionadas con Inteligencia Artificial y Big Data.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {softSkills.map(skill => (
              <span key={skill} style={{ 
                padding: '10px 22px', 
                background: colors.accentBlue, 
                color: colors.electricBlue, 
                borderRadius: '30px', 
                fontSize: '0.85rem',
                border: `1px solid ${colors.electricBlue}44`
              }}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" style={{ padding: '150px 100px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Especialidades</span>
          <h2 style={{ color: 'white', fontSize: '3.5rem', marginTop: '15px', fontFamily: "'Playfair Display', serif" }}>Competencias Técnicas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '60px', maxWidth: '1000px', margin: '0 auto' }}>
          {skills.map(skill => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: 'white', fontWeight: 500 }}>{skill.name}</span>
                <span style={{ color: colors.electricBlue }}>{skill.level}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${colors.deepBlue}, ${colors.electricBlue})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="educación" style={{ padding: '150px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '100px' }}>
          <div>
            <span style={{ color: colors.electricBlue, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Trayectoria</span>
            <h2 style={{ color: 'white', fontSize: '3.5rem', marginTop: '15px', fontFamily: "'Playfair Display', serif" }}>Formación Académica</h2>
            <p style={{ color: colors.textSec, fontSize: '1.1rem', marginTop: '30px', lineHeight: 1.8 }}>
              Mi camino académico ha sido una búsqueda constante de conocimiento técnico y estratégico para resolver problemas complejos.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                style={{ 
                  padding: '40px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderLeft: `3px solid ${colors.electricBlue}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h4 style={{ color: 'white', fontSize: '1.4rem', margin: '0 0 10px' }}>{edu.title}</h4>
                <p style={{ color: colors.electricBlue, fontSize: '0.9rem', margin: '0 0 20px', letterSpacing: '1px' }}>{edu.period}</p>
                <p style={{ color: colors.textSec, margin: 0, lineHeight: 1.7 }}>{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{ padding: '150px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ maxWidth: '700px', margin: '0 auto', padding: '80px', background: 'rgba(255,255,255,0.01)', border: `1px solid ${colors.accentBlue}`, borderRadius: '20px' }}
        >
          <h2 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '20px', fontFamily: "'Playfair Display', serif" }}>¿Hablamos?</h2>
          <p style={{ color: colors.textSec, fontSize: '1.2rem', marginBottom: '50px' }}>
            Estoy abierto a nuevas oportunidades y colaboraciones en proyectos innovadores.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <a href="mailto:david@example.com" style={{ color: colors.electricBlue, textDecoration: 'none', fontWeight: 600, letterSpacing: '2px' }}>EMAIL</a>
            <a href="#" style={{ color: colors.electricBlue, textDecoration: 'none', fontWeight: 600, letterSpacing: '2px' }}>LINKEDIN</a>
            <a href="#" style={{ color: colors.electricBlue, textDecoration: 'none', fontWeight: 600, letterSpacing: '2px' }}>GITHUB</a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '60px 0', 
        textAlign: 'center', 
        borderTop: `1px solid ${colors.accentBlue}`, 
        background: 'rgba(0,0,0,0.5)' 
      }}>
        <p style={{ color: colors.textSec, fontSize: '0.8rem', letterSpacing: '3px' }}>
          © 2026 DAVID FELIPE AITE TREJO | NEURAL DESIGN SYSTEM
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background: #050505;
          color: white;
          overflow-x: hidden;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #00C6FF; }
      `}</style>
    </div>
  );
};

export default App;
