"use client";

import { useState } from "react";
import Quiz from "@/components/quiz";

// Questions translated in 3 languages
const questionsData = [
  {
    question: {
      en: "What is the capital of France?",
      sk: "Aké je hlavné mesto Francúzska?",
      es: "¿Cuál es la capital de Francia?",
    },
    options: {
      en: ["Berlin", "Madrid", "Paris", "Rome"],
      sk: ["Berlín", "Madrid", "Paríž", "Rím"],
      es: ["Berlín", "Madrid", "París", "Roma"],
    },
    correctIndex: 2,
  },
  {
    question: {
      en: "Which planet is known as the Red Planet?",
      sk: "Ktorá planéta je známa ako Červená planéta?",
      es: "¿Qué planeta es conocido como el Planeta Rojo?",
    },
    options: {
      en: ["Venus", "Mars", "Jupiter", "Mercury"],
      sk: ["Venuša", "Mars", "Jupiter", "Merkúr"],
      es: ["Venus", "Marte", "Júpiter", "Mercurio"],
    },
    correctIndex: 1,
  },
  {
    question: {
      en: "What is the largest ocean on Earth?",
      sk: "Aký je najväčší oceán na Zemi?",
      es: "¿Cuál es el océano más grande de la Tierra?",
    },
    options: {
      en: ["Atlantic", "Indian", "Arctic", "Pacific"],
      sk: ["Atlantský", "Indický", "Severný ľadový", "Pacifický"],
      es: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    },
    correctIndex: 3,
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState(
    Array(questionsData.length).fill(null),
  );
  const [showResult, setShowResult] = useState(false);
  const [lang, setLang] = useState("en"); // default language

  const handleAnswer = (index, choice) => {
    const newAnswers = [...answers];
    newAnswers[index] = choice;
    setAnswers(newAnswers);
  };

  const checkQuiz = () => setShowResult(true);

  const totalCorrect = answers.reduce(
    (acc, answer, idx) =>
      answer === questionsData[idx].correctIndex ? acc + 1 : acc,
    0,
  );
  const percentage =
    questionsData.length > 0
      ? Math.round((totalCorrect / questionsData.length) * 100)
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
      {questionsData.map((q, idx) => (
        <Quiz
          key={idx}
          question={q.question[lang]}
          options={q.options[lang]}
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
          {totalCorrect}/{questionsData.length} ({percentage}%)
        </div>
      )}
    </main>
  );
}
