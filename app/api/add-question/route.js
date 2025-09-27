import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export async function POST(req) {
  try {
    const { question, options, correctIndex, secret } = await req.json();
    console.log(secret);
    if (secret !== process.env.SECRET) {
      return new Response(JSON.stringify("error"), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const questionRes = await pool.query(
      `INSERT INTO questions (correct_index) VALUES ($1) RETURNING id`,
      [correctIndex],
    );
    const questionId = questionRes.rows[0].id;

    // 2️⃣ Insert translations for each language
    const languages = ["en", "sk", "es"];
    for (let lang of languages) {
      await pool.query(
        `INSERT INTO question_translations
           (question_id, language_code, question_text, option1, option2, option3, option4)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          questionId,
          lang,
          question[lang],
          options[lang][0],
          options[lang][1],
          options[lang][2],
          options[lang][3],
        ],
      );
    }

    return new Response(JSON.stringify({ success: true, questionId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to add question" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
