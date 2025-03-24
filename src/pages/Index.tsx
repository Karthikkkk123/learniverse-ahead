
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Zap, BookOpen, BarChart2, MessageSquare, ArrowRight, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-6 w-6 text-primary animate-pulse-light mr-2" />
            <span className="text-xl font-semibold text-gradient">AI Tutor</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 animate-fade-in">
            AI-powered learning that adapts to you
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight animate-slide-in">
            Personalized Tutoring with AI Assistance
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: "0.1s" }}>
            Get instant help with homework, practice with AI-generated quizzes, and learn at your own pace with personalized feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" onClick={() => navigate("/signup")}>
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
              Try as Guest
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learning the way it should be</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI tutor adapts to your learning style and pace, providing personalized assistance whenever you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-soft card-hover-effect animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Tutoring</h3>
              <p className="text-muted-foreground">
                Get real-time answers to your questions and personalized explanations tailored to your understanding level.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-soft card-hover-effect animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Quizzes</h3>
              <p className="text-muted-foreground">
                Our system generates quizzes based on your progress, focusing on areas where you need the most practice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-soft card-hover-effect animate-slide-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
              <p className="text-muted-foreground">
                Access a wide range of subjects and topics, from math and science to history and language arts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students already benefiting from our AI tutoring platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass-effect p-6 rounded-xl animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center space-x-1 mb-4 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
              </div>
              <p className="mb-4 text-muted-foreground">
                "The AI Tutor has been a game-changer for my studies. I love how it explains complex concepts in ways that are easy to understand."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">JS</span>
                </div>
                <div>
                  <p className="font-medium">Jamie Smith</p>
                  <p className="text-xs text-muted-foreground">High School Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-effect p-6 rounded-xl animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center space-x-1 mb-4 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
              </div>
              <p className="mb-4 text-muted-foreground">
                "As a parent, I appreciate how the AI Tutor is always available to help my child with homework questions, even when I can't."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">MJ</span>
                </div>
                <div>
                  <p className="font-medium">Mark Johnson</p>
                  <p className="text-xs text-muted-foreground">Parent</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-effect p-6 rounded-xl animate-slide-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center space-x-1 mb-4 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-amber-400" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mb-4 text-muted-foreground">
                "The adaptive quizzes really helped me prepare for my exams. I could focus on exactly what I needed to practice."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">AP</span>
                </div>
                <div>
                  <p className="font-medium">Anya Patel</p>
                  <p className="text-xs text-muted-foreground">College Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 bg-primary/5 rounded-3xl mx-4 my-10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your learning experience?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of students already benefiting from personalized AI tutoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started for Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Zap className="h-5 w-5 text-primary mr-2" />
              <span className="text-xl font-semibold">AI Tutor</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Features</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© 2023 AI Tutor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
