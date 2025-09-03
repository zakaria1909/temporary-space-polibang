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
        setEducations([]); // kosong kalau API gagal
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading education data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Education</h2>

        {error && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
            {error}
          </div>
        )}

        {educations.length === 0 ? (
          <p className="text-gray-500">No education data available.</p>
        ) : (
          <div className="space-y-4">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="p-4 border border-teal-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-teal-700">
                  {edu.degree}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{edu.institution}</p>
                <p className="text-sm text-gray-600">
                  {edu.start_year} - {edu.end_year}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">GPA:</span> {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
