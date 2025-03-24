
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Zap } from "lucide-react";

const Login = () => {
  useEffect(() => {
    document.title = "Login | AI Tutor";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Zap className="h-5 w-5 text-primary mr-2" />
          <span className="text-xl font-semibold">AI Tutor</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your learning journey</p>
          </div>
          <AuthForm mode="login" />
        </div>
      </main>

      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>© 2023 AI Tutor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
