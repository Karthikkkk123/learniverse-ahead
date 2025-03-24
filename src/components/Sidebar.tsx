
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, BookText, Trophy, MessageSquare, Layout, ChevronLeft, ChevronRight, Home, BarChart2, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Courses", path: "/courses", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Lessons", path: "/lessons", icon: <BookText className="h-5 w-5" /> },
    { name: "Quizzes", path: "/quizzes", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "AI Tutor Chat", path: "/chat", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Achievements", path: "/achievements", icon: <Trophy className="h-5 w-5" /> },
    { name: "Profile", path: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-border transition-all duration-300 ease-in-out relative",
        expanded ? "w-64" : "w-20",
        className
      )}
    >
      <div className="flex items-center px-4 py-5">
        {expanded ? (
          <div className="flex items-center animate-fade-in">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <span className="text-xl font-semibold text-gradient">AI Tutor</span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Zap className="h-6 w-6 text-primary animate-pulse-light" />
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border shadow-sm flex items-center justify-center bg-white dark:bg-gray-800"
        onClick={toggleSidebar}
      >
        {expanded ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </Button>

      <Separator />

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-all",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted",
                !expanded && "justify-center"
              )}
            >
              <div className={expanded ? "mr-3" : "mr-0"}>{item.icon}</div>
              {expanded && <span className="animate-fade-in">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-border flex items-center justify-between">
        <div className="flex items-center">
          {expanded && (
            <div className="mr-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          )}
          {expanded ? (
            <div className="animate-fade-in">
              <p className="text-sm font-medium">Guest User</p>
              <p className="text-xs text-muted-foreground">student@example.com</p>
            </div>
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        {expanded && <ThemeToggle />}
      </div>
    </div>
  );
}
