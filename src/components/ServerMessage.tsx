import React from "react";
import { Option, ServerMessageModel } from "../helpers/chat.type";

interface ServerMessageProps {
  message: ServerMessageModel;
  index: number;
}

const ServerMessage: React.FC<ServerMessageProps> = ({ message, index }) => {
  const handleOptionClick = (option: Option) => {
    console.log('hola');
  }

  return (
    <div key={index} className={"server-message"}>
      <div>{message.presetMessage.text}</div>
      <div className="options-container">
        {message?.presetMessage?.options &&
          message.presetMessage.options.map((option, optionIndex) => (
            <button
              key={optionIndex}
              className="preset-option-button"
              onClick={() => handleOptionClick(option)}
            >
              {option.title}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ServerMessage;
