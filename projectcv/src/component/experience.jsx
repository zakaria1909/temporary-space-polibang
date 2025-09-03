import React from "react";

export default function Experience() {
  const data = [
    { title: "Experience 1", desc: "Deskripsi pengalaman 1" },
    { title: "Experience 2", desc: "Deskripsi pengalaman 2" },
    { title: "Experience 3", desc: "Deskripsi pengalaman 3" },
  ];

  return (
    <div className="flex-1 bg-white flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Experience
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-sm text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
