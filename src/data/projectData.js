// Project data, kinematics specifications, team members, and documentation content

export const PROJECT_INFO = {
  name: "PneuPick",
  tagline: "Autonomous 3-Axis Pneumatic Material Handling & ASRS Robot",
  institution: "SRM Institute of Science and Technology",
  teamName: "Team 7",
  status: "Fully Pneumatic Cartesian Actuation",
  operatingPressure: "4.5 – 7.0 Bar",
  envelope: "600 mm × 200 mm × 400 mm",
  controller: "ESP32 Dual-Core Microcontroller",
  summary: "A compact, modular material handling robot designed to autonomously retrieve and place objects stored across multi-tier shelves. Engineered to operate entirely via pneumatic actuation for all 3 linear axes and end-effector gripping, eliminating heavy electric servos for high-speed, spark-free, and explosion-safe industrial warehouse automation."
};

export const KINEMATICS_AXES = [
  {
    axis: "Y-Axis (Vertical)",
    cylinder: "Single Pneumatic Cylinder",
    stroke: "600 mm Travel",
    valve: "5/3 Directional Control Valve (Closed Center)",
    function: "Vertical positioning across shelf levels with intermediate closed-center hold states.",
    details: "Provides elevation travel to access different shelf tiers. The 3-position 5/3 DCV allows holding at intermediary heights by trapping air in both cylinder chambers.",
    color: "#00F0FF",
    specs: {
      bore: "25 mm",
      stroke: "600 mm",
      valveType: "5/3 Solenoid DCV",
      pressure: "6.0 Bar",
      maxForce: "294 N"
    }
  },
  {
    axis: "X-Axis (Horizontal)",
    cylinder: "Dual Pneumatic Cylinders",
    stroke: "200 mm Travel (Coordinated)",
    valve: "Two Independent 5/2 Directional Control Valves",
    function: "Horizontal gantry translation along the shelf width with distributed structural load.",
    details: "Two parallel actuators balance mechanical cantilever forces and guide the carriage horizontally along precision linear rail extrusions.",
    color: "#FF5500",
    specs: {
      bore: "20 mm",
      stroke: "200 mm (x2)",
      valveType: "Dual 5/2 Solenoid DCV",
      pressure: "5.5 Bar",
      maxForce: "345 N (combined)"
    }
  },
  {
    axis: "Z-Axis (Depth / Reach)",
    cylinder: "Pneumatic Extension Cylinder",
    stroke: "100 mm Travel",
    valve: "5/2 Directional Control Valve",
    function: "Inward and outward shelf insertion to access target compartments.",
    details: "Extends the end-effector payload inward into the shelf storage slot to grasp or deposit items, then rapidly retracts back into the clearance corridor.",
    color: "#10B981",
    specs: {
      bore: "16 mm",
      stroke: "100 mm",
      valveType: "5/2 Solenoid DCV",
      pressure: "5.0 Bar",
      maxForce: "100 N"
    }
  },
  {
    axis: "End-Effector (Gripper)",
    cylinder: "Compact Pneumatic Gripper Mechanism",
    stroke: "Dual Angular / Parallel Jaws",
    valve: "5/2 Direct Solenoid Valve",
    function: "Secure payload grasping for both 60 mm cubes and spherical objects (tennis balls).",
    details: "Custom contoured gripping geometry with high-friction resilient pads ensuring zero slip on spherical curvatures and rigid contact on 60 mm cube faces.",
    color: "#F59E0B",
    specs: {
      gripForce: "45 N",
      stroke: "35 mm aperture",
      jawProfile: "Dual-Contour V-Groove + Flat",
      payloads: "60mm Cube & Tennis Ball"
    }
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Coordinate Target Entry",
    subtitle: "User & Autonomous Dispatch",
    description: "Target shelf compartment coordinate is entered via the 4×4 tactile keypad, received wirelessly over Bluetooth, or triggered by automated dispatch protocol.",
    badge: "ESP32 Processing"
  },
  {
    step: "02",
    title: "Pressure & Valve Energization",
    subtitle: "Pneumatic Supply Regulation",
    description: "The FRL air prep unit stabilizes system line pressure at 6.0 Bar. Solenoid manifold driver cards energize directional control valves in calculated sequences.",
    badge: "5/3 & 5/2 DCVs"
  },
  {
    step: "03",
    title: "Coordinated Gantry Positioning",
    subtitle: "X & Y Axis Synchronous Transit",
    description: "The 600mm Y-cylinder lifts the carriage to target shelf height while dual 200mm X-cylinders translate horizontally, locked securely by the closed-center 5/3 DCV.",
    badge: "Dual Axis Alignment"
  },
  {
    step: "04",
    title: "Z-Axis Insertion & Jaw Clamp",
    subtitle: "100mm Depth Penetration",
    description: "The 100mm Z-axis cylinder extends into the shelf slot. The pneumatic jaw clamps with calibrated pneumatic force around the 60mm cube or tennis ball.",
    badge: "Gripper Actuation"
  },
  {
    step: "05",
    title: "Extraction & Retrieval Return",
    subtitle: "Cycle Complete & Telemetry Update",
    description: "Z-cylinder retracts the secured object out of the shelf envelope. The gantry returns to the baseline discharge station, updating the LCD and Bluetooth console.",
    badge: "ASRS Storing/Retrieval"
  }
];

