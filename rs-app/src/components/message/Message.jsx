import React, { useState, useEffect, useRef } from "react";
import s from "./Message.module.css";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
const Message = () => {
  const clientid = Cookies.get("clientid");
  const location = useLocation();
  const sellerid = location.state.sellerid;
  const productid = location.state.productid;
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const isMounted = useRef(false);

  const [formData, setFormData] = useState({
    sellerid: sellerid,
    clientid: clientid,
    productid: productid,
    message: "",
    timestamp: "",
    sendtype: "client",
    companyname: "",
    productname: "",
    clientname: "",
    clientcity: "",
  });

  if (!isMounted.current) {
    isMounted.current = true;
    fetch(`http://0.0.0.0:4000/api/clientById/${clientid}/`)
      .then((response) => response.json())
      .then((data) => {
        formData.clientname = data.username;
        formData.clientcity = data.city;
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
    fetch(`http://0.0.0.0:4000/api/SellerById/${sellerid}/`)
      .then((response) => response.json())
      .then((data) => {
        formData.companyname = data.company_name;
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
    fetch(`http://0.0.0.0:4000/api/productById/${productid}/`)
      .then((response) => response.json())
      .then((data) => {
        formData.productname = data.name;
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }

  const chatTemplate = (message) => {
    return (
      <div className={s.ai_person_container} key={message.id}>
        <div className={`${s[message.sendtype]}`}>
          <p>{message.message}</p>
        </div>
        <span className={`${s[message.sendtype + "_date"]}`}>
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
        setChatMessages(newchatMessages);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  // useEffect(() => {
  //   fetchUserData("http://0.0.0.0:4000/api/messages/");
  // }, [clientid]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserData("http://0.0.0.0:4000/api/messages/");
    }, 1500); 
    return () => clearInterval(interval); 
  }, [clientid]);
  
  const appendChatBox = (fromPerson) => {
    const date = new Date();
    const timestamp = date.toLocaleTimeString();
    const newChatMessages = [...chatMessages];

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
      appendChatBox(true);
    }
  };

  return (
    <main className={s.main}>
      <div className={s.chat_box_container}>
        <h1 className={s.chat_box_header}>CHAT WITH SELLER</h1>
        {chatMessages.length === 0 ? (
        <p className={s.noProductMessage}> You don't have any message with this seller!</p>
      ) : (
        <div className={s.chat_box}>
          {chatMessages.map((message, index) =>
            chatTemplate({ ...message, key: index })
          )}
        </div>
        )}
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

export default Message;
