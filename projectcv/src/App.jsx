import React, { useState } from "react";
import Sidebar from "./component/sidebar";
import Profile from "./component/profile";
import Projects from "./component/project";
import Education from "./component/education";
import Organization from "./component/organization";
import Skills from "./component/skills";

export default function App() {
  const [active, setActive] = useState("Home");

  const renderContent = () => {
    switch (active) {
      case "Education":
        return <Education />;
      case "Organization":
        return <Organization />;
      case "Skills":
        return <Skills />; 
      case "Projects":
        return <Projects />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
}