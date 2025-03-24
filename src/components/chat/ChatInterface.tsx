
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Volume2, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const sampleResponses = [
  "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides. So, a² + b² = c², where c is the hypotenuse.",
  "Cell mitosis is the process where a single cell divides into two identical daughter cells. It consists of several phases: prophase, metaphase, anaphase, and telophase, followed by cytokinesis.",
  "The French Revolution began in 1789 and was a period of radical social and political upheaval in French history. The main causes were social inequality, financial crisis, and the ideas of the Enlightenment.",
  "To solve this equation: 2x + 7 = 15, first subtract 7 from both sides to get 2x = 8, then divide both sides by 2 to find x = 4.",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI tutor. How can I help you with your studies today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tab, setTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample suggestions
  const suggestions = [
    "Explain the Pythagorean theorem",
    "What is cell mitosis?",
    "Help me understand the French Revolution",
    "Solve the equation: 2x + 7 = 15",
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleResponses.length);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: sampleResponses[randomIndex],
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSendMessage();
  };

  const textToSpeech = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-2rem)] shadow-soft animate-scale-in">
      <CardHeader className="p-4 border-b">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">AI Tutor</h2>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <TabsList>
              <TabsTrigger value="chat" className="text-xs">
                <MessageSquare className="h-4 w-4 mr-1" /> Chat
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="text-xs">
                Quick Questions
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        <TabsContent value="chat" className="h-full m-0">
          <ScrollArea className="h-full p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4 max-w-[80%] animate-slide-in",
                  message.role === "user" ? "ml-auto" : "mr-auto"
                )}
              >
                <div className="flex items-start gap-3">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div>
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    <div className="flex mt-1 text-xs text-muted-foreground">
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 rounded-full"
                          onClick={() => textToSpeech(message.content)}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-0.5">
                      <AvatarFallback className="bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center gap-3 mb-4 max-w-[80%] animate-fade-in">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="suggestions" className="h-full m-0">
          <div className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose a question below to start a conversation with your AI Tutor:
            </p>
            
            <div className="grid gap-3">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 text-left card-hover-effect animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
      </CardContent>
      
      <CardFooter className="p-4 border-t mt-auto">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={isTyping || input.trim() === ""}>
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
