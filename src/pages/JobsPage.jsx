import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function JobsPage({ session }) {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setJobs(data);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("jobs").insert({
      title,
      company,
      description,
      created_by: session.user.id,
    });

    if (!error) {
      setTitle("");
      setCompany("");
      setDescription("");
      fetchJobs();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
  <p className="text-sm font-medium text-blue-600 mb-2">
    Job management
  </p>
  <h1 className="text-4xl font-bold text-gray-900">Jobs</h1>
  <p className="text-gray-500 mt-2">
    Create and manage open positions for your hiring pipeline.
  </p>
</div>

        {/* Form */}
        <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition border border-gray-100">
          <form onSubmit={handleCreateJob} className="grid gap-4">

            <input
              className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <textarea
              className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
              placeholder="Job description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-md hover:scale-[1.02] hover:shadow-lg transition">
              Create job
            </button>
          </form>
        </div>

        {/* Job list */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h2>

              <p className="text-blue-600 font-medium mt-1">
                {job.company}
              </p>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}