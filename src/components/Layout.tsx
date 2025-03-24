
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Layout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle */}
      {isMobile && !showSidebar && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-background shadow-sm border rounded-full"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      {(showSidebar || !isMobile) && (
        <div
          className={`${
            isMobile ? "fixed inset-0 z-40 transition-all duration-300 ease-in-out" : ""
          } ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        >
          {isMobile && (
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"
              onClick={toggleSidebar}
            />
          )}
          <Sidebar
            className={`${isMobile ? "max-w-[280px]" : ""} transition-all duration-300 ease-in-out`}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 transition-all duration-300">
          <Outlet />
          <div className="h-10" />
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster />
      <Sonner />
    </div>
  );
}
