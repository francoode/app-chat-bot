import axios, { Axios } from "axios";
import { ChatService } from "./chat.service";

export const getChat = async (fail = true) => {
  try {
    const chatService = ChatService.getInstance();
    const internalId = chatService.getInteralId();
    const resp = await axios.get(
      `http://localhost:3003/chats/${internalId}`
    );
    return resp.data;
  } catch (error) {
    if(fail) throw error;
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

export const initChatComponent = async (params: {
  loading: {
    setter: Function;
    value: any;
  };
  error: {
    setter: Function;
    value: any;
  };
}) => {
  const { loading, error } = params;
  try {
    loading.setter(true);
    let chat = await getChat(false);
    if(!chat) await createChat();

    const eventSource = new EventSource('http://localhost:3003/messages');

     // Manejar mensajes entrantes
     eventSource.onmessage = (event) => {
      const newEvent = JSON.parse(event.data);
      console.log(newEvent);
    };

    // Manejar errores
    eventSource.onerror = () => {
      console.error('Error en la conexión SSE.');
      eventSource.close();
    };

  } catch (err: any) {
    console.log("catch");
    error.setter(err.message);
  } finally {
    loading.setter(false);
  }
};
