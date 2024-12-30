import axios, { Axios } from "axios";
import { ChatService } from "./chat.service";

export const getChat = async (fail = true) => {
  try {
    const chatService = ChatService.getInstance();
    const internalChatId = chatService.getInteralId();
    const resp = await axios.get(
      `http://localhost:3003/chats/${internalChatId}`
    );
    return resp.data;
  } catch (error) {
    console.log('aca?', fail);
    if(fail) throw error;
    return null;
  }
};

export const createChat = async () => {
  const chatService = ChatService.getInstance();
  const internalChatId = chatService.getInteralId();
  const resp = await axios.post(`http://localhost:3003/chats`, {
    userId: 1,
    internalChatId,
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
    console.log('aca2?');
    if(!chat) chat = await createChat();
  } catch (err: any) {
    console.log("catch");
    error.setter(err.message);
  } finally {
    loading.setter(false);
  }
};
