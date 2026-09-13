import { createClient } from "@/utils/supabase/client";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

// Generate persistent anonymous user ID for current session
export function getOrCreateUserId(): { id: string; name: string } {
  if (typeof window === "undefined") {
    return { id: "guest", name: "Khách ghé thăm" };
  }

  let id = localStorage.getItem("chill_chat_user_id");
  let name = localStorage.getItem("chill_chat_user_name");

  if (!id) {
    id = `user_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("chill_chat_user_id", id);
  }

  if (!name) {
    const randomNum = Math.floor(100 + Math.random() * 900);
    name = `Bạn lạ #${randomNum}`;
    localStorage.setItem("chill_chat_user_name", name);
  }

  return { id, name };
}

export function setCustomUserName(name: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("chill_chat_user_name", name);
  }
}
