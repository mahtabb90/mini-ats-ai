import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export default function KanbanPage() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  const fetchData = async () => {
    const { data: jobsData } = await supabase.from("jobs").select("*");

    const { data: candidatesData, error } = await supabase
      .from("candidates")
      .select("*, jobs(title)")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setJobs(jobsData || []);
    setCandidates(candidatesData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesName = candidate.full_name
        ?.toLowerCase()
        .includes(nameFilter.toLowerCase());

      const matchesJob = jobFilter ? candidate.job_id === jobFilter : true;

      return matchesName && matchesJob;
    });
  }, [candidates, nameFilter, jobFilter]);

  const groupedCandidates = STATUSES.reduce((groups, status) => {
    groups[status] = filteredCandidates.filter(
      (candidate) => candidate.status === status
    );
    return groups;
  }, {});

  const updateStatus = async (candidateId, newStatus) => {
    const { error } = await supabase
      .from("candidates")
      .update({ status: newStatus })
      .eq("id", candidateId);

    if (error) {
      alert(error.message);
      return;
    }

    fetchData();
  };

  const getStatusStyle = (status) => {
    if (status === "Applied") return "bg-gray-100 text-gray-700";
    if (status === "Interview") return "bg-blue-100 text-blue-700";
    if (status === "Offer") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Kanban Board</h1>
        <p className="text-gray-500 mt-2">
          Track candidates through the recruitment pipeline.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 mb-8 grid gap-4 md:grid-cols-2">
        <input
          className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
          placeholder="Filter by candidate name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <select
          className="border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 outline-none transition"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
        >
          <option value="">All jobs</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">{status}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
                {groupedCandidates[status]?.length || 0}
              </span>
            </div>

            <div className="grid gap-4">
              {groupedCandidates[status]?.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                >
                  <h3 className="font-semibold text-gray-800">
                    {candidate.full_name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {candidate.email}
                  </p>

                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    {candidate.jobs?.title || "No job"}
                  </p>

                  {candidate.linkedin_url && (
                    <a
                      href={candidate.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 hover:underline inline-block mt-2"
                    >
                      LinkedIn
                    </a>
                  )}

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {candidate.notes}
                  </p>

                  <select
                    className="mt-4 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                    value={candidate.status}
                    onChange={(e) => updateStatus(candidate.id, e.target.value)}
                  >
                    {STATUSES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}