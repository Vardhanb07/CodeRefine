export async function analyzeCode({ code, language, mode = "full", instruction = "" }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, language, mode, instruction })
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}