export const TEAM_MEMBERS = [
  {
    id: "vinayak",
    name: "Vinayak Saxena",
    department: "SIESED",
    role: "Pneumatic Systems & Kinematics Lead",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-vinayak.jpg",
    linkedin: "https://www.linkedin.com/in/vinayak-saxena-94a3b8368/"
  },
  {
    id: "sagnik",
    name: "Sagnik Rakshit",
    department: "SIESED",
    role: "Mechanical Design & Gantry Integration",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-sagnik.jpg",
    linkedin: "https://www.linkedin.com/in/sagnik-rakshit-300b06407?utm_source=share_via&utm_content=profile&utm_medium=member_android"
  },
  {
    id: "johith",
    name: "Johith Pranav",
    department: "SPACED",
    role: "Embedded Firmware & ESP32 Architect",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-johith.jpg",
    linkedin: "https://www.linkedin.com/in/johith-pranav-373584434/"
  },
  {
    id: "aastha",
    name: "Aastha Agarwal",
    department: "SPACED",
    role: "Pneumatic Circuitry & Valve Control",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-aastha.jpg",
    linkedin: "https://www.linkedin.com/in/aastha-agarwal-a8449a42a/"
  },
  {
    id: "nikithaa",
    name: "Nikithaa",
    department: "SPACED",
    role: "Sensors & LCD Telemetry Interface",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-nikithaa.jpg",
    linkedin: "https://www.linkedin.com/in/nikithaa-g-5a43b8429/"
  },
  {
    id: "kamalesh",
    name: "Kamalesh Abinav S R",
    department: "SAMBED",
    role: "Structural Frame & Rail Analysis",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-kamalesh.jpg",
    linkedin: "https://www.linkedin.com/in/kamalesh-abinav-s-r-aa913336b?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  },
  {
    id: "prapti",
    name: "Prapti Chatterjee",
    department: "SAMBED",
    role: "End-Effector & Jaw Profile Modeling",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-prapti.jpg",
    linkedin: "https://www.linkedin.com/in/prapti-chatterjee-42484a342/"
  },
  {
    id: "deena",
    name: "Deena Dawood",
    department: "MCSOCD",
    role: "Bluetooth Protocol & System Logic",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-deena.jpg",
    linkedin: "https://www.linkedin.com/in/deena-dawood-100569286/"
  },
  {
    id: "advitiya",
    name: "Advitiya Salluja",
    department: "MCSOCD",
    role: "Electronics Hardware & Power Systems",
    institution: "SRM Institute of Science and Technology",
    image: "/assets/team-advitiya.jpg",
    linkedin: "https://www.linkedin.com/in/advitiya-salluja?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gallery-1",
    image: "/assets/gallery-fabrication.jpg",
    title: "Structural Frame Fabrication",
    category: "Mechanical Workshop",
    caption: "Precision metal machining and angle grinding of aluminum extrusion struts for the 600×200×400mm modular gantry framework at SRMIST engineering workshops."
  },
  {
    id: "gallery-2",
    image: "/assets/gallery-code-dev.jpg",
    title: "Firmware & Microcontroller Setup",
    category: "Software & Electronics",
    caption: "Team 7 programmers flashing ESP32 dual-core firmware, establishing Bluetooth SPP handshakes, and calibrating keypad coordinate mapping routines."
  },
  {
    id: "gallery-3",
    image: "/assets/gallery-integration.jpg",
    title: "Subsystem Integration Session",
    category: "System Engineering",
    caption: "Collaborative hardware-in-the-loop review synchronizing the pneumatic 5/3 DCV valve manifolds with digital optical position telemetry."
  }
];

export const TECHNICAL_SPECS = [
  { label: "Actuation Medium", value: "Compressed Air (Dry, Filtered)" },
  { label: "Nominal Operating Pressure", value: "4.5 to 7.0 Bar (0.45 – 0.70 MPa)" },
  { label: "Y-Axis Vertical Travel", value: "600 mm Single Stroke (5/3 DCV Closed Center)" },
  { label: "X-Axis Horizontal Travel", value: "200 mm Dual Cylinder Balanced Gantry" },
  { label: "Z-Axis Reach Travel", value: "100 mm Inward/Outward Insertion Stroke" },
  { label: "End-Effector Type", value: "Pneumatic Dual-Contoured Angular Jaw Gripper" },
  { label: "Payload Capacity", value: "60 mm Cubes, Spherical Balls (Tennis Balls)" },
  { label: "Working Frame Dimensions", value: "600 mm (L) × 200 mm (D) × 400 mm (H)" },
  { label: "Frame Material", value: "High-Strength Modular Aluminum Extrusions" },
  { label: "Central Processing Unit", value: "ESP32 Tensilica Xtensa Dual-Core 240 MHz" },
  { label: "Operator Feedback", value: "16×2 Liquid Crystal Display (HD44780)" },
  { label: "Manual Input Interface", value: "4×4 Matrix Keypad with Debounce Logic" },
  { label: "Wireless Connectivity", value: "Bluetooth 4.2 BR/EDR & BLE" },
  { label: "Valve Driver Technology", value: "Optoisolated Solenoid Mosfet Driver Bank" },
  { label: "Environmental Safety", value: "Intrinsically Spark-Free Actuation Mechanism" }
];
