import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CandidatesPage({ session }) {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("Applied");

  const fetchJobs = async () => {
    const { data } = await supabase.from("jobs").select("*");
    setJobs(data || []);
  };

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from("candidates")
      .select("*, jobs(title)")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setCandidates(data || []);
  };

  const handleCreateCandidate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("candidates").insert({
      full_name: fullName,
      email,
      linkedin_url: linkedinUrl,
      notes,
      job_id: jobId,
      status, 
      created_by: session.user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setFullName("");
    setEmail("");
    setLinkedinUrl("");
    setNotes("");
    setJobId("");
    fetchCandidates();
  };

  useEffect(() => {
    fetchJobs();
    fetchCandidates();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Candidates</h1>
        <p className="text-gray-500 mt-2">
          Add candidates and connect them to open roles.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-gray-100">
        <form onSubmit={handleCreateCandidate} className="grid gap-4">
          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
            placeholder="Candidate full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
            placeholder="Candidate email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
            placeholder="LinkedIn URL"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
          <select
  className="border border-gray-200 rounded-xl px-4 py-3"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option>Applied</option>
  <option>Interview</option>
  <option>Offer</option>
  <option>Rejected</option>
</select>
          <select
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          >
            <option value="">Select job</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          <textarea
            className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
            placeholder="Profile notes / CV summary"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium shadow-md hover:scale-[1.02] hover:shadow-lg transition">
            Add candidate
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {candidate.full_name}
                </h2>
                <p className="text-gray-500">{candidate.email}</p>
                <p className="text-blue-600 font-medium mt-1">
                  Job: {candidate.jobs?.title || "No job selected"}
                </p>
              </div>

   <span
  className={`w-20 h-20 flex items-center justify-center rounded-full text-sm font-medium ${
    candidate.status === "Applied"
      ? "bg-gray-100 text-gray-700"
      : candidate.status === "Interview"
      ? "bg-blue-100 text-blue-700"
      : candidate.status === "Offer"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {candidate.status}
</span>
            </div>

            {candidate.linkedin_url && (
              <a
                href={candidate.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-blue-600 mt-4 hover:underline"
              >
                LinkedIn profile
              </a>
            )}

            <p className="text-gray-600 mt-3">{candidate.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}