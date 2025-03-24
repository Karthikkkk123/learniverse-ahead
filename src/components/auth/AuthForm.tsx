
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthFormProps = {
  mode: "login" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (mode === "signup" && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success handling
      if (mode === "login") {
        toast.success("Login successful!");
      } else {
        toast.success("Account created successfully!");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(`${mode === "login" ? "Login" : "Signup"} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    toast.info("Entering as guest. Your progress won't be saved.");
    navigate("/dashboard");
  };

  return (
    <div className="glass-effect p-8 rounded-2xl w-full max-w-md mx-auto animate-scale-in shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-white/50 dark:bg-black/10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleChange}
            className="bg-white/50 dark:bg-black/10"
          />
        </div>
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-white/50 dark:bg-black/10"
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>{mode === "login" ? "Sign In" : "Create Account"}</>
          )}
        </Button>
        <div className="text-center">
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or</span>
            </div>
          </div>
          <Button variant="outline" onClick={handleGuestAccess} className="w-full">
            Continue as Guest
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <a href="/signup" className="underline text-primary hover:text-primary/90 font-medium">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="underline text-primary hover:text-primary/90 font-medium">
                Sign in
              </a>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
