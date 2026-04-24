import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function DashboardPage({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Logged in as: {session?.user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h2 className="font-semibold mb-2">Jobs</h2>
            <p className="text-sm text-gray-600">
              Manage open positions and hiring needs.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border">
            <h2 className="font-semibold mb-2">Candidates</h2>
            <p className="text-sm text-gray-600">
              Track candidate profiles and progress.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border">
            <h2 className="font-semibold mb-2">Kanban</h2>
            <p className="text-sm text-gray-600">
              View candidate pipeline by status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}