"use client";

import { useState } from "react";
import Cookies from "js-cookie";
export default function AdminPage() {
  const [question, setQuestion] = useState({ en: "", sk: "", es: "" });
  const [options, setOptions] = useState({
    en: ["", "", "", ""],
    sk: ["", "", "", ""],
    es: ["", "", "", ""],
  });
  const [correctIndex, setCorrectIndex] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let secret = Cookies.get("pass");
      const res = await fetch("/api/add-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          options,
          correctIndex,
          secret: secret,
        }),
      });
      if (!res.ok) throw new Error("Failed to add question");
      setMessage("Question added successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error adding question.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Add Quiz Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["en", "sk", "es"].map((lang) => (
          <div key={lang}>
            <label className="font-bold">Question ({lang})</label>
            <input
              type="text"
              value={question[lang]}
              onChange={(e) =>
                setQuestion({ ...question, [lang]: e.target.value })
              }
              className="w-full border px-2 py-1"
              required
            />
          </div>
        ))}

        {["en", "sk", "es"].map((lang) => (
          <div key={lang}>
            <label className="font-bold">Options ({lang})</label>
            {options[lang].map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOpts = [...options[lang]];
                  newOpts[i] = e.target.value;
                  setOptions({ ...options, [lang]: newOpts });
                }}
                className="w-full border px-2 py-1 my-1"
                placeholder={`Option ${i + 1}`}
                required
              />
            ))}
          </div>
        ))}

        <div>
          <label className="font-bold">Correct Option Index (0-3)</label>
          <input
            type="number"
            min={0}
            max={3}
            value={correctIndex}
            onChange={(e) => setCorrectIndex(Number(e.target.value))}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Question
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
