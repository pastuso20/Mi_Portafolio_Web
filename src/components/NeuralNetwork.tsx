import React, { useRef, useMemo } from 'react'; 
import { Canvas, useFrame } from '@react-three/fiber'; 
import * as THREE from 'three'; 
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'; 
import { BlendFunction } from 'postprocessing';

const MAX_PARTICLES = 600; 
const MAX_CONNECTIONS = 10; 
const MAX_LINES = MAX_PARTICLES * MAX_CONNECTIONS; 

// Electric Blue Palette
const ELECTRIC_BLUE = new THREE.Color('#00C6FF'); 
const DEEP_BLUE = new THREE.Color('#0072FF'); 
const BACKGROUND_COLOR = '#050505';

function Particles({ scrollProgress }: { scrollProgress: any }) { 
  const meshRef = useRef<THREE.InstancedMesh>(null); 
  const linesRef = useRef<THREE.LineSegments>(null); 
  
  const dummy = useMemo(() => new THREE.Object3D(), []); 
  
  const particles = useMemo(() => { 
    const pos = new Float32Array(MAX_PARTICLES * 3); 
    const vel = new Float32Array(MAX_PARTICLES * 3); 
    for (let i = 0; i < MAX_PARTICLES; i++) { 
      pos[i * 3] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; 
      
      vel[i * 3] = (Math.random() - 0.5) * 0.015; 
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015; 
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015; 
    } 
    return { pos, vel }; 
  }, []); 

  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []); 
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []); 

  useFrame((state) => { 
    if (!meshRef.current || !linesRef.current) return; 

    const progress = scrollProgress.get(); 
    
    state.camera.position.y = THREE.MathUtils.lerp(0, -8, progress); 
    state.camera.position.z = THREE.MathUtils.lerp(15, 8, progress); 
    state.camera.lookAt(0, state.camera.position.y * 0.5, 0); 

    const currentParticles = Math.floor(THREE.MathUtils.lerp(30, MAX_PARTICLES, progress)); 
    const currentMaxConnections = Math.floor(THREE.MathUtils.lerp(1, MAX_CONNECTIONS, progress)); 
    const connectionDistance = THREE.MathUtils.lerp(1.5, 4.0, progress); 
    const connectionDistanceSq = connectionDistance * connectionDistance; 
    
    const expansion = THREE.MathUtils.lerp(0.02, 1.0, progress); 

    meshRef.current.count = currentParticles; 

    const expandedPos = new Float32Array(currentParticles * 3); 

    for (let i = 0; i < currentParticles; i++) { 
      particles.pos[i * 3] += particles.vel[i * 3]; 
      particles.pos[i * 3 + 1] += particles.vel[i * 3 + 1]; 
      particles.pos[i * 3 + 2] += particles.vel[i * 3 + 2]; 

      if (Math.abs(particles.pos[i * 3]) > 10) particles.vel[i * 3] *= -1; 
      if (Math.abs(particles.pos[i * 3 + 1]) > 10) particles.vel[i * 3 + 1] *= -1; 
      if (Math.abs(particles.pos[i * 3 + 2]) > 10) particles.vel[i * 3 + 2] *= -1; 

      const ex = particles.pos[i * 3] * expansion; 
      const ey = particles.pos[i * 3 + 1] * expansion; 
      const ez = particles.pos[i * 3 + 2] * expansion; 

      expandedPos[i * 3] = ex; 
      expandedPos[i * 3 + 1] = ey; 
      expandedPos[i * 3 + 2] = ez; 

      dummy.position.set(ex, ey, ez); 
      
      const scale = THREE.MathUtils.lerp(2.5, 1.0, progress); 
      dummy.scale.set(scale, scale, scale); 
      
      dummy.updateMatrix(); 
      meshRef.current.setMatrixAt(i, dummy.matrix); 
    } 
    meshRef.current.instanceMatrix.needsUpdate = true; 

    let lineIndex = 0; 
    let colorIndex = 0; 

    for (let i = 0; i < currentParticles; i++) { 
      let connections = 0; 
      for (let j = i + 1; j < currentParticles; j++) { 
        const dx = expandedPos[i * 3] - expandedPos[j * 3]; 
        const dy = expandedPos[i * 3 + 1] - expandedPos[j * 3 + 1]; 
        const dz = expandedPos[i * 3 + 2] - expandedPos[j * 3 + 2]; 
        const distSq = dx * dx + dy * dy + dz * dz; 

        if (distSq < connectionDistanceSq && connections < currentMaxConnections) { 
          linePositions[lineIndex++] = expandedPos[i * 3]; 
          linePositions[lineIndex++] = expandedPos[i * 3 + 1]; 
          linePositions[lineIndex++] = expandedPos[i * 3 + 2]; 

          linePositions[lineIndex++] = expandedPos[j * 3]; 
          linePositions[lineIndex++] = expandedPos[j * 3 + 1]; 
          linePositions[lineIndex++] = expandedPos[j * 3 + 2]; 

          const distRatio = 1.0 - Math.sqrt(distSq) / connectionDistance; 
          const mixedColor = DEEP_BLUE.clone().lerp(ELECTRIC_BLUE, distRatio * progress); 

          lineColors[colorIndex++] = mixedColor.r; 
          lineColors[colorIndex++] = mixedColor.g; 
          lineColors[colorIndex++] = mixedColor.b; 

          lineColors[colorIndex++] = mixedColor.r; 
          lineColors[colorIndex++] = mixedColor.g; 
          lineColors[colorIndex++] = mixedColor.b; 

          connections++; 
        } 
      } 
    } 

    const geometry = linesRef.current.geometry as THREE.BufferGeometry; 
    geometry.setDrawRange(0, lineIndex / 3); 
    
    const posAttribute = geometry.attributes.position as THREE.BufferAttribute; 
    posAttribute.copyArray(linePositions); 
    posAttribute.needsUpdate = true; 

    const colorAttribute = geometry.attributes.color as THREE.BufferAttribute; 
    colorAttribute.copyArray(lineColors); 
    colorAttribute.needsUpdate = true; 
  }); 

  return ( 
    <> 
      <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]}> 
        <sphereGeometry args={[0.03, 16, 16]} /> 
        <meshStandardMaterial 
          color={ELECTRIC_BLUE} 
          emissive={ELECTRIC_BLUE} 
          emissiveIntensity={2} 
          roughness={0.2} 
          metalness={1} 
        /> 
      </instancedMesh> 
      <lineSegments ref={linesRef}> 
        <bufferGeometry> 
          <bufferAttribute 
            attach="attributes-position" 
            count={MAX_LINES * 2} 
            array={linePositions} 
            itemSize={3} 
            usage={THREE.DynamicDrawUsage} 
          /> 
          <bufferAttribute 
            attach="attributes-color" 
            count={MAX_LINES * 2} 
            array={lineColors} 
            itemSize={3} 
            usage={THREE.DynamicDrawUsage} 
          /> 
        </bufferGeometry> 
        <lineBasicMaterial 
          vertexColors={true} 
          transparent={true} 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
        /> 
      </lineSegments> 
    </> 
  ); 
} 

export default function NeuralBackground({ scrollProgress }: { scrollProgress: any }) { 
  return ( 
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: BACKGROUND_COLOR }}> 
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}> 
        <color attach="background" args={[BACKGROUND_COLOR]} /> 
        <ambientLight intensity={0.2} /> 
        <pointLight position={[10, 10, 10]} intensity={1.5} color={ELECTRIC_BLUE} /> 
        <Particles scrollProgress={scrollProgress} /> 
        <EffectComposer disableNormalPass> 
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} blendFunction={BlendFunction.ADD} /> 
          <Noise opacity={0.05} />
          <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer> 
      </Canvas> 
    </div> 
  ); 
} 
