// component/Projects.jsx
import React, { useState, useEffect } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjectsFromAPI = async () => {
    try {
      const response = await fetch("http://192.168.21.64/api/profiles/2/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return Array.isArray(apiData.projects) ? apiData.projects : [];
    } catch (err) {
      throw new Error("Failed to fetch projects from API");
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projData = await fetchProjectsFromAPI();
        setProjects(projData);
        setError(null);
      } catch (err) {
        console.error("Projects API Error:", err);
        setError("Failed to load projects from API");
        setProjects([]); // kosong kalau API gagal
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Projects</h2>

        {error && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
              >
                <h3 className="text-xl font-semibold text-teal-700">{proj.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Semester {proj.semester}</p>
                <p className="text-gray-700 mb-3">{proj.description}</p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Tech Stack:</span> {proj.tech_stack}
                </p>

                {/* Project Images */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[proj.image1, proj.image2, proj.image3]
                    .filter(Boolean)
                    .map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`project-${proj.id}-${idx}`}
                        className="h-32 w-auto rounded-md border object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
