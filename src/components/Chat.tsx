import { useEffect, useState } from "react";
import { initChat, sseMessages } from "../helpers/chat.helper";
import "./Chat.css";
import { Message } from "../helpers/chat.type";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState(null);

  /* 
    { sender: "me", text: "Hola, ¿cómo estás?" },
    { sender: "other", text: "¡Bien! ¿Y tú?" }, */

  //ComponentInit
  useEffect(() => {
    sseMessages(setMessages);
    initChat(setChat, setLoading, setMessages);
  }, []);

  useEffect(() => {
    console.log('Cambio chat');
    console.log(chat);
  }, [chat]);

  useEffect(() => {
    if (messages) {
      const lastMessage = messages[messages.length - 1];
      console.log("El mensaje cambió:", lastMessage);
      /* async () => {
        const data = await axios.post("http://localhost:3003/messages", {
          chatId: 1,
          optionSelectedId: 1,
          presetMessageId: 1
        });
      }; */
    }
  }, [messages]);

  

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => {
        return [...prevMessages, { sender: "me", text: message }];
      });
      setMessage(""); // Limpiar el input
    }

     //Scroll al final del contenedor de mensajes
     setTimeout(() => {
      const messagesContainer: any = document.getElementById("messages");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  };

  return (
    <div className="chat-container">
      <div id="messages" className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "me" ? "my-message" : "other-message"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
