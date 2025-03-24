
import { useState, useEffect } from "react";
import { Award, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function WelcomeHeader() {
  const [progress, setProgress] = useState(0);
  const xpPoints = 325;
  const level = 3;
  const nextLevelXp = 500;
  
  // Animate progress bar on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(Math.floor((xpPoints / nextLevelXp) * 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [xpPoints, nextLevelXp]);

  return (
    <div className="mb-8 animate-slide-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">
            Pick up where you left off with your personalized learning journey.
          </p>
        </div>
        <div className="mt-4 md:mt-0 glass-effect p-4 rounded-xl flex items-center space-x-4">
          <div className="bg-primary/10 rounded-full p-2">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Level {level}</span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {xpPoints} XP
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={progress} className="h-2 w-32" />
              <span className="text-xs text-muted-foreground">{nextLevelXp - xpPoints} XP to level {level + 1}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>3 lessons completed this week</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>2 quizzes aced</span>
        </div>
        <div className="badge-new flex items-center space-x-1 text-sm text-white bg-primary px-3 py-1 rounded-full">
          <span>New content available!</span>
        </div>
      </div>
    </div>
  );
}
