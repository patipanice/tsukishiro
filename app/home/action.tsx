"use server";

export const getQuotes = async () => {
    const category = "happiness";
    const res = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=" + category,
      {
        headers: {
          "X-Api-Key": String(process.env.NEXT_PUBLIC_NINJA_API_KEY),
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  