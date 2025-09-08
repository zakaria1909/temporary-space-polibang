// component/Projects.jsx
import React, { useState, useEffect, useRef } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const projectRefs = useRef({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://192.168.21.64/api/profiles/1/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData = await response.json();
        const projList = Array.isArray(apiData.projects) ? apiData.projects : [];
        setProjects(projList);
        setError(null);
        if (projList.length > 0) setActiveId(projList[0].id); // default aktif project pertama
      } catch (err) {
        console.error("Projects API Error:", err);
        setError("Failed to load projects from API");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleScrollToProject = (id) => {
    setActiveId(id);
    if (projectRefs.current[id]) {
      projectRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
    <div className="flex-1 bg-black text-white flex min-h-screen p-8 gap-8">
      {/* KIRI - Sidebar Judul Project */}
      <div className="w-1/3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-6">Projects</h2>
        <ul className="space-y-3">
          {projects.map((proj) => (
            <li key={proj.id}>
              <button
                onClick={() => handleScrollToProject(proj.id)}
                className={`text-left w-full px-4 py-2 rounded-md transition font-medium
                  ${activeId === proj.id ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"}`}
              >
                {proj.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* KANAN - Detail Project */}
      <div
        className="w-2/3 max-h-[80vh] overflow-y-auto pr-3 space-y-8
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-neutral-900
    [&::-webkit-scrollbar-thumb]:bg-green-500
    [&::-webkit-scrollbar-thumb]:rounded-full
    hover:[&::-webkit-scrollbar-thumb]:bg-teal-400
  "
      >
        {error && <div className="p-3 bg-yellow-200/20 text-yellow-400 rounded text-sm">{error}</div>}

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects available.</p>
        ) : (
          projects.map((proj) => (
            <div key={proj.id} ref={(el) => (projectRefs.current[proj.id] = el)} className="bg-neutral-900 border border-neutral-700 hover:border-green-500/50 rounded-xl shadow-lg p-6 transition">
              <h3 className="text-2xl font-bold text-green-400 mb-2">{proj.title}</h3>
              <p className="text-sm text-gray-400 mb-1">Semester {proj.semester}</p>
              <p className="text-gray-300 mb-4">{proj.description}</p>
              <p className="text-sm text-gray-400 mb-6">
                <span className="font-semibold text-white">Tech Stack:</span> {proj.tech_stack}
              </p>

              {/* Project Images */}
              <div
                className="flex gap-3 overflow-x-auto pb-2
            [&::-webkit-scrollbar]:h-2
            [&::-webkit-scrollbar-track]:bg-neutral-800
            [&::-webkit-scrollbar-thumb]:bg-green-600
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-teal-400
          "
              >
                {[proj.image1, proj.image2, proj.image3].filter(Boolean).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`project-${proj.id}-${idx}`}
                    className="h-36 w-auto rounded-lg border border-neutral-700 object-cover transform hover:scale-105 transition duration-300"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
