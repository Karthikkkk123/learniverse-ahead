
import { useState } from "react";
import { Check, X, HelpCircle, ChevronRight, ChevronLeft, Timer, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type QuizProps = {
  title: string;
  subject: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  onComplete?: (score: number, totalQuestions: number) => void;
};

export function QuizInterface({ title, subject, questions, timeLimit = 15, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit * 60); // in seconds
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleSelectAnswer = (value: string) => {
    const answerIndex = parseInt(value);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
  };
  
  const isAnswerCorrect = () => {
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    return selectedAnswer === currentQuestion.correctAnswer;
  };
  
  const isAnswered = () => {
    return selectedAnswers[currentQuestion.id] !== undefined;
  };
  
  const handleShowExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      // Calculate score
      const score = Object.entries(selectedAnswers).filter(
        ([questionId, answerIndex]) => {
          const question = questions.find((q) => q.id === parseInt(questionId));
          return question && answerIndex === question.correctAnswer;
        }
      ).length;
      
      setQuizCompleted(true);
      
      if (onComplete) {
        onComplete(score, questions.length);
      }
      
      // Show completion toast
      toast.success(`Quiz completed! You scored ${score}/${questions.length}`);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };
  
  const renderResults = () => {
    // Calculate score
    const correctAnswers = Object.entries(selectedAnswers).filter(
      ([questionId, answerIndex]) => {
        const question = questions.find((q) => q.id === parseInt(questionId));
        return question && answerIndex === question.correctAnswer;
      }
    ).length;
    
    const score = (correctAnswers / questions.length) * 100;
    const xpEarned = Math.floor(score);
    
    return (
      <Card className="w-full max-w-3xl mx-auto animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
            <Award className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">{correctAnswers}/{questions.length}</p>
            <p className="text-muted-foreground">Correct Answers</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Score</span>
              <span>{score.toFixed(0)}%</span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
          
          <div className="bg-secondary p-4 rounded-lg">
            <p className="font-medium text-center mb-2">XP Earned</p>
            <p className="text-2xl font-bold text-center text-primary">+{xpEarned} XP</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Time Spent</p>
              <p className="font-medium">{timeLimit - Math.floor(remainingTime / 60)} min</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Subject</p>
              <p className="font-medium">{subject}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  if (quizCompleted) {
    return renderResults();
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-slide-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground flex items-center">
            <BookOpen className="h-4 w-4 mr-1" /> {subject}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-secondary px-3 py-1 rounded-lg">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {Math.floor(remainingTime / 60)}:
            {remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <Progress value={progress} className="w-1/2 h-2" />
      </div>
      
      <Card className="w-full shadow-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-medium">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[currentQuestion.id]?.toString() || ""}
            onValueChange={handleSelectAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-all ${
                  showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : selectedAnswers[currentQuestion.id] === index
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : ""
                    : "hover:bg-secondary"
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showExplanation}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer py-2"
                >
                  {option}
                </Label>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {showExplanation &&
                  selectedAnswers[currentQuestion.id] === index &&
                  index !== currentQuestion.correctAnswer && (
                    <X className="h-5 w-5 text-red-500" />
                  )}
              </div>
            ))}
          </RadioGroup>
          
          {showExplanation && (
            <div className="mt-6 p-4 bg-secondary rounded-lg animate-slide-in">
              <p className="font-medium mb-2">Explanation:</p>
              <p className="text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            {isAnswered() && !showExplanation && (
              <Button
                variant="secondary"
                onClick={handleShowExplanation}
              >
                <HelpCircle className="h-4 w-4 mr-1" /> Explanation
              </Button>
            )}
          </div>
          
          <Button
            onClick={handleNextQuestion}
            disabled={!isAnswered()}
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              "Finish Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
