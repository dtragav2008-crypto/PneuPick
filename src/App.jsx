import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/layout/Navbar';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Hero } from './components/sections/Hero';
import { ProjectOverview } from './components/sections/ProjectOverview';
import { KinematicsSection } from './components/sections/KinematicsSection';
import { Interactive3DSection } from './components/sections/Interactive3DSection';
import { HowItWorks } from './components/sections/HowItWorks';
import { ControlSystemSection } from './components/sections/ControlSystemSection';
import { ProjectGallery } from './components/sections/ProjectGallery';
import { TeamSection } from './components/sections/TeamSection';
import { Footer } from './components/layout/Footer';
import { SpecsModal } from './components/ui/SpecsModal';
import { sound } from './utils/audio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAutoDemo, setIsAutoDemo] = useState(false);

  // Central Robot Hardware & Pneumatic Kinematics State
  const [robotState, setRobotState] = useState({
    xPos: 0.5,           // 0 to 1 (0 to 200mm span)
    yPos: 0.1,           // 0 to 1 (0 to 600mm stroke)
    zPos: 0.0,           // 0 to 1 (0 to 100mm reach)
    gripperOpen: true,   // true = open (35mm), false = clamped (45N)
    hasPayload: false,   // true if object is held
    payloadType: 'cube', // 'cube' | 'ball'
    pressure: 6.2,       // Bar
    valveActive: false   // Solenoid firing burst effect
  });

  const autoDemoTimerRef = useRef(null);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  // Autonomous Pick-and-Place State Machine Sequence
  const runAutoDemo = () => {
    if (isAutoDemo) {
      // Abort
      if (autoDemoTimerRef.current) clearTimeout(autoDemoTimerRef.current);
      setIsAutoDemo(false);
      setRobotState(prev => ({
        ...prev,
        zPos: 0,
        gripperOpen: true,
        valveActive: false
      }));
      sound.playPneumaticExhaust(0.3, 1800);
      return;
    }

    setIsAutoDemo(true);
    sound.playPneumaticExhaust(0.4, 2800);

    // Step 1: Align Y to Shelf Tier 2 (y=0.5)
    setRobotState(prev => ({
      ...prev,
      xPos: 0.5,
      yPos: 0.5,
      zPos: 0.0,
      gripperOpen: true,
      hasPayload: false,
      payloadType: 'cube',
      valveActive: true
    }));

    autoDemoTimerRef.current = setTimeout(() => {
      // Step 2: Translate X to Slot Left (x=0.25)
      sound.playPneumaticExhaust(0.35, 2400);
      setRobotState(prev => ({ ...prev, xPos: 0.25, valveActive: false }));

      autoDemoTimerRef.current = setTimeout(() => {
        // Step 3: Extend Z into Shelf (+100mm)
        sound.playPneumaticExhaust(0.3, 2900);
        setRobotState(prev => ({ ...prev, zPos: 0.9, valveActive: true }));

        autoDemoTimerRef.current = setTimeout(() => {
          // Step 4: Clamp Pneumatic Jaws
          sound.playSolenoidClick();
          setRobotState(prev => ({
            ...prev,
            gripperOpen: false,
            hasPayload: true,
            valveActive: false
          }));

          autoDemoTimerRef.current = setTimeout(() => {
            // Step 5: Retract Z to Corridor with Payload
            sound.playPneumaticExhaust(0.35, 2100);
            setRobotState(prev => ({ ...prev, zPos: 0.0, valveActive: true }));

            autoDemoTimerRef.current = setTimeout(() => {
              // Step 6: Translate X to Dropzone (x=0.8) and Lower Y (y=0.2)
              sound.playPneumaticExhaust(0.4, 2500);
              setRobotState(prev => ({
                ...prev,
                xPos: 0.8,
                yPos: 0.2,
                valveActive: false
              }));

              autoDemoTimerRef.current = setTimeout(() => {
                // Step 7: Release Jaws (Deposit Object)
                sound.playSolenoidClick();
                sound.playPneumaticExhaust(0.25, 3200);
                setRobotState(prev => ({
                  ...prev,
                  gripperOpen: true,
                  hasPayload: false,
                  valveActive: true
                }));

                autoDemoTimerRef.current = setTimeout(() => {
                  // Step 8: Return Home (x=0.5, y=0.1)
                  sound.playPneumaticExhaust(0.4, 2000);
                  setRobotState(prev => ({
                    ...prev,
                    xPos: 0.5,
                    yPos: 0.1,
                    zPos: 0.0,
                    gripperOpen: true,
                    hasPayload: false,
                    valveActive: false
                  }));
                  setIsAutoDemo(false);
                }, 1200);
              }, 1000);
            }, 1000);
          }, 800);
        }, 900);
      }, 900);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (autoDemoTimerRef.current) clearTimeout(autoDemoTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Cinematic Startup Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Main Website Structure */}
      <Navbar
        onRunAutoDemo={runAutoDemo}
        isAutoDemo={isAutoDemo}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      <main className="flex-1 w-full">
        {/* Full-Screen Hero with 3D Gantry Viewport */}
        <Hero
          onRunAutoDemo={runAutoDemo}
          isAutoDemo={isAutoDemo}
          robotState={robotState}
        />

        {/* Project Overview: Problem, Pneumatic Innovation vs Electric Motors */}
        <ProjectOverview />

        {/* 3-Axis Cartesian Kinematics & Valve Manifold (Y: 600mm, X: 200mm, Z: 100mm, Jaw) */}
        <KinematicsSection />

        {/* Dedicated Interactive 3D Simulator Sandbox & Live ESP32 Console */}
        <Interactive3DSection
          robotState={robotState}
          setRobotState={setRobotState}
          onRunAutoDemo={runAutoDemo}
          isAutoDemo={isAutoDemo}
        />

        {/* 5-Step Operational Pipeline */}
        <HowItWorks />

        {/* Embedded ESP32, 16x2 LCD Simulation, 4x4 Keypad & Bluetooth Architecture */}
        <ControlSystemSection />

        {/* Prototyping Showcase with Real Workshop Photos */}
        <ProjectGallery />

        {/* Team 7 Roster with Photos & Verified LinkedIn Links */}
        <TeamSection />
      </main>

      {/* Engineering Footer */}
      <Footer onOpenSpecs={() => setIsSpecsOpen(true)} />

      {/* Full Technical Specifications Sheet Modal */}
      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </div>
  );
}
