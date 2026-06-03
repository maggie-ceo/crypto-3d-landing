import { useRef, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

function CryptoOrb({ position, color, speed }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t * speed) * 0.4
    ref.current.rotation.y = Math.cos(t * speed * 0.7) * 0.6
  })
  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial color={color} distort={0.35} speed={2} roughness={0.15} metalness={0.85} />
    </Sphere>
  )
}

function ParticleField() {
  const count = 1200
  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const c = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
      const isGold = Math.random() > 0.5
      c[i * 3] = isGold ? 0.94 : 0.05
      c[i * 3 + 1] = isGold ? 0.725 : 0.8
      c[i * 3 + 2] = isGold ? 0.04 : 0.5
    }
    return [p, c]
  }, [])
  const ref = useRef()
  useFrame(() => { ref.current.rotation.y += 0.0008 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors sizeAttenuation />
    </points>
  )
}

const SIGNALS = [
  { title: 'BTC/USDT — Bullish Breakout', direction: 'LONG', confidence: 87, updated: '12m ago', pair: 'BTC', entry: '104,200', target: '112,500' },
  { title: 'ETH/USDT — Reversal Setup', direction: 'LONG', confidence: 74, updated: '28m ago', pair: 'ETH', entry: '2,480', target: '2,820' },
  { title: 'BNB/USDT — Range Reclaim', direction: 'LONG', confidence: 69, updated: '1h ago', pair: 'BNB', entry: '618', target: '655' },
  { title: 'SOL/USDT — Momentum Continuation', direction: 'LONG', confidence: 81, updated: '45m ago', pair: 'SOL', entry: '142', target: '162' },
]

export default function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#050509' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]}>
          <color attach="background" args={['#050509']} />
          <fog attach="fog" args={['#050509', 4, 22]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.1} color="#f0b90b" />
          <pointLight position={[-10, -5, -8]} intensity={0.9} color="#0ecb81" />
          <Stars radius={40} depth={20} count={4000} factor={3} fade speed={1.2} />
          <ParticleField />
          <CryptoOrb position={[0, 0.3, 0]} color="#f0b90b" speed={0.6} />
          <CryptoOrb position={[2.6, -1.2, -1]} color="#0ecb81" speed={0.9} />
          <CryptoOrb position={[-2.8, 0.6, -1.4]} color="#f6465d" speed={0.75} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.9} />
        </Canvas>
      </div>

      <div style={{
        position: 'relative', zIndex: 10, color: '#e8e8f0', fontFamily: "'Segoe UI', system-ui, sans-serif",
        height: '100vh', overflowY: 'auto', padding: '0 5%'
      }}>
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 64, background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(12px)', borderBottom: '1px solid #222230', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', zIndex: 20
        }}>
          <div style={{ color: '#f0b90b', fontWeight: 800, fontSize: '1.1rem', letterSpacing: 1 }}>CRYPTO ALPHA SIGNAL</div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#888899' }}>
            <span style={{ color: '#f0b90b' }}>Signals</span>
            <span>Markets</span>
            <span>Performance</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ color: '#f0b90b', fontSize: '0.9rem' }}>Sign in</span>
            <span style={{ background: '#f0b90b', color: '#000', padding: '8px 18px', borderRadius: 6, fontWeight: 700, fontSize: '0.85rem' }}>Get Started</span>
          </div>
        </nav>

        <section style={{ paddingTop: 120, maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            Institutional-Grade Alpha<br />
            <span style={{ color: '#f0b90b' }}>For Crypto Markets</span>
          </h1>
          <p style={{ color: '#888899', fontSize: '1.1rem', maxWidth: 620, marginBottom: 28 }}>
            Data-driven trade signals with defined risk, verified entries, and real-time updates — built for traders who treat crypto like a portfolio, not a gamble.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {SIGNALS.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(17,17,24,0.88)', border: '1px solid #1e1e2e', borderRadius: 12, padding: 18
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontWeight: 700 }}>{s.pair}/USDT</div>
                  <div style={{
                    background: 'rgba(14,203,129,0.12)', color: '#0ecb81', border: '1px solid rgba(14,203,129,0.35)',
                    padding: '3px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700
                  }}>{s.direction}</div>
                </div>
                <div style={{ color: '#888899', fontSize: '0.8rem', marginBottom: 8 }}>{s.title}</div>
                <div style={{ display: 'flex', height: 10, borderRadius: 6, overflow: 'hidden', marginBottom: 10, background: '#111118' }}>
                  <div style={{ width: `${s.confidence}%`, background: '#0ecb81' }} />
                  <div style={{ width: `${100 - s.confidence}%`, background: '#f6465d' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 6 }}>
                  <div style={{ color: '#888899' }}>Confidence</div>
                  <div style={{ color: '#e8e8f0', fontWeight: 700 }}>{s.confidence}%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 6 }}>
                  <div style={{ color: '#888899' }}>Entry</div>
                  <div style={{ color: '#e8e8f0' }}>{s.entry}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 10 }}>
                  <div style={{ color: '#888899' }}>Target</div>
                  <div style={{ color: '#f0b90b' }}>{s.target}</div>
                </div>
                <div style={{ color: '#888899', fontSize: '0.75rem' }}>{s.updated}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
