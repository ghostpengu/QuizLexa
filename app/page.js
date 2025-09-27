"use client";

import { useState, useEffect } from "react";
import Quiz from "@/components/quiz";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [lang, setLang] = useState("en");

  // Fetch questions from DB when page loads or language changes/ap
  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(`/api/questions?lang=${lang}`);
      const data = await res.json();
      setQuestions(data);
      setAnswers(Array(data.length).fill(null));
      setShowResult(false);
    }
    fetchQuestions();
  }, [lang]);

  const handleAnswer = (index, choice) => {
    const newAnswers = [...answers];
    newAnswers[index] = choice;
    setAnswers(newAnswers);
  };

  const checkQuiz = () => setShowResult(true);

  const totalCorrect = answers.reduce(
    (acc, answer, idx) =>
      questions[idx] && answer === questions[idx].correctIndex ? acc + 1 : acc,
    0,
  );
  const percentage = questions.length
    ? Math.round((totalCorrect / questions.length) * 100)
    : 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 gap-4">
      {/* Language Switcher */}
      <div className="flex gap-2 mb-4">
        {["en", "sk", "es"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-lg ${lang === l ? "bg-black text-white" : "bg-gray-300"}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Render all questions */}
      {questions.map((q, idx) => (
        <Quiz
          key={q.id}
          question={q.question}
          options={q.options}
          correctIndex={q.correctIndex}
          selected={answers[idx]}
          onAnswer={(choice) => handleAnswer(idx, choice)}
          showResult={showResult}
        />
      ))}

      <button
        onClick={checkQuiz}
        className="bg-black text-white px-4 py-2 rounded-lg mt-4"
      >
        {lang === "en"
          ? "Check Quiz"
          : lang === "sk"
            ? "Skontrolovať kvíz"
            : "Revisar Quiz"}
      </button>

      {showResult && (
        <div className="text-lg font-medium mt-2">
          {lang === "en" ? "Score" : lang === "sk" ? "Skóre" : "Puntaje"}:{" "}
          {totalCorrect}/{questions.length} ({percentage}%)
        </div>
      )}
    </main>
  );
}
