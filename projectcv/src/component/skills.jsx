// component/Skills.jsx
import React, { useState, useEffect } from "react";

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

  const categoryColors = {
    Programming: "bg-blue-100 text-blue-700",
    Frontend: "bg-green-100 text-green-700",
    Backend: "bg-purple-100 text-purple-700",
    "UI Framework": "bg-pink-100 text-pink-700",
    Database: "bg-yellow-100 text-yellow-700",
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
        <div className="space-y-2 w-full max-w-2xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex justify-center items-start min-h-screen p-8 pt-16">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl font-bold text-teal-600 mb-8">Skills</h2>

        {error && (
          <div className="mb-6 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
            {error}
          </div>
        )}

        {skills.length === 0 ? (
          <p className="text-gray-500 text-lg">No skills available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const colorClass = skill.category
                ? categoryColors[skill.category] || "bg-gray-100 text-gray-700"
                : "bg-gray-100 text-gray-700";
              return (
                <div
                  key={skill.id}
                  className={`p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 ${colorClass}`}
                >
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  {skill.category && (
                    <span className="text-sm mt-1 inline-block bg-white/30 px-2 py-1 rounded-full">
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
