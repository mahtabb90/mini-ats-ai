import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { calculateMatchScore } from "../utils/matchScore";

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
      .select("*, jobs(title, description)")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setCandidates(data || []);
  };

  const handleDeleteCandidate = async (candidateId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("candidates")
      .delete()
      .eq("id", candidateId);

    if (error) {
      alert(error.message);
      return;
    }

    fetchCandidates();
  };

  const handleCreateCandidate = async (e) => {
    e.preventDefault();

    const selectedJob = jobs.find((job) => job.id === jobId);

    const aiResult = calculateMatchScore(
      selectedJob?.description || "",
      notes
    );

    const { error } = await supabase.from("candidates").insert({
      full_name: fullName,
      email,
      linkedin_url: linkedinUrl,
      notes,
      job_id: jobId,
      status,
      created_by: session.user.id,
      ai_score: aiResult.score,
      ai_summary: aiResult.summary,
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
    setStatus("Applied");
    fetchCandidates();
  };

  useEffect(() => {
    fetchJobs();
    fetchCandidates();
  }, []);

  const getStatusStyle = (candidateStatus) => {
    if (candidateStatus === "Applied") return "bg-gray-100 text-gray-700";
    if (candidateStatus === "Interview") return "bg-blue-100 text-blue-700";
    if (candidateStatus === "Offer") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

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
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {candidate.full_name}
                </h2>

                <p className="text-gray-500">{candidate.email}</p>

                <p className="text-blue-600 font-medium mt-1">
                  Job: {candidate.jobs?.title || "No job selected"}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <span
                  className={`w-20 h-20 flex items-center justify-center rounded-full text-sm font-medium text-center ${getStatusStyle(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </span>

                <button
                  onClick={() => handleDeleteCandidate(candidate.id)}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 bg-purple-50 border border-purple-100 rounded-2xl p-3">
              <p className="text-sm font-semibold text-purple-700">
                AI Match Score: {candidate.ai_score ?? 0}/100
              </p>
              <p className="text-sm text-purple-600 mt-1">
                {candidate.ai_summary || "No AI summary available"}
              </p>
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