
import { useEffect } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Chat = () => {
  useEffect(() => {
    document.title = "AI Tutor Chat | AI Tutor";
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <ChatInterface />
    </div>
  );
};

export default Chat;
