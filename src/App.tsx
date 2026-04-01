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

      {/* Header following the image layout */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '30px 100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
      }}>
        <div style={{ 
          color: colors.electricBlue, 
          fontSize: '1rem', 
          fontWeight: 600, 
          letterSpacing: '3px', 
          textTransform: 'uppercase',
          textShadow: `0 0 15px ${colors.accentBlue}`
        }}>
          DAVID FELIPE AITE TREJO
        </div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '40px', margin: 0, padding: 0 }}>
            {['Inicio', 'Sobre Mí', 'Habilidades', 'Educación', 'Contacto'].map((item) => (
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
      </header>

      {/* Hero Section matching reference image */}
      <section id="inicio" style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxWidth: '900px' }}
        >
          <h1 style={{ 
            fontSize: '8rem', 
            margin: '0 0 40px', 
            color: 'white', 
            fontFamily: "'Playfair Display', serif",
            lineHeight: 0.9,
            fontWeight: 700,
            letterSpacing: '-2px'
          }}>
            David Felipe<br/>Aite Trejo
            <motion.span 
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ 
                display: 'inline-block', 
                width: '14px', 
                height: '14px', 
                backgroundColor: colors.electricBlue, 
                borderRadius: '50%', 
                marginLeft: '15px',
                boxShadow: `0 0 20px ${colors.electricBlue}`,
                verticalAlign: 'baseline',
                position: 'relative',
                bottom: '15px'
              }} 
            />
          </h1>
          
          <p style={{ 
            fontSize: '1.4rem', 
            color: colors.textMain, 
            fontWeight: 300,
            letterSpacing: '0.5px',
            lineHeight: 1.6,
            marginBottom: '60px',
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
              padding: '20px 50px',
              border: `1.5px solid white`,
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'transparent',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.electricBlue;
              e.currentTarget.style.backgroundColor = 'rgba(0, 198, 255, 0.05)';
              e.currentTarget.style.color = colors.electricBlue;
              e.currentTarget.style.boxShadow = `0 0 40px ${colors.accentBlue}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'white';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Contactar Ahora
          </motion.a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre-mí" style={{ padding: '150px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '120px', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative' }}
        >
          <div style={{ 
            width: '100%', 
            aspectRatio: '1', 
            background: `linear-gradient(135deg, ${colors.bg}, ${colors.deepBlue})`,
            borderRadius: '50%',
            padding: '12px',
            border: `1px solid ${colors.accentBlue}`,
            overflow: 'hidden'
          }}>
            <img src="/portada.jpeg" alt="David Felipe Aite Trejo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(20%) brightness(0.9)' }} />
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '30px', 
            right: '30px', 
            background: 'rgba(5, 5, 5, 0.8)', 
            padding: '35px', 
            border: `1px solid ${colors.accentBlue}`,
            borderRadius: '20px',
            backdropFilter: 'blur(15px)'
          }}>
            <h3 style={{ color: colors.electricBlue, fontSize: '3rem', margin: 0, fontWeight: 700 }}>5+</h3>
            <p style={{ color: colors.textSec, fontSize: '0.8rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Años de Pasión</p>
          </div>
        </motion.div>

        <div>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '20px' }}>Perfil Profesional</span>
          <h2 style={{ color: 'white', fontSize: '4.5rem', margin: '0 0 40px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Quién soy?</h2>
          <p style={{ color: colors.textSec, fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '30px', fontWeight: 300 }}>
            Soy un profesional altamente motivado y con una sólida formación técnica, comprometido con la excelencia en el diseño, desarrollo y gestión de soluciones tecnológicas.
          </p>
          <p style={{ color: colors.textSec, fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '50px', fontWeight: 300 }}>
            Poseo habilidades en comunicación, adaptabilidad y responsabilidad. Actualmente enfocado en tecnologías de vanguardia relacionadas con Inteligencia Artificial y Big Data.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {softSkills.map(skill => (
              <span key={skill} style={{ 
                padding: '12px 28px', 
                background: 'rgba(0, 198, 255, 0.08)', 
                color: colors.electricBlue, 
                borderRadius: '40px', 
                fontSize: '0.85rem',
                border: `1px solid ${colors.electricBlue}33`,
                letterSpacing: '1px'
              }}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" style={{ padding: '150px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>Especialidades</span>
          <h2 style={{ color: 'white', fontSize: '4rem', marginTop: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Competencias Técnicas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>
          {skills.map(skill => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: 'white', fontWeight: 500, letterSpacing: '1px' }}>{skill.name}</span>
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
      <section id="educación" style={{ padding: '150px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '120px' }}>
          <div>
            <span style={{ color: colors.electricBlue, letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>Trayectoria</span>
            <h2 style={{ color: 'white', fontSize: '4rem', marginTop: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Formación Académica</h2>
            <p style={{ color: colors.textSec, fontSize: '1.2rem', marginTop: '40px', lineHeight: 1.8, fontWeight: 300 }}>
              Mi camino académico ha sido una búsqueda constante de conocimiento técnico y estratégico para resolver problemas complejos.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                style={{ 
                  padding: '50px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderLeft: `2px solid ${colors.electricBlue}`,
                  backdropFilter: 'blur(10px)',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              >
                <h4 style={{ color: 'white', fontSize: '1.6rem', margin: '0 0 15px', fontWeight: 600 }}>{edu.title}</h4>
                <p style={{ color: colors.electricBlue, fontSize: '0.9rem', margin: '0 0 25px', letterSpacing: '2px', fontWeight: 500 }}>{edu.period}</p>
                <p style={{ color: colors.textSec, margin: 0, lineHeight: 1.8, fontSize: '1.1rem', fontWeight: 300 }}>{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{ padding: '200px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '100px 50px', 
            background: 'rgba(255,255,255,0.01)', 
            border: `1px solid ${colors.accentBlue}`, 
            borderRadius: '30px',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h2 style={{ color: 'white', fontSize: '4.5rem', marginBottom: '30px', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>¿Hablamos?</h2>
          <p style={{ color: colors.textSec, fontSize: '1.4rem', marginBottom: '60px', fontWeight: 300, maxWidth: '600px', margin: '0 auto 60px' }}>
            Estoy abierto a nuevas oportunidades y colaboraciones en proyectos innovadores.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px' }}>
            {['EMAIL', 'LINKEDIN', 'GITHUB'].map(link => (
              <a key={link} href="#" style={{ 
                color: colors.electricBlue, 
                textDecoration: 'none', 
                fontWeight: 600, 
                letterSpacing: '4px',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = `0 0 20px ${colors.electricBlue}`}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = 'none'}
              >{link}</a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '80px 0', 
        textAlign: 'center', 
        borderTop: `1px solid rgba(255,255,255,0.05)`, 
        background: 'rgba(0,0,0,0.8)' 
      }}>
        <p style={{ color: colors.textSec, fontSize: '0.75rem', letterSpacing: '5px', fontWeight: 300 }}>
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
