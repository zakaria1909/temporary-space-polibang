// component/Education.jsx
import React, { useState, useEffect } from "react";

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEducationsFromAPI = async () => {
    try {
      const response = await fetch("http://192.168.21.64/api/profiles/2/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return Array.isArray(apiData.educations) ? apiData.educations : [];
    } catch (err) {
      throw new Error("Failed to fetch educations from API");
    }
  };

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        setLoading(true);
        const eduData = await fetchEducationsFromAPI();
        setEducations(eduData);
        setError(null);
      } catch (err) {
        console.error("Educations API Error:", err);
        setError("Failed to load education data from API");
        setEducations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

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
    <div className="flex-1 bg-black text-white flex justify-center items-center min-h-screen p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-teal-400 mb-10 text-center">
          Education
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-yellow-200/20 text-yellow-400 rounded text-sm text-center">
            {error}
          </div>
        )}

        {educations.length === 0 ? (
          <p className="text-gray-500 text-center">
            No education data available.
          </p>
        ) : (
          <div className="relative border-l-2 border-teal-600 pl-6 space-y-8">
            {educations.map((edu, index) => (
              <div key={edu.id} className="relative">
                {/* Dot */}
                <div className="absolute -left-3 top-2 w-5 h-5 bg-teal-500 rounded-full border-4 border-black shadow-lg"></div>

                {/* Card */}
                <div className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-md p-5 hover:shadow-teal-500/30 transition duration-300">
                  <h3 className="text-xl font-semibold text-teal-400">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-400">{edu.institution}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.start_year} - {edu.end_year}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-300 mt-2">
                      <span className="font-semibold text-white">GPA:</span>{" "}
                      {edu.gpa}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
