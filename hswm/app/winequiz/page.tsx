"use client";

import { useState } from "react";

type Option = {
  label: string;
  next?: number; // if undefined → quiz ends
};

type QuestionPage = {
  question: string;
  options: Option[];
};

const questionPages: QuestionPage[] = [
  {
    question: "What is your favorite style of wine?",
    options: [
      { label: "White", next: 1 },
      { label: "Red", next: 2 },
      { label: "Sparkling", next: 12 }, // ends
      { label: "Rose", next: 3 },
      { label: "Wildcard", next: 12 }, // ends
    ],
  },
  {
    question: "What qualities are you looking for?",
    options: [
      { label: "Clean & Mineral", next: 4 },
      { label: "Texture & Intensity", next: 5 },
      { label: "Aromatic & Acidic", next: 6 },
    ],
  },
  {
    question: "What qualities are you looking for?",
    options: [
      { label: "Elegant & Aromatic", next: 7 },
      { label: "Balanced & Fresh", next: 8 },
      { label: "Intensity & Power", next: 9 },
    ],
  },
  {
    question: "What qualities are you looking for?",
    options: [
      { label: "Easy & Refreshing", next: 10 },
      { label: "Complex & Intense", next: 11 },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Austria" },
      { label: "Burgundy" },
      { label: "Loire" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Bordeaux" },
      { label: "Rhone" },
      { label: "California" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Alsace" },
      { label: "Northern Italy" },
      { label: "Germany" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Burgundy" },
      { label: "Pacific Northwest United States" },
      { label: "Eastern France" },
      { label: "Northern Italy" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Loire Valley" },
      { label: "Rhone Valley" },
      { label: "Southern France" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Bordeaux" },
      { label: "Northern Spain" },
      { label: "California" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Pacific Northwest United States" },
      { label: "Northern Spain" },
    ],
  },
  {
    question: "Which Region?",
    options: [
      { label: "Southern France" },
      { label: "Southern Italy" },
    ],
  },
];

export default function WineQuizPage() {
	const [current, setCurrent] = useState(0);
	const [showResult, setShowResult] = useState(false);
  
	const handleAnswer = (option: Option) => {
	  if (option.next !== undefined && questionPages[option.next]) {
		setCurrent(option.next);
	  } else {
		setShowResult(true);
	  }
	};
  
	const restartQuiz = () => {
	  setCurrent(0);
	  setShowResult(false);
	};
  
	const currentQuestion = questionPages[current];
  
	return (
		<div className="flex-1 flex items-center justify-center bg-gradient-to-br from-red-50 to-purple-100 p-6">
		<div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full">
		  {!showResult ? (
			<>
			  <h1 className="text-2xl font-bold mb-4 text-center">
				🍷 Wine Quiz
			  </h1>
  
			  <h2 className="text-lg font-semibold mb-4">
				{currentQuestion.question}
			  </h2>
  
			  <div className="space-y-3">
				{currentQuestion.options.map((option, index) => (
				  <button
					key={index}
					onClick={() => handleAnswer(option)}
					className="w-full px-4 py-2 rounded-lg border transition hover:bg-purple-50"
				  >
					{option.label}
				  </button>
				))}
			  </div>
			</>
		  ) : (
			<div className="text-center">
			  <h1 className="text-2xl font-bold mb-4">
				🎉 Quiz Complete!
			  </h1>
			  <button
				onClick={restartQuiz}
				className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
			  >
				Restart Quiz
			  </button>
			</div>
		  )}
		</div>
	  </div>
	);
  }