import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">
          MyApp
        </h1>

        <div className="flex flex-wrap gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>

        <div>
          👤
        </div>
      </div>
    </nav>
  );
}

export default Navbar;