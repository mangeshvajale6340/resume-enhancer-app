import React, { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState({
    name: "John Doe",
    summary: "Experienced developer...",
    education: "B.Sc Computer Science",
    experience: "2 years at XYZ",
    skills: "React, Node.js"
  });

  const handleChange = (key, value) => {
    setResume({ ...resume, [key]: value });
  };

  const enhanceSection = async (section) => {
    const res = await axios.post("http://localhost:8000/ai-enhance", {
      section,
      content: resume[section],
    });
    setResume({ ...resume, [section]: res.data.enhanced_content });
  };

  const saveResume = async () => {
    await axios.post("http://localhost:8000/save-resume", { resume });
    alert("Resume saved!");
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.json";
    link.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Resume Enhancer</h1>
      {Object.keys(resume).map((key) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <label>{key.toUpperCase()}</label>
          <textarea
            value={resume[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            rows={2}
            style={{ width: "100%" }}
          />
          <button onClick={() => enhanceSection(key)}>
            Enhance with AI
          </button>
        </div>
      ))}
      <button onClick={saveResume}>Save Resume</button>
      <button onClick={downloadResume} style={{ marginLeft: 10 }}>Download JSON</button>
    </div>
  );
}

export default App;
