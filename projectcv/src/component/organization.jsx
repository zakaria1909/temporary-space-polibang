// component/Organizations.jsx
import React, { useState, useEffect } from "react";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrganizationsFromAPI = async () => {
    try {
      const response = await fetch("http://192.168.21.64/api/profiles/2/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      return Array.isArray(apiData.organizations) ? apiData.organizations : [];
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
        setOrganizations([]); // kosong kalau API gagal
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Organizations</h2>

        {error && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm">
            {error}
          </div>
        )}

        {organizations.length === 0 ? (
          <p className="text-gray-500">No organizations available.</p>
        ) : (
          <div className="space-y-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="p-4 border border-teal-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-teal-700">
                  {org.role} - {org.organization}
                </h3>
                <p className="text-sm text-gray-500">{org.period}</p>
                <p className="text-gray-700 mt-2">{org.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
