import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export async function getQuestions(lang = "en") {
  const res = await pool.query(
    `
    SELECT q.id, q.correct_index,
           qt.question_text,
           qt.option1, qt.option2, qt.option3, qt.option4
    FROM questions q
    JOIN question_translations qt ON qt.question_id = q.id
    WHERE qt.language_code = $1
    ORDER BY q.id
  `,
    [lang],
  );

  return res.rows.map((row) => ({
    id: row.id,
    correctIndex: row.correct_index,
    question: row.question_text,
    options: [row.option1, row.option2, row.option3, row.option4],
  }));
}
