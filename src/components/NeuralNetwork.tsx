import React, { useRef, useMemo, useState, useEffect } from 'react'; 
import { Canvas, useFrame, useThree } from '@react-three/fiber'; 
import * as THREE from 'three'; 
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'; 
import { BlendFunction } from 'postprocessing';

const ELECTRIC_BLUE = new THREE.Color('#00C6FF');
const BACKGROUND_COLOR = '#050505';

function Particles({ scrollProgress, isMobile, lowPower }: { scrollProgress: any, isMobile: boolean, lowPower: boolean }) { 
  const meshRef = useRef<THREE.InstancedMesh>(null); 
  const linesRef = useRef<THREE.LineSegments>(null); 
  const { mouse, viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []); 
  
  const perfLow = isMobile || lowPower;
  const actualMaxParticles = perfLow ? 320 : 720;
  const actualMaxConnections = perfLow ? 3 : 6; 

  const particles = useMemo(() => { 
    const pos = new Float32Array(actualMaxParticles * 3); 
    const dir = new Float32Array(actualMaxParticles * 3); 
    const seeds = new Float32Array(actualMaxParticles);
    
    const spreadX = isMobile ? 6.2 : 7.0;
    const spreadY = isMobile ? 7.2 : 6.2;
    const spreadZ = isMobile ? 5.4 : 6.2;

    for (let i = 0; i < actualMaxParticles; i++) { 
      pos[i * 3] = (Math.random() - 0.5) * spreadX; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * spreadY; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ; 

      const dx = (Math.random() - 0.5);
      const dy = (Math.random() - 0.5);
      const dz = (Math.random() - 0.5);
      const len = Math.max(1e-6, Math.hypot(dx, dy, dz));
      dir[i * 3] = dx / len;
      dir[i * 3 + 1] = dy / len;
      dir[i * 3 + 2] = dz / len;

      seeds[i] = Math.random() * 1000;
    } 
    return { pos, dir, seeds }; 
  }, [actualMaxParticles, isMobile]); 

  const linePositions = useMemo(() => new Float32Array(actualMaxParticles * actualMaxConnections * 2 * 3), [actualMaxParticles, actualMaxConnections]); 
  const lineColors = useMemo(() => new Float32Array(actualMaxParticles * actualMaxConnections * 2 * 3), [actualMaxParticles, actualMaxConnections]); 

  useFrame((state) => { 
    if (!meshRef.current || !linesRef.current) return; 

    const time = state.clock.getElapsedTime();
    const dt = Math.min(0.033, state.clock.getDelta());
    const progress = scrollProgress.get(); 

    const densityFactor = THREE.MathUtils.lerp(0.18, 1.0, progress);
    const currentParticles = Math.max(8, Math.floor(actualMaxParticles * densityFactor)); 
    meshRef.current.count = currentParticles; 

    const progressFast = Math.min(1, progress * 2.35);
    const progressSmooth = progressFast * progressFast * (3 - 2 * progressFast);
    const radialScale = THREE.MathUtils.lerp(isMobile ? 0.95 : 0.9, isMobile ? 4.1 : 4.7, progressSmooth);

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(mouseX, mouseY, 0);

    const orbitAngle = progress * Math.PI * 2 + time * 0.08;
    const orbitRadius = isMobile ? 24 : 26;
    const orbitAmp = isMobile ? 5.5 : 7.5;

    state.camera.position.x = mouse.x * 1.8;
    state.camera.position.y = Math.sin(orbitAngle) * orbitAmp + mouse.y * 1.2;
    state.camera.position.z = orbitRadius + Math.cos(orbitAngle) * orbitAmp;
    state.camera.lookAt(0, 0, 0);

    const connectionDist = THREE.MathUtils.lerp(isMobile ? 2.7 : 2.9, isMobile ? 6.2 : 7.5, progressSmooth);
    const connectionDistSq = connectionDist * connectionDist; 
    const restLen = connectionDist * 0.62;
    const repulsionRadius = connectionDist * 0.85;
    const repulsionRadiusSq = repulsionRadius * repulsionRadius;
    const springK = isMobile ? 0.8 : 1.0;
    const repelK = isMobile ? 1.8 : 2.4;

    const cellSize = connectionDist;
    const grid = new Map<string, number[]>();
    const keyOf = (x: number, y: number, z: number) => `${x},${y},${z}`;

    for (let i = 0; i < currentParticles; i++) {
      const px = particles.pos[i * 3] * radialScale;
      const py = particles.pos[i * 3 + 1] * radialScale;
      const pz = particles.pos[i * 3 + 2] * radialScale;
      const cx = Math.floor(px / cellSize);
      const cy = Math.floor(py / cellSize);
      const cz = Math.floor(pz / cellSize);
      const key = keyOf(cx, cy, cz);
      const bucket = grid.get(key);
      if (bucket) bucket.push(i);
      else grid.set(key, [i]);
    }

    const speed = isMobile ? 1.05 : 1.25;
    const bound = isMobile ? 4.6 : 5.0;

    for (let i = 0; i < currentParticles; i++) {
      const seed = particles.seeds[i];

      const px = particles.pos[i * 3] * radialScale;
      const py = particles.pos[i * 3 + 1] * radialScale;
      const pz = particles.pos[i * 3 + 2] * radialScale;

      const cx = Math.floor(px / cellSize);
      const cy = Math.floor(py / cellSize);
      const cz = Math.floor(pz / cellSize);

      let fx = 0;
      let fy = 0;
      let fz = 0;

      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          for (let oz = -1; oz <= 1; oz++) {
            const key = keyOf(cx + ox, cy + oy, cz + oz);
            const bucket = grid.get(key);
            if (!bucket) continue;
            for (let bi = 0; bi < bucket.length; bi++) {
              const j = bucket[bi];
              if (j === i) continue;

              const qx = particles.pos[j * 3] * radialScale;
              const qy = particles.pos[j * 3 + 1] * radialScale;
              const qz = particles.pos[j * 3 + 2] * radialScale;

              const dx = px - qx;
              const dy = py - qy;
              const dz = pz - qz;
              const distSq = dx * dx + dy * dy + dz * dz;
              if (distSq < 1e-6) continue;

              if (distSq < repulsionRadiusSq) {
                const inv = 1 / Math.sqrt(distSq);
                const strength = repelK * (1 - distSq / repulsionRadiusSq);
                fx += dx * inv * strength;
                fy += dy * inv * strength;
                fz += dz * inv * strength;
              }

              if (distSq < connectionDistSq) {
                const dist = Math.sqrt(distSq);
                const inv = 1 / dist;
                const spring = (dist - restLen) * springK;
                fx -= dx * inv * spring;
                fy -= dy * inv * spring;
                fz -= dz * inv * spring;
              }
            }
          }
        }
      }

      fx /= radialScale;
      fy /= radialScale;
      fz /= radialScale;

      const wobble = 0.18 * (0.5 + 0.5 * Math.sin(time * 0.9 + seed));
      particles.dir[i * 3] += (fx * 0.12 + Math.sin(seed + time * 0.15) * wobble * 0.02) * dt;
      particles.dir[i * 3 + 1] += (fy * 0.12 + Math.cos(seed + time * 0.12) * wobble * 0.02) * dt;
      particles.dir[i * 3 + 2] += (fz * 0.12 + Math.sin(seed * 0.5 + time * 0.18) * wobble * 0.02) * dt;

      const dl = Math.max(1e-6, Math.hypot(particles.dir[i * 3], particles.dir[i * 3 + 1], particles.dir[i * 3 + 2]));
      particles.dir[i * 3] /= dl;
      particles.dir[i * 3 + 1] /= dl;
      particles.dir[i * 3 + 2] /= dl;

      particles.pos[i * 3] += particles.dir[i * 3] * speed * dt;
      particles.pos[i * 3 + 1] += particles.dir[i * 3 + 1] * speed * dt;
      particles.pos[i * 3 + 2] += particles.dir[i * 3 + 2] * speed * dt;

      if (particles.pos[i * 3] > bound) particles.pos[i * 3] = -bound;
      if (particles.pos[i * 3] < -bound) particles.pos[i * 3] = bound;
      if (particles.pos[i * 3 + 1] > bound) particles.pos[i * 3 + 1] = -bound;
      if (particles.pos[i * 3 + 1] < -bound) particles.pos[i * 3 + 1] = bound;
      if (particles.pos[i * 3 + 2] > bound) particles.pos[i * 3 + 2] = -bound;
      if (particles.pos[i * 3 + 2] < -bound) particles.pos[i * 3 + 2] = bound;

      const rx = particles.pos[i * 3] * radialScale;
      const ry = particles.pos[i * 3 + 1] * radialScale;
      const rz = particles.pos[i * 3 + 2] * radialScale;

      dummy.position.set(rx, ry, rz);

      const distToMouse = mousePos.distanceTo(dummy.position);
      const isMouseNear = !isMobile && distToMouse < 4;

      const camDist = Math.hypot(
        state.camera.position.x - rx,
        state.camera.position.y - ry,
        state.camera.position.z - rz
      );
      const depthScale = THREE.MathUtils.clamp(1.65 - camDist / 28, 0.45, 2.1);
      const pulse = 0.85 + 0.15 * Math.sin(time * 3 + seed);
      const activation = isMouseNear ? 1.6 : 1.0;

      const s = (isMobile ? 0.03 : 0.035) * depthScale * pulse * activation;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    let lineIndex = 0;
    let colorIndex = 0;

    for (let i = 0; i < currentParticles; i++) {
      let connections = 0;

      const px = particles.pos[i * 3] * radialScale;
      const py = particles.pos[i * 3 + 1] * radialScale;
      const pz = particles.pos[i * 3 + 2] * radialScale;

      const cx = Math.floor(px / cellSize);
      const cy = Math.floor(py / cellSize);
      const cz = Math.floor(pz / cellSize);

      for (let ox = -1; ox <= 1 && connections < actualMaxConnections; ox++) {
        for (let oy = -1; oy <= 1 && connections < actualMaxConnections; oy++) {
          for (let oz = -1; oz <= 1 && connections < actualMaxConnections; oz++) {
            const key = keyOf(cx + ox, cy + oy, cz + oz);
            const bucket = grid.get(key);
            if (!bucket) continue;
            for (let bi = 0; bi < bucket.length && connections < actualMaxConnections; bi++) {
              const j = bucket[bi];
              if (j <= i) continue;

              const qx = particles.pos[j * 3] * radialScale;
              const qy = particles.pos[j * 3 + 1] * radialScale;
              const qz = particles.pos[j * 3 + 2] * radialScale;

              const dx = px - qx;
              const dy = py - qy;
              const dz = pz - qz;
              const distSq = dx * dx + dy * dy + dz * dz;
              if (distSq >= connectionDistSq) continue;

              linePositions[lineIndex++] = px;
              linePositions[lineIndex++] = py;
              linePositions[lineIndex++] = pz;

              linePositions[lineIndex++] = qx;
              linePositions[lineIndex++] = qy;
              linePositions[lineIndex++] = qz;

              const dist = Math.sqrt(distSq);
              const distOpacity = 1 - dist / connectionDist;

              const camDistA = Math.hypot(
                state.camera.position.x - px,
                state.camera.position.y - py,
                state.camera.position.z - pz
              );
              const camDistB = Math.hypot(
                state.camera.position.x - qx,
                state.camera.position.y - qy,
                state.camera.position.z - qz
              );
              const camOpacity = THREE.MathUtils.clamp(1 - ((camDistA + camDistB) * 0.5) / 55, 0, 1);

              const camOpacityBoost = THREE.MathUtils.clamp(0.35 + camOpacity * 0.65, 0.35, 1);
              const opacity = THREE.MathUtils.lerp(0.14, 0.46, progress) * distOpacity * camOpacityBoost;

              lineColors[colorIndex++] = ELECTRIC_BLUE.r * opacity;
              lineColors[colorIndex++] = ELECTRIC_BLUE.g * opacity;
              lineColors[colorIndex++] = ELECTRIC_BLUE.b * opacity;

              lineColors[colorIndex++] = ELECTRIC_BLUE.r * opacity;
              lineColors[colorIndex++] = ELECTRIC_BLUE.g * opacity;
              lineColors[colorIndex++] = ELECTRIC_BLUE.b * opacity;

              connections++;
            }
          }
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
  }); 

  return ( 
    <> 
      <instancedMesh key={`particles-${actualMaxParticles}`} ref={meshRef} args={[undefined, undefined, actualMaxParticles]}> 
        <sphereGeometry args={[1, isMobile ? 6 : 12, isMobile ? 6 : 12]} /> 
        <meshStandardMaterial 
          color={ELECTRIC_BLUE} 
          emissive={ELECTRIC_BLUE} 
          emissiveIntensity={isMobile ? 2.4 : 4.2} 
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
          opacity={1} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        /> 
      </lineSegments> 
    </> 
  ); 
} 

export default function NeuralBackground({ scrollProgress }: { scrollProgress: any }) { 
  const [isMobile, setIsMobile] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const computeLowPower = () => {
      const ua = navigator.userAgent || '';
      const isAndroid = /Android/i.test(ua);
      const deviceMemory = (navigator as any).deviceMemory as number | undefined;
      const cores = navigator.hardwareConcurrency;
      const lowMem = typeof deviceMemory === 'number' && deviceMemory <= 4;
      const lowCores = typeof cores === 'number' && cores <= 4;
      return isAndroid && (lowMem || lowCores);
    };

    checkMobile();
    setLowPower(computeLowPower());
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return ( 
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: BACKGROUND_COLOR }}> 
      <Canvas camera={{ position: [0, 0, 15], fov: isMobile ? 65 : 50 }} dpr={lowPower ? 1 : [1, 2]} gl={{ antialias: !lowPower, powerPreference: 'high-performance' }}> 
        <color attach="background" args={[BACKGROUND_COLOR]} /> 
        <ambientLight intensity={0.18} /> 
        <pointLight position={[15, 15, 15]} intensity={1.4} color={ELECTRIC_BLUE} /> 
        <Particles scrollProgress={scrollProgress} isMobile={isMobile} lowPower={lowPower} /> 
        <EffectComposer enableNormalPass={false}> 
          <Bloom 
            luminanceThreshold={0.02} 
            luminanceSmoothing={0.92} 
            intensity={lowPower ? 1.6 : (isMobile ? 1.9 : 3.2)} 
            blendFunction={BlendFunction.ADD} 
          /> 
          <Noise opacity={(isMobile || lowPower) ? 0 : 0.03} />
          <ChromaticAberration 
            opacity={(isMobile || lowPower) ? 0 : 1}
            offset={new THREE.Vector2(0.00065, 0.00065)} 
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette offset={0.2} darkness={1.2} />
        </EffectComposer> 
      </Canvas> 
    </div> 
  ); 
} 
