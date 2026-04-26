import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [profiles, setProfiles] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("customer");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setProfiles(data || []);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.functions.invoke("create-user", {
      body: {
        email,
        password,
        full_name: fullName,
        role,
        company_name: companyName,
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    if (data?.error) {
      setMessage(`Error: ${data.error}`);
      setLoading(false);
      return;
    }

    setMessage("User account created successfully.");

    setFullName("");
    setEmail("");
    setPassword("");
    setCompanyName("");
    setRole("customer");

    await fetchProfiles();
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600 mb-2">Admin</p>
        <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-500 mt-2">
          Create real login accounts for admins and customers.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Create user account
        </h2>

        <form onSubmit={handleCreateUser} className="grid gap-4">
          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Temporary password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <select
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer account</option>
            <option value="admin">Admin account</option>
          </select>

          <button
            disabled={loading}
            className="bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {message && (
          <p className="text-sm text-gray-600 mt-4">
            {message}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-4">
          This creates both a Supabase Authentication user and a profile record.
        </p>
      </div>

      <div className="grid gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                {profile.full_name}
              </h3>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <p className="text-sm text-blue-600 mt-1">
                {profile.company_name}
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
              {profile.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}