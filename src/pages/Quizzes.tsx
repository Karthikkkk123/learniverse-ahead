
import { useEffect } from "react";
import { QuizInterface } from "@/components/quiz/QuizInterface";

const Quizzes = () => {
  useEffect(() => {
    document.title = "Quizzes | AI Tutor";
  }, []);

  // Sample quiz data
  const mathQuiz = {
    title: "Algebra Fundamentals Quiz",
    subject: "Mathematics",
    questions: [
      {
        id: 1,
        question: "Solve for x: 3x + 5 = 20",
        options: ["x = 3", "x = 5", "x = 7", "x = 15"],
        correctAnswer: 1,
        explanation: "To solve for x, subtract 5 from both sides: 3x = 15. Then divide both sides by 3: x = 5."
      },
      {
        id: 2,
        question: "What is the value of y in the equation y = 2x + 3 when x = 4?",
        options: ["y = 7", "y = 8", "y = 11", "y = 14"],
        correctAnswer: 2,
        explanation: "Substitute x = 4 into the equation: y = 2(4) + 3 = 8 + 3 = 11."
      },
      {
        id: 3,
        question: "Factor the expression: x² - 9",
        options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "(x+3)²"],
        correctAnswer: 0,
        explanation: "This is a difference of squares: x² - 9 = x² - 3². The factorization is (x-3)(x+3)."
      },
      {
        id: 4,
        question: "What is the slope of the line passing through points (2, 3) and (4, 7)?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        explanation: "The slope formula is (y₂-y₁)/(x₂-x₁). So, slope = (7-3)/(4-2) = 4/2 = 2."
      },
      {
        id: 5,
        question: "If f(x) = 2x² - 3x + 1, what is f(2)?",
        options: ["3", "5", "7", "9"],
        correctAnswer: 1,
        explanation: "f(2) = 2(2)² - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3."
      }
    ]
  };

  return (
    <div className="py-6">
      <QuizInterface 
        title={mathQuiz.title} 
        subject={mathQuiz.subject} 
        questions={mathQuiz.questions} 
        timeLimit={20}
      />
    </div>
  );
};

export default Quizzes;
