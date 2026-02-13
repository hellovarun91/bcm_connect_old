import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const group = useRef();
  const count = 5000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      const positions = group.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += delta * 25;
        if (positions[i + 2] > 100) {
          positions[i + 2] = -100;
        }
      }
      group.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={group}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        transparent={false}
        opacity={1.0}
      />
    </points>
  );
}

const Hyperspeed = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <Stars />
      </Canvas>
    </div>
  );
};

export default Hyperspeed;