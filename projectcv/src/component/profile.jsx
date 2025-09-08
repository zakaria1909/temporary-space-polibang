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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
      <div className="flex-1 bg-black flex justify-center items-center min-h-screen p-8">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading education data...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return <div className="flex justify-center items-center min-h-screen">No profile data available.</div>;
  }

  const { name, address, phone, email, github, summary, image } = profileData;

  // Tentukan URL gambar
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `http://192.168.21.64${image}`
    : null;

  return (
    <div className="flex-1 bg-black text-white flex items-center justify-center min-h-screen px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        
        {/* Bagian Kiri: Teks */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Hi, I'm <span className="text-green-500">{name}</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold">
            Software Engineer <br /> FullStack | DevOps
          </h3>
          <p className="text-gray-400 leading-relaxed">{summary}</p>

          <div className="space-y-2 text-gray-300">
            <p>📍 {address}</p>
            <p>📞 {phone}</p>
            <p>📧 {email}</p>
          </div>

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-green-500 text-green-500 px-5 py-2 rounded-md hover:bg-green-500 hover:text-black transition"
            >
              Contact Me
            </a>
          )}
        </div>

        {/* Bagian Kanan: Gambar */}
        <div className="flex justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="profile"
              className="w-72 md:w-[520px] object-contain drop-shadow-2xl transform -scale-x-100"
            />
          )}
        </div>
      </div>
    </div>
  );
}
