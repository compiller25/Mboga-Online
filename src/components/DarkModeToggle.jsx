import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Set initial mode based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  // Toggle manually
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <button onClick={toggleDarkMode} style={buttonStyle}>
      {darkMode ? "🌙 " : "☀️"}
    </button>
  );
}

// Simple inline button styling
const buttonStyle = {
  padding: "0.4rem 0.8rem",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  marginLeft: "1rem",
  fontWeight: "bold",
  backgroundColor: "#1abc9c",
  color: "#fff",
};