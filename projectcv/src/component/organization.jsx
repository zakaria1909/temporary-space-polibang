// component/Organizations.jsx
import React, { useState, useEffect } from "react";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrganizationsFromAPI = async () => {
    try {
      const response = await fetch("http://192.168.21.64/api/profiles/1/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return Array.isArray(apiData.organizations)
        ? apiData.organizations
        : [];
    } catch (err) {
      throw new Error("Failed to fetch organizations from API");
    }
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const orgData = await fetchOrganizationsFromAPI();
        setOrganizations(orgData);
        setError(null);
      } catch (err) {
        console.error("Organizations API Error:", err);
        setError("Failed to load organizations from API");
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-black flex justify-center items-center min-h-screen p-8">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black text-white flex justify-center items-center min-h-screen p-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-teal-400 mb-10 text-center">
          Organizations
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-yellow-200/20 text-yellow-400 rounded text-sm text-center">
            {error}
          </div>
        )}

        {organizations.length === 0 ? (
          <p className="text-gray-500 text-center">
            No organizations available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="relative bg-neutral-900 border border-neutral-700 rounded-lg shadow-md p-5 pl-6 hover:shadow-teal-500/30 transition duration-300"
              >
                {/* Accent line di kiri */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-400 to-green-500 rounded-l-lg"></div>

                <h3 className="text-lg font-semibold text-white">
                  {org.role}
                </h3>
                <p className="text-sm text-teal-400 font-medium">
                  {org.organization}
                </p>
                <p className="text-xs text-gray-500 mt-1 italic">
                  {org.period}
                </p>
                <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                  {org.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
