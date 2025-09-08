import React, { useState } from "react";
import Sidebar from "./component/sidebar";
import Profile from "./component/profile";
import Projects from "./component/project";
import Education from "./component/education";
import Organization from "./component/organization";
import Skills from "./component/skills";

export default function App() {
  const [active, setActive] = useState("profile"); // default kecil semua

  const renderContent = () => {
    switch (active) {
      case "education":
        return <Education />;
      case "organization":
        return <Organization />;
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 ">{renderContent()}</div>
    </div>
  );
}
