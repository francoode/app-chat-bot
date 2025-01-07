import { useEffect, useState } from "react";
import { initChat, sseMessages } from "../helpers/chat.helper";
import "./Chat.css";
import {
  Option,
  SourceMessage,
  DisplayMessage,
  ChatModel,
  ServerMessageModel,
} from "../helpers/chat.type";
import ServerMessage from "./ServerMessage";

const Chat = () => {
  const [chat, setChat] = useState<ChatModel | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<DisplayMessage[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //sseMessages(setMessages);
    const fetchData = async () => {
      const chat = await initChat();
      setChat(chat);
      setMessages(chat.messages);
    };
    fetchData();
  }, []);

  const handleOptionClick = async (option: Option) => {
    setTimeout(() => {
      const messagesContainer: any = document.getElementById("messages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  };

  return (
    <div className="chat-container">
      <div id="messages" className="messages">
        {messages.map((message, index) =>
          message.source === "SERVER" ? (
            <ServerMessage
              message={message.message as ServerMessageModel}
              index={index}
            />
          ) : (
            <div></div>
            //<ClientMessage message={message} index={index} />
          )
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          placeholder="Escribe un mensaje..."
          disabled
        />
        <button disabled>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
