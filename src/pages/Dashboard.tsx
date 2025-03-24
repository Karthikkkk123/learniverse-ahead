
import { useEffect } from "react";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { LearningProgress } from "@/components/dashboard/LearningProgress";
import { RecommendedLessons } from "@/components/dashboard/RecommendedLessons";
import { NextQuizzes } from "@/components/dashboard/NextQuizzes";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | AI Tutor";
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <WelcomeHeader />
      <LearningProgress />
      <RecommendedLessons />
      <NextQuizzes />
    </div>
  );
};

export default Dashboard;
