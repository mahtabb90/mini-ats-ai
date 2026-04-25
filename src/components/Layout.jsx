import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition ${
      location.pathname === path
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Mini ATS</h1>
              <p className="text-xs text-gray-500">AI-powered hiring workflow</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/jobs" className={navLinkClass("/jobs")}>
              Jobs
            </Link>
            <Link to="/candidates" className={navLinkClass("/candidates")}>
              Candidates
            </Link>
            <Link to="/kanban" className={navLinkClass("/kanban")}>
              Kanban
            </Link>

            <Link to="/admin" className={navLinkClass("/admin")}>
              Admin
            </Link>

            <button
              onClick={handleLogout}
              className="ml-3 bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-700 transition shadow-sm"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}