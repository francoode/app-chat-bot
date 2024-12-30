import axios, { Axios } from "axios";
import { ChatService } from "./chat.service";
import { Chat, Message, ServerMessage, SourceMessage } from "./chat.type";

export const sseMessages = (messageSet: Function) => {
  const eventSource = new EventSource("http://localhost:3003/messages");

  // Manejar mensajes entrantes
  eventSource.onmessage = (event) => {
    const newEvent = JSON.parse(event.data);
    console.log(newEvent);
  };

  // Manejar errores
  eventSource.onerror = () => {
    console.error("Error en la conexión SSE.");
    eventSource.close();
  };
};

export const initChat = async (
  chatSet: Function,
  loadingSet: Function,
  messagesSet: Function
) => {
  //agregar try catch
  let chat: any = await getChat(false);
  if (!chat) chat = await createChat();

  chatSet(chat);

  const chatServerMessage: ServerMessage[] = chat.messages;
  
  for(const msg of chatServerMessage) {

    const message: Message = {
      text: msg.presetMessage.text,
      source: SourceMessage.SERVER,
    }
    messagesSet((prevMessages: Message[]) => [...prevMessages, message]);
  }
};

export const getChat = async (fail = true) => {
  try {
    const chatService = ChatService.getInstance();
    const internalId = chatService.getInteralId();
    const resp = await axios.get(`http://localhost:3003/chats/${internalId}`);
    return resp.data;
  } catch (error) {
    if (fail) throw error;
    return null;
  }
};

export const createChat = async () => {
  const chatService = ChatService.getInstance();
  const internalId = chatService.getInteralId();
  const resp = await axios.post(`http://localhost:3003/chats`, {
    userId: 1,
    internalId,
  });
  return resp.data;
};
