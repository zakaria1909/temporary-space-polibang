import { User, Briefcase, BookOpen, Users, Wrench } from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={22} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={22} /> },
    { id: "education", label: "Education", icon: <BookOpen size={22} /> },
    { id: "organization", label: "Organization", icon: <Users size={22} /> },
    { id: "skills", label: "Skills", icon: <Wrench size={22} /> },
  ];

  return (
    <div className="w-16 h-screen bg-neutral-900 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-green-500">Z</div>
        <span className="text-xs text-gray-200">Zaka</span>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-6 mt-6 justify-center items-center flex-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`hover:scale-110 transition-transform ${
              active === item.id ? "text-yellow-400" : "text-gray-400"
            }`}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
