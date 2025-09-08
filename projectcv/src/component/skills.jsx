// component/Skills.jsx
import React, { useState, useEffect } from "react";
import { Code, Monitor, Database, Layout, Server } from "lucide-react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkillsFromAPI = async () => {
    try {
      const response = await fetch("http://192.168.21.64/api/profiles/2/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return Array.isArray(apiData.skills) ? apiData.skills : [];
    } catch (err) {
      throw new Error("Failed to fetch skills from API");
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const skillsData = await fetchSkillsFromAPI();
        setSkills(skillsData);
        setError(null);
      } catch (err) {
        console.error("Skills API Error:", err);
        setError("Failed to load skills from API");
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categoryStyles = {
    Programming: {
      bg: "from-blue-500/20 to-blue-700/20 border-blue-500/30",
      text: "text-blue-400",
      icon: <Code className="w-6 h-6 text-blue-400" />,
    },
    Frontend: {
      bg: "from-green-500/20 to-green-700/20 border-green-500/30",
      text: "text-green-400",
      icon: <Monitor className="w-6 h-6 text-green-400" />,
    },
    Backend: {
      bg: "from-purple-500/20 to-purple-700/20 border-purple-500/30",
      text: "text-purple-400",
      icon: <Server className="w-6 h-6 text-purple-400" />,
    },
    "UI Framework": {
      bg: "from-pink-500/20 to-pink-700/20 border-pink-500/30",
      text: "text-pink-400",
      icon: <Layout className="w-6 h-6 text-pink-400" />,
    },
    Database: {
      bg: "from-yellow-500/20 to-yellow-700/20 border-yellow-500/30",
      text: "text-yellow-400",
      icon: <Database className="w-6 h-6 text-yellow-400" />,
    },
  };

  if (loading) {
    return (
      <div className="flex-1 bg-black flex justify-center items-center min-h-screen p-8">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading education data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-neutral-900 flex justify-center items-start min-h-screen p-8 pt-16">
      <div className="max-w-5xl w-full text-center">
        <h2 className="text-4xl font-extrabold text-teal-400 mb-12 tracking-wide">
          ⚡ My Skills
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-yellow-900/40 text-yellow-300 rounded text-sm border border-yellow-500/40">
            {error}
          </div>
        )}

        {skills.length === 0 ? (
          <p className="text-gray-400 text-lg">No skills available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {skills.map((skill, i) => {
              const style =
                skill.category && categoryStyles[skill.category]
                  ? categoryStyles[skill.category]
                  : {
                      bg: "from-gray-600/20 to-gray-800/20 border-gray-500/30",
                      text: "text-gray-300",
                      icon: <Code className="w-6 h-6 text-gray-300" />,
                    };
   
              return (
                <div
                  key={skill.id}
                  className={`relative p-6 rounded-2xl shadow-lg border backdrop-blur-md bg-gradient-to-br ${style.bg} ${style.text}
                    transform hover:-translate-y-2 hover:scale-[1.02] transition duration-300 ease-out
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    {style.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  {skill.category && (
                    <span className="text-sm mt-2 inline-block bg-white/10 px-3 py-1 rounded-full">
                      {skill.category}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
