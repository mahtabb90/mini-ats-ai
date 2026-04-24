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

    if (error) {
      alert(error.message);
      return;
    }

    setJobs(data);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("jobs").insert({
      title,
      company,
      description,
      created_by: session.user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setCompany("");
    setDescription("");
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Jobs</h1>

        <form onSubmit={handleCreateJob} className="grid gap-4 mb-8">
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <textarea
            className="border rounded-lg px-3 py-2"
            placeholder="Job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="bg-blue-600 text-white py-2 rounded-lg">
            Create job
          </button>
        </form>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <h2 className="font-bold text-xl">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}