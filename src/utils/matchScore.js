export function calculateMatchScore(jobDescription = "", candidateNotes = "") {
  const keywords = [
    "python",
    "react",
    "sql",
    "api",
    "machine learning",
    "ai",
    "data",
    "javascript",
  ];

  let score = 0;
  let matches = [];

  const jobText = jobDescription.toLowerCase();
  const candidateText = candidateNotes.toLowerCase();

  keywords.forEach((word) => {
    if (jobText.includes(word) && candidateText.includes(word)) {
      score += 12;
      matches.push(word);
    }
  });

  if (score > 100) score = 100;

  let summary = "";

  if (matches.length === 0) {
    summary = "Low match: no strong keyword overlap.";
  } else {
    summary = `Matched skills: ${matches.join(", ")}`;
  }

  return {
    score,
    summary,
  };
}