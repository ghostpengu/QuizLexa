"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Quiz({
  question,
  options,
  correctIndex,
  onAnswer,
  showResult,
}) {
  const [selected, setSelected] = useState(null);

  // 🔥 Reset selection whenever the question changes
  useEffect(() => {
    setSelected(null);
  }, [question]);

  const handleAnswer = (index) => {
    setSelected(index);
    if (onAnswer) {
      onAnswer(index);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {options.map((option, index) => {
          let extraClasses = "";

          if (showResult) {
            if (index === correctIndex) {
              extraClasses = "bg-green-500 text-white hover:bg-green-500";
            } else if (index === selected && index !== correctIndex) {
              extraClasses = "bg-red-500 text-white hover:bg-red-500";
            }
          } else if (selected === index) {
            extraClasses = "bg-blue-500 text-white hover:bg-blue-500";
          }

          return (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full justify-start text-left ${extraClasses}`}
              variant="outline"
            >
              {option}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
