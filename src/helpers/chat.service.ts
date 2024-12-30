import { v4 as uuidv4 } from "uuid";
export class ChatService {
  private static instance: ChatService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

    getInteralId = () => {
    const localId = localStorage.getItem("internalChatId");
    if (localId) return localId;

    const newId = uuidv4();
    localStorage.setItem("internalChatId", newId);

    return newId;
  };
}
