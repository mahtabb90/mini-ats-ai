import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Layout({ session, children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-xl font-bold text-gray-800">
            Mini ATS
          </h1>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>

            <Link to="/jobs" className="text-gray-600 hover:text-blue-600">
              Jobs
            </Link>
            <Link to="/candidates" className="text-gray-600 hover:text-blue-600">
  Candidates
</Link>
           <Link to="/kanban" className="text-gray-600 hover:text-blue-600">
  Kanban
</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}