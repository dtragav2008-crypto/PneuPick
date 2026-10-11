import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PneuPickRobot({
  xPos = 0.5,           // 0 to 1
  yPos = 0.5,           // 0 to 1
  zPos = 0.0,           // 0 to 1
  gripperOpen = true,   // boolean
  payloadType = 'cube', // 'cube' | 'ball'
  hasPayload = false,   // boolean
  valveActive = false
}) {
  // References for smooth interpolations
  const gantryXRef = useRef();
  const carriageYRef = useRef();
  const zExtenderRef = useRef();
  const leftJawRef = useRef();
  const rightJawRef = useRef();
  const airBurstRef = useRef();

  // Internal animated values
  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentZ = useRef(0);
  const currentGrip = useRef(0.04);

  useFrame((_, delta) => {
    // Target physical coordinates
    // Frame dimensions: X spans -1.4 to 1.4, Y spans -0.6 to 1.2, Z extends 0 to 0.95
    const targetX = (xPos - 0.5) * 2.8;
    const targetY = -0.6 + yPos * 1.8;
    const targetZ = zPos * 0.95;
    const targetGrip = gripperOpen ? 0.055 : 0.015;

    // Smooth lerp for realistic pneumatic cylinder velocity
    const lerpSpeed = 10 * delta;
    currentX.current = THREE.MathUtils.lerp(currentX.current, targetX, lerpSpeed);
    currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, lerpSpeed);
    currentZ.current = THREE.MathUtils.lerp(currentZ.current, targetZ, lerpSpeed);
    currentGrip.current = THREE.MathUtils.lerp(currentGrip.current, targetGrip, 14 * delta);

    if (gantryXRef.current) {
      gantryXRef.current.position.x = currentX.current;
    }
    if (carriageYRef.current) {
      carriageYRef.current.position.y = currentY.current;
    }
    if (zExtenderRef.current) {
      zExtenderRef.current.position.z = currentZ.current;
    }
    if (leftJawRef.current) {
      leftJawRef.current.position.x = -currentGrip.current;
    }
    if (rightJawRef.current) {
      rightJawRef.current.position.x = currentGrip.current;
    }

    if (airBurstRef.current) {
      if (valveActive) {
        airBurstRef.current.scale.setScalar(THREE.MathUtils.lerp(airBurstRef.current.scale.x, 1.2, 0.2));
        airBurstRef.current.material.opacity = THREE.MathUtils.lerp(airBurstRef.current.material.opacity, 0.8, 0.2);
      } else {
        airBurstRef.current.scale.setScalar(0.001);
        airBurstRef.current.material.opacity = 0;
      }
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* ================= BASE & 80/20 ALUMINUM FRAME ================= */}
      {/* Heavy Base Plate */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.1, 2.6]} />
        <meshStandardMaterial color="#0A0E17" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* Grid Guide Marks on Table */}
      <gridHelper args={[4.2, 21, "#00f0ff", "#1e293b"]} position={[0, 0.005, 0]} />

      {/* Frame Vertical Columns (4 Extrusions) */}
      {[[-1.8, -0.8], [1.8, -0.8], [-1.8, 0.8], [1.8, 0.8]].map(([x, z], i) => (
        <group key={i} position={[x, 1.3, z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.08, 2.7, 0.08]} />
            <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Anodized corner brackets */}
          <mesh position={[0, -1.3, 0]}>
            <boxGeometry args={[0.12, 0.08, 0.12]} />
            <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.12, 0.08, 0.12]} />
            <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Horizontal Upper Frame Rails */}
      <mesh position={[0, 2.65, -0.8]} castShadow>
        <boxGeometry args={[3.68, 0.08, 0.08]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 2.65, 0.8]} castShadow>
        <boxGeometry args={[3.68, 0.08, 0.08]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[-1.8, 2.65, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 1.68]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[1.8, 2.65, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 1.68]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* ================= 3-TIER STORAGE SHELF UNIT ================= */}
      <group position={[0, 0, 0.75]}>
        {/* Shelf Frame Posts */}
        {[[-1.4, 0], [1.4, 0]].map(([sx], i) => (
          <mesh key={i} position={[sx, 1.0, 0]} castShadow>
            <boxGeometry args={[0.06, 2.0, 0.35]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
          </mesh>
        ))}

        {/* 3 Shelf Shelves (Tiers) */}
        {[0.2, 0.85, 1.5].map((sy, i) => (
          <group key={i} position={[0, sy, 0]}>
            <mesh receiveShadow castShadow>
              <boxGeometry args={[2.8, 0.04, 0.38]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Shelf Edge Accent Glow Line */}
            <mesh position={[0, 0, -0.19]}>
              <boxGeometry args={[2.8, 0.015, 0.01]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>

            {/* Shelf Items in slots */}
            <mesh position={[-0.7, 0.12, 0]} castShadow>
              <boxGeometry args={[0.18, 0.18, 0.18]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.6} />
            </mesh>
            <mesh position={[0.7, 0.11, 0]} castShadow>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color="#a3e635" roughness={0.7} metalness={0.1} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= X-AXIS DUAL PNEUMATIC CYLINDERS (200mm) ================= */}
      {/* Front and Back Horizontal Cylinder Barrels */}
      {[-0.3, 0.3].map((cz, i) => (
        <group key={i} position={[0, 2.5, cz]}>
          {/* Cylinder Barrel */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 2.8, 24]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Chrome Piston Guide Rod */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 3.0, 24]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* ================= X-GANTRY CARRIAGE (MOVES HORIZONTALLY) ================= */}
      <group ref={gantryXRef}>
        {/* Top Carriage Mount Block */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <boxGeometry args={[0.26, 0.16, 0.74]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* ================= Y-AXIS VERTICAL PNEUMATIC CYLINDER (600mm) ================= */}
        {/* Vertical Cylinder Body attached to top carriage */}
        <group position={[0, 1.45, 0]}>
          {/* Blue Anodized Cylinder Barrel */}
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.05, 1.9, 32]} />
            <meshStandardMaterial color="#0369a1" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Cylinder Port Fittings (Pneumatic 5/3 DCV feed ports) */}
          <mesh position={[0.06, 0.8, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.04, 16]} />
            <meshStandardMaterial color="#f97316" metalness={0.9} />
          </mesh>
          <mesh position={[0.06, -0.8, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.04, 16]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.9} />
          </mesh>
        </group>

        {/* ================= Y-AXIS VERTICAL MOVING CARRIAGE ================= */}
        <group ref={carriageYRef} position={[0, 0.4, 0]}>
          {/* Polished Chrome Extension Rod connecting down from cylinder */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 1.0, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.98} />
          </mesh>

          {/* Central Carriage Block with Linear Bearings */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.28, 0.22, 0.26]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Status Indicator LED on Carriage */}
          <mesh position={[0.145, 0.05, 0]}>
            <boxGeometry args={[0.01, 0.04, 0.04]} />
            <meshBasicMaterial color={valveActive ? "#ff5500" : "#00f0ff"} />
          </mesh>

          {/* ================= Z-AXIS PNEUMATIC CYLINDER (100mm) ================= */}
          {/* Horizontal Z Cylinder Body mounted on carriage pointing towards shelf (+Z) */}
          <group position={[0, -0.02, 0.15]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.32, 24]} />
              <meshStandardMaterial color="#0284c7" roughness={0.25} metalness={0.8} />
            </mesh>
            {/* Pneumatic Solenoid Valve Manifold block mounted right here */}
            <mesh position={[-0.14, 0.06, 0]}>
              <boxGeometry args={[0.07, 0.12, 0.16]} />
              <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.5} />
            </mesh>
            {/* Miniature Solenoid Coils (4 valve blocks) */}
            {[-0.04, 0, 0.04].map((vz, idx) => (
              <mesh key={idx} position={[-0.18, 0.06, vz]}>
                <boxGeometry args={[0.03, 0.08, 0.025]} />
                <meshStandardMaterial color={valveActive ? "#ef4444" : "#22c55e"} />
              </mesh>
            ))}
          </group>

          {/* ================= Z-AXIS EXTENDING SECTION & PNEUMATIC JAW GRIPPER ================= */}
          <group ref={zExtenderRef} position={[0, -0.02, 0.28]}>
            {/* Chrome Extension Piston Rod */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.018, 0.018, 0.45, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.98} />
            </mesh>

            {/* Gripper Base / Actuator Body */}
            <group position={[0, 0, 0.12]}>
              <mesh castShadow>
                <boxGeometry args={[0.18, 0.08, 0.1]} />
                <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Pneumatic Cylinder for Gripper jaws */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.025, 0.025, 0.16, 20]} />
                <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.7} />
              </mesh>

              {/* Air Exhaust Burst Puffs effect on valve vent */}
              <mesh ref={airBurstRef} position={[0, 0.08, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0} />
              </mesh>

              {/* Left Articulated Gripper Jaw */}
              <group ref={leftJawRef} position={[-0.05, 0, 0.08]}>
                <mesh castShadow>
                  <boxGeometry args={[0.02, 0.06, 0.14]} />
                  <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
                </mesh>
                {/* High-friction rubber pad (textured inner gripping edge) */}
                <mesh position={[0.012, 0, 0.02]}>
                  <boxGeometry args={[0.005, 0.05, 0.1]} />
                  <meshStandardMaterial color="#00f0ff" roughness={0.9} />
                </mesh>
              </group>

              {/* Right Articulated Gripper Jaw */}
              <group ref={rightJawRef} position={[0.05, 0, 0.08]}>
                <mesh castShadow>
                  <boxGeometry args={[0.02, 0.06, 0.14]} />
                  <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
                </mesh>
                {/* High-friction rubber pad (textured inner gripping edge) */}
                <mesh position={[-0.012, 0, 0.02]}>
                  <boxGeometry args={[0.005, 0.05, 0.1]} />
                  <meshStandardMaterial color="#00f0ff" roughness={0.9} />
                </mesh>
              </group>

              {/* DYNAMIC PAYLOAD IN GRIPPER */}
              {hasPayload && (
                <group position={[0, 0, 0.11]}>
                  {payloadType === 'cube' ? (
                    <mesh castShadow>
                      <boxGeometry args={[0.13, 0.13, 0.13]} />
                      <meshStandardMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.25}
                        roughness={0.2}
                        metalness={0.8}
                      />
                    </mesh>
                  ) : (
                    <mesh castShadow>
                      <sphereGeometry args={[0.08, 32, 32]} />
                      <meshStandardMaterial
                        color="#a3e635"
                        emissive="#84cc16"
                        emissiveIntensity={0.2}
                        roughness={0.6}
                      />
                    </mesh>
                  )}
                </group>
              )}
            </group>
          </group>
        </group>
      </group>

      {/* ================= REAL-TIME PRESSURE REGULATOR / FRL UNIT ================= */}
      <group position={[1.65, 0.4, -0.6]}>
        {/* Filter-Regulator-Lubricator (FRL) Body */}
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.32, 0.12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Pressure Gauge Dial */}
        <mesh position={[0, 0.1, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Gauge Needle */}
        <mesh position={[0, 0.1, 0.085]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.006, 0.07, 0.005]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        {/* Glow rim on gauge */}
        <mesh position={[0, 0.1, 0.075]}>
          <torusGeometry args={[0.06, 0.006, 16, 32]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>
    </group>
  );
}
