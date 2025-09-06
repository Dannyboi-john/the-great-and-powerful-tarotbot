export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cardData, position, positionIndex, spreadType, queryData } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 170,
        messages: [
          {
            role: "system",
            content: `You are a master tarot card reader who has been tasked to give a very brief 3-card tarot reading (${spreadType}), with the following query: "${queryData}"`,
          },
          {
            role: "user",
            content: `I have drawn ${cardData.name} to represent the "${position}" position. Please explain briefly what that might mean.`,
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      content: data.choices?.[0]?.message?.content || "No response",
      positionIndex,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}