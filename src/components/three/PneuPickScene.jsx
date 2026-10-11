import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { PneuPickRobot } from './PneuPickRobot';

export function PneuPickScene({
  xPos = 0.5,
  yPos = 0.5,
  zPos = 0.0,
  gripperOpen = true,
  payloadType = 'cube',
  hasPayload = false,
  valveActive = false,
  enableOrbit = true,
  cameraPosition = [3.2, 2.2, 3.8]
}) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient base lighting */}
        <ambientLight intensity={0.8} />

        {/* Primary Key Light */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />

        {/* Blue Cyber/Industrial Rim Light */}
        <directionalLight position={[-5, 4, -4]} intensity={1.2} color="#00f0ff" />

        {/* Orange Pneumatic Hazard Fill Light */}
        <pointLight position={[2, -0.2, 2]} intensity={0.8} color="#ff5500" distance={6} />

        {/* Top Studio Overhead Glow */}
        <pointLight position={[0, 4, 0]} intensity={1.0} color="#38bdf8" distance={8} />

        <Suspense fallback={null}>
          <PneuPickRobot
            xPos={xPos}
            yPos={yPos}
            zPos={zPos}
            gripperOpen={gripperOpen}
            payloadType={payloadType}
            hasPayload={hasPayload}
            valveActive={valveActive}
          />

          {/* Contact Shadows on ground */}
          <ContactShadows
            position={[0, -0.65, 0]}
            opacity={0.7}
            scale={6}
            blur={2.0}
            far={4}
          />
        </Suspense>

        {enableOrbit && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.2}
            maxDistance={6.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2 - 0.05}
            dampingFactor={0.05}
          />
        )}
      </Canvas>

      {/* Floating 3D Navigation Hint */}
      <div className="absolute bottom-3 right-4 pointer-events-none text-xs font-mono-tech text-cyan-400/60 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded border border-cyan-500/20">
        [ DRAG TO ROTATE 3D • SCROLL TO ZOOM ]
      </div>
    </div>
  );
}
