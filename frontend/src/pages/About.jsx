import { useEffect, useState } from "react";

const teamMembers = [
  {
    name: "Khem Sovitou",
    role: "Software Engineer",
    image: "/team/vitou.jpg",
  },
  { name: "Ry Satya", role: "Software Engineer", image: "/team/satya.jpg" },
  {
    name: "Chhay Vansomanea",
    role: "Software Engineer",
    image: "/team/manea.jpg",
  },
  {
    name: "Dout Sophanha",
    role: "Software Engineer",
    image: "/team/phanha.jpg",
  },
  { name: "Sorn Soksophal", role: "Cyber Security", image: "/team/sophal.jpg" },
  {
    name: "Seng Silmeta",
    role: "Data Science and AI",
    image: "/team/meta.jpg",
  },
  {
    name: "Sok Sreynuth",
    role: "Data Science and AI",
    image: "/team/sreynut.jpg",
  },
  {
    name: "Hinsamrech Reajiny",
    role: "Data Science and AI",
    image: "/team/reajiny.jpg",
  },
];

function About() {
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowTeam(true), 300); // Delay for smooth fade-in
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 animate-fade-in">
          About Our Air Quality Mission
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're dedicated to predicting air pollution levels using advanced
          machine learning, empowering communities and policymakers to take
          proactive steps for a cleaner, healthier environment.
        </p>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Vision
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-center">
          Air pollution is a global challenge affecting millions. Our project
          leverages cutting-edge technology to forecast air quality, providing
          actionable insights to reduce environmental impact and protect public
          health.
        </p>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Meet Our Team
        </h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${
            showTeam ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
