
import { BookOpen, Clock, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function RecommendedLessons() {
  // Sample recommended lessons data
  const recommendedLessons = [
    {
      id: 1,
      title: "Quadratic Equations Made Simple",
      subject: "Mathematics",
      duration: "15 min",
      level: "Intermediate",
      isNew: true,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "Introduction to Chemical Reactions",
      subject: "Chemistry",
      duration: "20 min",
      level: "Beginner",
      isNew: false,
      image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "The French Revolution: Key Events",
      subject: "History",
      duration: "25 min",
      level: "Advanced",
      isNew: true,
      image: "https://images.unsplash.com/photo-1549737221-bef65e2604a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recommended For You</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedLessons.map((lesson, index) => (
          <Card key={lesson.id} className="card-hover-effect overflow-hidden border animate-slide-in" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={lesson.image} 
                alt={lesson.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {lesson.isNew && (
                <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  New
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">{lesson.subject}</p>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{lesson.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Star className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-amber-500 font-medium mr-2">4.8</span>
                <span className="text-muted-foreground">(120 ratings)</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{lesson.level}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start Lesson</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
