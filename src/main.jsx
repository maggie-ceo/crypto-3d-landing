import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CryptoScene() {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <color attach="background" args={['#050509']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#f0b90b" />
      <pointLight position={[-10, -5, -10]} intensity={0.8} color="#0ecb81" />

      <Sphere args={[1.5, 64, 64]} scale={hovered ? 1.1 : 1}>
        <MeshDistortMaterial
          color="#f0b90b"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <CryptoScene />
      </Canvas>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
