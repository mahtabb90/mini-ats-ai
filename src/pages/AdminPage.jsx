import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const [profiles, setProfiles] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

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

  const handleCreateCustomerProfile = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("profiles").insert({
      id: crypto.randomUUID(),
      full_name: fullName,
      email,
      role: "customer",
      company_name: companyName,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setFullName("");
    setEmail("");
    setCompanyName("");
    fetchProfiles();
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
          Create and manage customer profiles for the ATS platform.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Create customer profile
        </h2>

        <form onSubmit={handleCreateCustomerProfile} className="grid gap-4">
          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <button className="bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition">
            Create customer profile
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          MVP note: Customer login accounts are created in Supabase
          Authentication, while this panel manages customer profile records.
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