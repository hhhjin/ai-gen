"use server";

export const generateIdeogram = async (apiKey: string, body: string) => {
  const response = await fetch("https://api.ideogram.ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey,
    },
    body,
  });
  if (!response.ok) {
    throw new Error("Failed to generate ideogram");
  }
  return (await response.json()) as {
    created: string;
    data: {
      url: string;
    }[];
  };
};
