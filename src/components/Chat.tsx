import { useEffect, useState } from "react";
import { initChatComponent } from "../helpers/chat.helper";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "me", text: "Hola, ¿cómo estás?" },
    { sender: "other", text: "¡Bien! ¿Y tú?" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initChatComponent({
      error: { setter: setError, value: error },
      loading: { setter: setLoading, value: error },
    });
  }, []);

  useEffect(() => {
    if (messages) {
      const lastMessage = messages[messages.length - 1];
      console.log("El mensaje cambió:", lastMessage);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { sender: "me", text: message }];
        setTimeout(() => {
          const messagesContainer: any = document.getElementById("messages");
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100); // Usamos setTimeout para esperar que el DOM se actualice
        return newMessages;
      });
      setMessage(""); // Limpiar el input
    }
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
