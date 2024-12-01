import React, { useContext, useState } from "react";
import GlobalContext from "../Dashboard/GlobalContext/GlobalContext";
import "./Chatbot.css";
const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { state } = useContext(GlobalContext);
  const userid = state.userid;
  const toggleChatbox = () => {
    if (isOpen) {
      setMessages([]);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      var text = "";
      const getResponsefromChatlog = async () => {
        const response = await fetch("http://localhost:8083/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userid,
            query: inputValue,
          }),
        });
        const data = await response.json();
        text = data.response;
      };
      getResponsefromChatlog();

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: `${text}`, sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbox">
      <div
        className={`chatbox-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleChatbox}
      >
        {/* <span className="notification-badge">2</span> */}
        💬
      </div>
      {isOpen && (
        <div className="chatbox-window">
          <div className="chatbox-header">
            <h3>Chat with Us</h3>
            <button className="close-button" onClick={toggleChatbox}>
              ×
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user" : "bot"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
