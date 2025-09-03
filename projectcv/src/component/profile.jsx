// component/Profile.jsx
import React, { useState, useEffect } from "react";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://192.168.21.64/api/profiles/2/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-6">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-6">
        <p className="text-gray-500">No profile data available.</p>
      </div>
    );
  }

  const { name, address, phone, email, github, summary, image } = profileData;

  // Tentukan URL gambar
  const imageUrl = image
    ? image.startsWith("http") // full URL dari API
      ? image
      : `http://192.168.21.64${image}` // path dari API
    : null;

  return (
    <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-6">
      <div className="flex flex-col items-center text-center max-w-md">
        {error && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded text-sm w-full">
            {error}
          </div>
        )}

        {imageUrl && (
          <img
            src={imageUrl}
            alt="profile"
            className="w-40 h-40 rounded-full mb-4 shadow-md object-cover"
          />
        )}

        <h1 className="text-2xl font-bold text-teal-600">{name}</h1>
        <p className="text-gray-500">{address}</p>
        <p className="text-gray-500">{phone}</p>
        <p className="text-gray-500">{email}</p>

        <p className="text-gray-600 mb-4">{summary}</p>

        {github && (
          <div className="flex gap-4 mt-2">
            <a
              href={github}
              className="text-teal-600 hover:text-teal-800 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              💻 Github
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
