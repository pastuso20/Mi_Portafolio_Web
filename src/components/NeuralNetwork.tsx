import React, { useRef, useMemo } from 'react'; 
import { Canvas, useFrame, useThree } from '@react-three/fiber'; 
import * as THREE from 'three'; 
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'; 
import { BlendFunction } from 'postprocessing';

const MAX_PARTICLES = 1000; 
const MAX_CONNECTIONS = 6; 
const MAX_LINES = MAX_PARTICLES * MAX_CONNECTIONS; 

// Colors
const ELECTRIC_BLUE = new THREE.Color('#00C6FF'); 
const WINE_RED = new THREE.Color('#722F37'); 
const BACKGROUND_COLOR = '#050505';

function Particles({ scrollProgress }: { scrollProgress: any }) { 
  const meshRef = useRef<THREE.InstancedMesh>(null); 
  const linesRef = useRef<THREE.LineSegments>(null); 
  const { mouse, viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []); 
  
  const particles = useMemo(() => { 
    const pos = new Float32Array(MAX_PARTICLES * 3); 
    const vel = new Float32Array(MAX_PARTICLES * 3); 
    const seeds = new Float32Array(MAX_PARTICLES);
    
    // Clustering logic: Create clusters like in the image
    const clusterCount = 12;
    const clusters = [];
    for (let i = 0; i < clusterCount; i++) {
      clusters.push({
        center: new THREE.Vector3((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10),
        strength: Math.random() * 5 + 2
      });
    }

    for (let i = 0; i < MAX_PARTICLES; i++) { 
      const cluster = clusters[i % clusterCount];
      const spread = cluster.strength;
      
      pos[i * 3] = cluster.center.x + (Math.random() - 0.5) * spread; 
      pos[i * 3 + 1] = cluster.center.y + (Math.random() - 0.5) * spread; 
      pos[i * 3 + 2] = cluster.center.z + (Math.random() - 0.5) * spread; 
      
      vel[i * 3] = (Math.random() - 0.5) * 0.003; 
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003; 
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003; 
      seeds[i] = Math.random() * 1000;
    } 
    return { pos, vel, seeds }; 
  }, []); 

  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []); 
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []); 

  useFrame((state) => { 
    if (!meshRef.current || !linesRef.current) return; 

    const time = state.clock.getElapsedTime();
    const progress = scrollProgress.get(); 
    
    // Phase mapping
    const densityFactor = progress < 0.25 
      ? THREE.MathUtils.lerp(0.08, 0.25, progress * 4)
      : progress < 0.5 
        ? THREE.MathUtils.lerp(0.25, 0.7, (progress - 0.25) * 4)
        : THREE.MathUtils.lerp(0.7, 1.0, (progress - 0.5) * 2);

    const colorTransition = progress < 0.6 ? 0 : (progress - 0.6) * 2.5;
    const currentColor = ELECTRIC_BLUE.clone().lerp(WINE_RED, Math.min(1, colorTransition));

    const currentParticles = Math.floor(MAX_PARTICLES * densityFactor); 
    const connectionDist = THREE.MathUtils.lerp(2.5, 4.5, progress);
    const connectionDistSq = connectionDist * connectionDist; 
    
    meshRef.current.count = currentParticles; 

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

    for (let i = 0; i < currentParticles; i++) { 
      const seed = particles.seeds[i];
      // Slow binary movement + noise
      particles.pos[i * 3] += particles.vel[i * 3] + Math.sin(time * 0.15 + seed) * 0.0015; 
      particles.pos[i * 3 + 1] += particles.vel[i * 3 + 1] + Math.cos(time * 0.15 + seed) * 0.0015; 
      particles.pos[i * 3 + 2] += particles.vel[i * 3 + 2]; 

      // Boundary wrap for infinite flow
      if (Math.abs(particles.pos[i * 3]) > 20) particles.pos[i * 3] *= -0.95; 
      if (Math.abs(particles.pos[i * 3 + 1]) > 15) particles.pos[i * 3 + 1] *= -0.95; 

      dummy.position.set(particles.pos[i * 3], particles.pos[i * 3 + 1], particles.pos[i * 3 + 2]); 
      
      // Activation & Flickering logic
      const distToMouse = mousePos.distanceTo(dummy.position);
      const isMouseNear = distToMouse < 4;
      const flicker = 0.8 + Math.sin(time * 5 + seed) * 0.2;
      const activation = isMouseNear ? 2.5 : flicker;
      
      const s = (0.025 + Math.sin(time * 0.5 + seed) * 0.01) * activation;
      dummy.scale.set(s, s, s); 
      
      dummy.updateMatrix(); 
      meshRef.current.setMatrixAt(i, dummy.matrix); 
    } 
    meshRef.current.instanceMatrix.needsUpdate = true; 

    let lineIndex = 0; 
    let colorIndex = 0; 

    for (let i = 0; i < currentParticles; i++) { 
      let connections = 0; 
      for (let j = i + 1; j < currentParticles && connections < MAX_CONNECTIONS; j++) { 
        const dx = particles.pos[i * 3] - particles.pos[j * 3]; 
        const dy = particles.pos[i * 3 + 1] - particles.pos[j * 3 + 1]; 
        const dz = particles.pos[i * 3 + 2] - particles.pos[j * 3 + 2]; 
        const distSq = dx * dx + dy * dy + dz * dz; 

        if (distSq < connectionDistSq) { 
          linePositions[lineIndex++] = particles.pos[i * 3]; 
          linePositions[lineIndex++] = particles.pos[i * 3 + 1]; 
          linePositions[lineIndex++] = particles.pos[i * 3 + 2]; 

          linePositions[lineIndex++] = particles.pos[j * 3]; 
          linePositions[lineIndex++] = particles.pos[j * 3 + 1]; 
          linePositions[lineIndex++] = particles.pos[j * 3 + 2]; 

          const opacity = THREE.MathUtils.lerp(0.3, 0, Math.sqrt(distSq) / connectionDist);
          const lineAlpha = opacity * (progress < 0.2 ? 0.3 : 1.0);
          
          lineColors[colorIndex++] = currentColor.r * lineAlpha; 
          lineColors[colorIndex++] = currentColor.g * lineAlpha; 
          lineColors[colorIndex++] = currentColor.b * lineAlpha; 

          lineColors[colorIndex++] = currentColor.r * lineAlpha; 
          lineColors[colorIndex++] = currentColor.g * lineAlpha; 
          lineColors[colorIndex++] = currentColor.b * lineAlpha; 

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

    // Smooth camera drift
    state.camera.position.y = THREE.MathUtils.lerp(0, -4, progress);
    state.camera.position.z = THREE.MathUtils.lerp(15, 13, progress);
    state.camera.lookAt(0, state.camera.position.y * 0.5, 0);
  }); 

  return ( 
    <> 
      <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]}> 
        <sphereGeometry args={[1, 12, 12]} /> 
        <meshStandardMaterial 
          color={ELECTRIC_BLUE} 
          emissive={ELECTRIC_BLUE} 
          emissiveIntensity={3} 
          toneMapped={false}
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
          opacity={0.4} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        /> 
      </lineSegments> 
    </> 
  ); 
} 

export default function NeuralBackground({ scrollProgress }: { scrollProgress: any }) { 
  return ( 
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: BACKGROUND_COLOR }}> 
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}> 
        <color attach="background" args={[BACKGROUND_COLOR]} /> 
        <ambientLight intensity={0.15} /> 
        <pointLight position={[15, 15, 15]} intensity={1.2} color={ELECTRIC_BLUE} /> 
        <Particles scrollProgress={scrollProgress} /> 
        <EffectComposer disableNormalPass> 
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.8} intensity={1.8} blendFunction={BlendFunction.ADD} /> 
          <Noise opacity={0.04} />
          <ChromaticAberration offset={new THREE.Vector2(0.0008, 0.0008)} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer> 
      </Canvas> 
    </div> 
  ); 
} 
