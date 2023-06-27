import "./ChatBubble.scss";

import React, { ReactNode } from "react";

interface ChatBubbleProps {
  className?: string;
  children: ReactNode;
}

const ChatBubble = ({ className, children }: ChatBubbleProps) => {
  return (
    <div className={`chat-bubble ${className}`}>
      <div className="border-triangle"></div>
      <div className="background-triangle"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default ChatBubble;
