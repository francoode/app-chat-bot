import axios, { Axios } from "axios";
import { ChatService } from "./chat.service";
import {
  ChatModel,
  ServerMessageModel,
  SourceMessage,
  DisplayMessage,
  MessageFromApi,
  ChatFromApi,
  ClientMessage,
} from "./chat.type";

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

export const initChat = async (): Promise<ChatModel> => {
  //agregar try catch
  const chat: ChatFromApi = (await getChat(false)) || (await createChat());
  const displayMessages: DisplayMessage[] = [];
  for (const msg of chat.messages) {
    const { source, internalId, presetMessage, id } = msg;
    if (source === SourceMessage.SERVER) {
      displayMessages.push({
        source,
        message: {
          id,
          presetMessage,
        } as ServerMessageModel,
      });
    }

    if (source === SourceMessage.CLIENT) {
      displayMessages.push({
        source,
        message: {
          internalId,
          presetMessageSelected: presetMessage,
          id,
        } as ClientMessage,
      });
    }
  }
  return {
    ...chat,
    messages: displayMessages,
  };
};

export const getChat = async (fail = true) => {
  try {
    const chatService = ChatService.getInstance();
    const internalId = chatService.getInteralId();
    const resp = await axios.get(`http://localhost:3003/chats/3`);
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
