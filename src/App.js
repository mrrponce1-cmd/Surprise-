import React, { useState } from "react";
import BirthdayHeader from "./components/BirthdayHeader";
import Gallery from "./components/Gallery";
import BirthdayMessage from "./components/BirthdayMessage";
import Navigation from "./components/Navigation";

function App() {
  const [section, setSection] = useState("header");

  return (
    <div>
      <Navigation setSection={setSection} />
      {section === "header" && <BirthdayHeader />}
      {section === "gallery" && <Gallery />}
      {section === "message" && <BirthdayMessage />}
    </div>
  );
}

export default App;
