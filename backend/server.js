const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const db = require("better-sqlite3")("../backend/scraper.db");

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

db.prepare(
  `
CREATE TABLE IF NOT EXISTS analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    summary TEXT,
    recommendation TEXT 
)
`,
).run();

// db.prepare(`
// INSERT INTO analysis (summary, recommendation)
// VALUES ('This is a test summary', 'This is a test recommendation')
// `).run()

app.use(cors());
app.use(express.json());

app.get("/scraper", (req, res) => {
  const rows = db.prepare(`SELECT * FROM analysis`).all();
  console.log("DATA:", rows);
  res.json(rows);
});

app.post("/scraper", async (req, res) => {
  try {
    const stockData = req.body.data;

    console.log(stockData);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You are a financial assistant. Given this stock data: ${stockData} Reply in this exact format: 
          Summary: one or two simple sentences. 
          Recommendation: Yes or No.
          Reason: two simple sentences explaining why.
`,
        },
      ],
    });

    const result = response.choices[0].message.content;
    console.log("AI RESULT:", result);

    res.json({ result });
  } catch (error) {
    //console.error(error);
    console.error("FULL ERROR:", error);
    console.error("MESSAGE:", error.message);
    console.error("STATUS:", error.status);
    console.error("CODE:", error.code);
    res.status(500).json({ error: "Error analyzing stock" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
