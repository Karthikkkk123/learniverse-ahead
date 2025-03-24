
import { useState, useEffect } from "react";
import { ChevronRight, Clock, ArrowUpRight, Layers, Zap } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function LearningProgress() {
  const [mathProgress, setMathProgress] = useState(0);
  const [scienceProgress, setScienceProgress] = useState(0);
  const [historyProgress, setHistoryProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMathProgress(75);
      setScienceProgress(40);
      setHistoryProgress(90);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-6">
      <Card className="card-hover-effect animate-slide-in" style={{animationDelay: "0.1s"}}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 px-2 py-1 rounded-md text-xs font-medium text-blue-600 dark:text-blue-400">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />5% Improvement
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg font-semibold mb-1">Mathematics</CardTitle>
          <p className="text-sm text-muted-foreground mb-4">Algebra & Geometry</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{mathProgress}%</span>
            </div>
            <Progress value={mathProgress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="pt-1">
          <div className="flex justify-between items-center w-full text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last: 2 days ago</span>
            </div>
            <a href="/courses/math" className="flex items-center text-primary font-medium">
              <span>Continue</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </CardFooter>
      </Card>

      <Card className="card-hover-effect animate-slide-in" style={{animationDelay: "0.2s"}}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-md text-xs font-medium text-green-600 dark:text-green-400">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />10% Improvement
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg font-semibold mb-1">Science</CardTitle>
          <p className="text-sm text-muted-foreground mb-4">Physics & Chemistry</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{scienceProgress}%</span>
            </div>
            <Progress value={scienceProgress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="pt-1">
          <div className="flex justify-between items-center w-full text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last: 1 day ago</span>
            </div>
            <a href="/courses/science" className="flex items-center text-primary font-medium">
              <span>Continue</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </CardFooter>
      </Card>

      <Card className="card-hover-effect animate-slide-in" style={{animationDelay: "0.3s"}}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
              <Layers className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded-md text-xs font-medium text-amber-600 dark:text-amber-400">
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />15% Improvement
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-lg font-semibold mb-1">History</CardTitle>
          <p className="text-sm text-muted-foreground mb-4">World History</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{historyProgress}%</span>
            </div>
            <Progress value={historyProgress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="pt-1">
          <div className="flex justify-between items-center w-full text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last: 5 days ago</span>
            </div>
            <a href="/courses/history" className="flex items-center text-primary font-medium">
              <span>Continue</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
