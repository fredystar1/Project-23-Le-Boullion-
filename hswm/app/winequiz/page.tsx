/**
 * Wine Quiz page — `/winequiz`
 *
 * An interactive, multi-step questionnaire that helps users discover
 * wine styles and regions matching their taste preferences.  The quiz
 * follows a tree structure: each answer either advances to a new
 * question or ends the quiz.
 *
 * This is a **client component** (`"use client"`) because it manages
 * the current question index and quiz-completion state via React hooks.
 *
 * @module pages/winequiz
 */

"use client";

import { useState } from "react";

/**
 * Represents a single answer option within a question.
 */
type Option = {
  /** Display label for the option button. */
  label: string;
  /**
   * Index of the next question to navigate to.
   * When `undefined`, selecting this option ends the quiz.
   */
  next?: number;
};

/**
 * Represents a single page / step in the quiz.
 */
type QuestionPage = {
  /** The question text displayed to the user. */
  question: string;
  /** Available answer options. */
  options: Option[];
};

/**
 * Static quiz data defining the question tree.
 *
 * The tree is stored as a flat array indexed by question number.
 * Each option's `next` field points to the index of the follow-up
 * question (or is omitted to signal quiz completion).
 *
 * Flow overview:
 * - **Q0** — Style preference → branches to White (Q1), Red (Q2),
 *   Rose (Q3), or terminates (Sparkling / Wildcard).
 * - **Q1–Q3** — Quality preferences → branches to region questions.
 * - **Q4–Q11** — Region selection → all terminal (no `next`).
 */
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

/**
 * Interactive wine quiz page component.
 *
 * State:
 * - `current` — index of the currently displayed question.
 * - `showResult` — `true` once the quiz is complete (no more questions).
 *
 * @returns The quiz UI with question display, option buttons, and a
 *          completion / restart screen.
 */
export default function WineQuizPage() {
	const [current, setCurrent] = useState(0);
	const [showResult, setShowResult] = useState(false);
  
	/**
	 * Handle an answer selection.
	 *
	 * If the selected option has a valid `next` index, advance to that
	 * question; otherwise mark the quiz as complete.
	 *
	 * @param option - The option the user clicked.
	 */
	const handleAnswer = (option: Option) => {
	  if (option.next !== undefined && questionPages[option.next]) {
		setCurrent(option.next);
	  } else {
		setShowResult(true);
	  }
	};
  
	/** Reset quiz state back to the first question. */
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