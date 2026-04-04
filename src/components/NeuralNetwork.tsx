import React, { useRef, useMemo, useState, useEffect } from 'react'; 
import { Canvas, useFrame, useThree } from '@react-three/fiber'; 
import * as THREE from 'three'; 
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'; 
import { BlendFunction } from 'postprocessing';

const MAX_PARTICLES = 1000; 
const MAX_CONNECTIONS = 6; 
const MAX_LINES = MAX_PARTICLES * MAX_CONNECTIONS; 

const ELECTRIC_BLUE = new THREE.Color('#00C6FF'); 
const WINE_RED = new THREE.Color('#722F37'); 
const BACKGROUND_COLOR = '#050505';

function Particles({ scrollProgress, isMobile }: { scrollProgress: any, isMobile: boolean }) { 
  const meshRef = useRef<THREE.InstancedMesh>(null); 
  const linesRef = useRef<THREE.LineSegments>(null); 
  const { mouse, viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []); 
  
  // Optimize particle count based on device
  const actualMaxParticles = isMobile ? 400 : 800;
  const actualMaxConnections = isMobile ? 3 : 5;

  const particles = useMemo(() => { 
    const pos = new Float32Array(actualMaxParticles * 3); 
    const vel = new Float32Array(actualMaxParticles * 3); 
    const seeds = new Float32Array(actualMaxParticles);
    
    // Clustering logic
    const clusterCount = isMobile ? 6 : 15;
    const clusters = [];
    for (let i = 0; i < clusterCount; i++) {
      clusters.push({
        center: new THREE.Vector3(
          (Math.random() - 0.5) * (isMobile ? 15 : 25), 
          (Math.random() - 0.5) * (isMobile ? 30 : 20), 
          (Math.random() - 0.5) * 10
        ),
        strength: Math.random() * (isMobile ? 6 : 4) + 2
      });
    }

    for (let i = 0; i < actualMaxParticles; i++) { 
      const cluster = clusters[i % clusterCount];
      const spread = cluster.strength;
      
      pos[i * 3] = cluster.center.x + (Math.random() - 0.5) * spread; 
      pos[i * 3 + 1] = cluster.center.y + (Math.random() - 0.5) * spread; 
      pos[i * 3 + 2] = cluster.center.z + (Math.random() - 0.5) * spread; 
      
      vel[i * 3] = (Math.random() - 0.5) * 0.002; 
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002; 
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002; 
      seeds[i] = Math.random() * 1000;
    } 
    return { pos, vel, seeds }; 
  }, [actualMaxParticles, isMobile]); 

  const linePositions = useMemo(() => new Float32Array(actualMaxParticles * actualMaxConnections * 2 * 3), [actualMaxParticles, actualMaxConnections]); 
  const lineColors = useMemo(() => new Float32Array(actualMaxParticles * actualMaxConnections * 2 * 3), [actualMaxParticles, actualMaxConnections]); 

  useFrame((state) => { 
    if (!meshRef.current || !linesRef.current) return; 

    const time = state.clock.getElapsedTime();
    const progress = scrollProgress.get(); 
    
    // Smooth density transition
    const densityFactor = THREE.MathUtils.lerp(0.15, 1.0, progress);
    const colorTransition = Math.max(0, (progress - 0.5) * 2);
    const currentColor = ELECTRIC_BLUE.clone().lerp(WINE_RED, colorTransition);

    const currentParticles = Math.floor(actualMaxParticles * densityFactor); 
    const connectionDist = isMobile ? 3.0 : 4.5;
    const connectionDistSq = connectionDist * connectionDist; 
    
    meshRef.current.count = currentParticles; 

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

    for (let i = 0; i < currentParticles; i++) { 
      const seed = particles.seeds[i];
      // Gentle floating movement
      particles.pos[i * 3] += particles.vel[i * 3] + Math.sin(time * 0.2 + seed) * 0.001; 
      particles.pos[i * 3 + 1] += particles.vel[i * 3 + 1] + Math.cos(time * 0.2 + seed) * 0.001; 
      particles.pos[i * 3 + 2] += particles.vel[i * 3 + 2]; 

      // Infinite wrapping
      const boundaryX = isMobile ? 12 : 15;
      const boundaryY = isMobile ? 20 : 12;
      
      if (particles.pos[i * 3] > boundaryX) particles.pos[i * 3] = -boundaryX;
      if (particles.pos[i * 3] < -boundaryX) particles.pos[i * 3] = boundaryX;
      if (particles.pos[i * 3 + 1] > boundaryY) particles.pos[i * 3 + 1] = -boundaryY;
      if (particles.pos[i * 3 + 1] < -boundaryY) particles.pos[i * 3 + 1] = boundaryY;

      dummy.position.set(particles.pos[i * 3], particles.pos[i * 3 + 1], particles.pos[i * 3 + 2]); 
      
      const distToMouse = mousePos.distanceTo(dummy.position);
      const isMouseNear = !isMobile && distToMouse < 4;
      const flicker = 0.7 + Math.sin(time * 3 + seed) * 0.3;
      const activation = isMouseNear ? 2.5 : flicker;
      
      const s = (isMobile ? 0.022 : 0.028) * activation;
      dummy.scale.set(s, s, s); 
      
      dummy.updateMatrix(); 
      meshRef.current.setMatrixAt(i, dummy.matrix); 
    } 
    meshRef.current.instanceMatrix.needsUpdate = true; 

    let lineIndex = 0; 
    let colorIndex = 0; 

    for (let i = 0; i < currentParticles; i++) { 
      let connections = 0; 
      for (let j = i + 1; j < currentParticles && connections < actualMaxConnections; j++) { 
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

          const opacity = THREE.MathUtils.lerp(isMobile ? 0.25 : 0.4, 0, Math.sqrt(distSq) / connectionDist);
          
          lineColors[colorIndex++] = currentColor.r * opacity; 
          lineColors[colorIndex++] = currentColor.g * opacity; 
          lineColors[colorIndex++] = currentColor.b * opacity; 

          lineColors[colorIndex++] = currentColor.r * opacity; 
          lineColors[colorIndex++] = currentColor.g * opacity; 
          lineColors[colorIndex++] = currentColor.b * opacity; 

          connections++; 
        } 
      } 
    } 

    const geometry = linesRef.current.geometry as THREE.BufferGeometry; 
    
    const posAttribute = geometry.attributes.position as THREE.BufferAttribute; 
    if (posAttribute && posAttribute.array.length >= lineIndex) {
      posAttribute.set(linePositions.subarray(0, lineIndex)); 
      posAttribute.needsUpdate = true; 
    }

    const colorAttribute = geometry.attributes.color as THREE.BufferAttribute; 
    if (colorAttribute && colorAttribute.array.length >= colorIndex) {
      colorAttribute.set(lineColors.subarray(0, colorIndex)); 
      colorAttribute.needsUpdate = true; 
    }

    geometry.setDrawRange(0, lineIndex / 3); 
    
    // Unified camera movement
    state.camera.position.y = THREE.MathUtils.lerp(0, -10, progress);
    state.camera.position.z = isMobile ? 18 : 15;
    state.camera.lookAt(0, state.camera.position.y * 0.9, 0);
  }); 

  return ( 
    <> 
      <instancedMesh key={`particles-${actualMaxParticles}`} ref={meshRef} args={[undefined, undefined, actualMaxParticles]}> 
        <sphereGeometry args={[1, isMobile ? 6 : 12, isMobile ? 6 : 12]} /> 
        <meshStandardMaterial 
          color={ELECTRIC_BLUE} 
          emissive={ELECTRIC_BLUE} 
          emissiveIntensity={isMobile ? 2 : 4} 
          toneMapped={false}
        /> 
      </instancedMesh> 
      <lineSegments key={`lines-${actualMaxParticles}`} ref={linesRef}> 
        <bufferGeometry> 
          <bufferAttribute 
            attach="attributes-position" 
            count={actualMaxParticles * actualMaxConnections * 2} 
            array={linePositions} 
            itemSize={3} 
            usage={THREE.DynamicDrawUsage} 
          /> 
          <bufferAttribute 
            attach="attributes-color" 
            count={actualMaxParticles * actualMaxConnections * 2} 
            array={lineColors} 
            itemSize={3} 
            usage={THREE.DynamicDrawUsage} 
          /> 
        </bufferGeometry> 
        <lineBasicMaterial 
          vertexColors={true} 
          transparent={true} 
          opacity={0.5} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        /> 
      </lineSegments> 
    </> 
  ); 
} 

export default function NeuralBackground({ scrollProgress }: { scrollProgress: any }) { 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return ( 
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: BACKGROUND_COLOR }}> 
      <Canvas camera={{ position: [0, 0, 15], fov: isMobile ? 65 : 50 }} dpr={[1, 2]}> 
        <color attach="background" args={[BACKGROUND_COLOR]} /> 
        <ambientLight intensity={0.2} /> 
        <pointLight position={[15, 15, 15]} intensity={1.5} color={ELECTRIC_BLUE} /> 
        <Particles scrollProgress={scrollProgress} isMobile={isMobile} /> 
        <EffectComposer enableNormalPass={false}> 
          <Bloom 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.8} 
            intensity={isMobile ? 1.2 : 2.0} 
            blendFunction={BlendFunction.ADD} 
          /> 
          <Noise opacity={isMobile ? 0 : 0.04} />
          <ChromaticAberration 
            opacity={isMobile ? 0 : 1}
            offset={new THREE.Vector2(0.0008, 0.0008)} 
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette offset={0.1} darkness={1.1} />
        </EffectComposer> 
      </Canvas> 
    </div> 
  ); 
} 
