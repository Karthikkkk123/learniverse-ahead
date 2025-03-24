
import { Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NextQuizzes() {
  // Sample quiz data
  const quizzes = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      questions: 10,
      timeEstimate: "15 min",
      pointsAvailable: 100,
      dueIn: "2 days",
    },
    {
      id: 2,
      title: "Chemical Reactions Quiz",
      subject: "Chemistry",
      questions: 15,
      timeEstimate: "20 min",
      pointsAvailable: 150,
      dueIn: "Tomorrow",
    },
  ];

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Quizzes</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quizzes.map((quiz, index) => (
          <div 
            key={quiz.id} 
            className="glass-effect rounded-xl p-5 border animate-slide-in card-hover-effect" 
            style={{animationDelay: `${0.1 * (index + 1)}s`}}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground">{quiz.subject}</p>
              </div>
              <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                Due in {quiz.dueIn}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 my-3">
              <div className="flex items-center text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Points Available</p>
                  <p className="font-semibold">{quiz.pointsAvailable} XP</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time Estimate</p>
                  <p className="font-semibold">{quiz.timeEstimate}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-5">
              <Button className="w-full">
                Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
