import React, { useState } from "react";

const yogaPoses = [
  {
    id: 1,
    name: "Mountain Pose (Tadasana)",
    image: "/components/audio/yoga/mountain-pose.jpg",
    description: "Stand tall with feet together, ground through your feet, engage your thighs, lengthen your spine, and relax your shoulders.",
    details: "Improves posture, balance, and promotes mental clarity."
  },
  {
    id: 2,
    name: "Downward Dog (Adho Mukha Svanasana)",
    image: "/components/audio/yoga/downward-dog.jpg",
    description: "Start on your hands and knees, lift your hips, push through your hands and feet to form an inverted V, and relax your neck.",
    details: "Stretches the back and legs while reducing tension."
  },
  {
    id: 3,
    name: "Warrior I (Virabhadrasana I)",
    image: "/components/audio/yoga/warrior1.jpg",
    description: "Step one foot back, bend your front knee, raise your arms overhead, and square your hips forward.",
    details: "Builds strength in the legs and core while opening the chest."
  },
  {
    id: 4,
    name: "Warrior II (Virabhadrasana II)",
    image: "/components/audio/yoga/warrior2.jpg",
    description: "Step one foot back, extend your arms, bend your front knee, and gaze over your front hand.",
    details: "Enhances balance and stability, and opens the hips and chest."
  },
  {
    id: 5,
    name: "Tree Pose (Vrksasana)",
    image: "/components/audio/yoga/tree-pose.jpg",
    description: "Stand on one leg, place the opposite foot on your inner thigh, bring your hands to your heart, and focus on a fixed point.",
    details: "Improves balance and concentration while strengthening the legs."
  },
  {
    id: 6,
    name: "Child's Pose (Balasana)",
    image: "/components/audio/yoga/childs-pose.jpg",
    description: "Kneel, sit back on your heels, lean forward and extend your arms, resting your forehead on the ground.",
    details: "Relieves stress and gently stretches the back and shoulders."
  },
  {
    id: 7,
    name: "Bridge Pose (Setu Bandha Sarvangasana)",
    image: "/components/audio/yoga/bridge-pose.jpg",
    description: "Lie on your back, bend your knees, place your feet on the floor, lift your hips, and clasp your hands under your back.",
    details: "Opens the chest and strengthens the back while improving circulation."
  },
  {
    id: 8,
    name: "Cobra Pose (Bhujangasana)",
    image: "/components/audio/yoga/cobra-pose.jpg",
    description: "Lie on your stomach, place your hands under your shoulders, and gently lift your chest while keeping your elbows close.",
    details: "Strengthens the spine and alleviates stress, promoting an open heart."
  },
  {
    id: 9,
    name: "Seated Forward Bend (Paschimottanasana)",
    image: "/components/audio/yoga/seated-forward-bend.jpg",
    description: "Sit with your legs extended, hinge from your hips, and reach toward your feet while keeping your spine long.",
    details: "Calms the mind, stretches the back and legs, and encourages introspection."
  }
];

interface YogaPose {
  id: number;
  name: string;
  image: string;
  description: string;
  details: string;
}

function YogaCard({ pose }: { pose: YogaPose }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-64 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col items-center justify-center p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={pose.image} alt={pose.name} className="w-full h-40 object-cover rounded-md mb-2" />
          <h3 className="text-xl font-bold text-gray-800 text-center">{pose.name}</h3>
        </div>
        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-white border border-gray-300 rounded-lg transform rotate-y-180 p-2 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h4 className="text-lg font-semibold text-gray-800 text-center mb-1">How to do it:</h4>
          <p className="text-gray-700 text-center text-sm">{pose.description}</p>
          <h4 className="text-lg font-semibold text-gray-800 text-center mt-2">Benefits:</h4>
          <p className="text-gray-700 text-center text-sm">{pose.details}</p>
        </div>
      </div>
    </div>
  );
}

export default function YogaPoseGuide() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">Yoga Pose Guide</h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        Discover 9 effective yoga postures to improve your physical and mental well-being.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {yogaPoses.map((pose) => (
          <YogaCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
  );
}
