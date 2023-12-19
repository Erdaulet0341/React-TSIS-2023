import React, { useState, useEffect } from "react";
import s from "./Message.module.css";
import { Link, useLocation } from "react-router-dom";

const SellerMessage = () => {
  const location = useLocation();
  const sellerid = location.state.sellerid;
  const productid = location.state.productid;
  const clientid = location.state.clientid;

  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [formData, setFormData] = useState({
    sellerid: sellerid,
    clientid: clientid,
    productid: productid,
    message: "",
    timestamp: "",
    sendtype: "seller",
    companyname: location.state.companyname,
    productname: location.state.productname,
    clientname: location.state.clientname,
    clientcity: location.state.clientcity,
  });

  const chatTemplate = (message) => {
    return (
      <div className={s.ai_person_container} key={message.id}>
        <div className={`${s[message.sendtype + "2"]}`}>
          <p>{message.message}</p>
        </div>
        <span className={`${s[message.sendtype + "_date2"]}`}>
          {message.timestamp}
        </span>
      </div>
    );
  };

  const fetchUserData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let newchatMessages = data.filter(
          (message) =>
            message.clientid == clientid &&
            message.sellerid == sellerid &&
            message.productid == productid
        );
        const chat = Array.from(
          new Set(newchatMessages.map((product) => product.message))
        ).map((message) => {
          return newchatMessages.find((product) => product.message === message);
        });
        setChatMessages(chat);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  // useEffect(() => {
  //   fetchUserData("http://0.0.0.0:4000/api/messages/");
  // }, [sellerid]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserData("http://0.0.0.0:4000/api/messages/");
    }, 1500); 
  
    return () => clearInterval(interval); 
  }, [sellerid]);

  const appendChatBox = (fromPerson) => {
    const date = new Date();
    const timestamp = date.toLocaleTimeString();
    const newChatMessages = [...chatMessages];
    console.log(456)
    if (fromPerson && inputValue.trim().length !== 0) {
      formData.message = inputValue.trim();
      formData.timestamp = timestamp;
      fetch("http://0.0.0.0:4000/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          fetchUserData("http://0.0.0.0:4000/api/messages/");
        })
        .catch((error) => {
          console.log("Fetch error:", error);
        });

      newChatMessages.push(formData);
      setInputValue("");
      setChatMessages(newChatMessages);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.length !== 0) {
      appendChatBox(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.length !== 0) {
      console.log("22222")
      appendChatBox(true);
    }
  };

  return (
    <main className={s.main}>
      <div className={s.chat_box_container}>
        <h1 className={s.chat_box_header}>CHAT WITH CLIENT</h1>
        <div className={s.chat_box}>
          {chatMessages.map((message, index) =>
            chatTemplate({ ...message, key: index })
          )}
        </div>
      </div>
      <div className={s.chat_input_container}>
        <input
          className={s.chat_input}
          type="text"
          name="chat-input"
          value={inputValue}
          required
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type message..."
        />
        <button
          className={s.chat_submit}
          type="button"
          name="submit"
          onClick={handleButtonClick}
        >
          Send
        </button>
      </div>
    </main>
  );
};

export default SellerMessage;
