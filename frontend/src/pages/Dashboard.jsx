import { useState, useEffect } from "react";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  };

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-white text-black"
      }
    >
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="mb-6">
          This is placeholder content.
        </p>

        <button
          onClick={toggleTheme}
          className="border px-4 py-2 rounded"
        >
          Toggle Theme
        </button>

      </div>
    </div>
  );
}

export default Dashboard;