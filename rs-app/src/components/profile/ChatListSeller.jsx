import React, { useState, useEffect, useRef } from "react";
import s from "./ChatListSeller.module.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ChatListSeller = () => {
  const sellerid = Cookies.get("sellerid");
  const [chatMessages, setChatMessages] = useState([]);
  const isMounted = useRef(false);

  if (!isMounted.current) {
    console.log("Component mounted, do something here");
    isMounted.current = true;
  }

  const ChatTemplate = ({ message }) => {
    return (
      <div className={s.ai_person_container} key={message.id}>
        <div className={s.onee}>
          <h5>{message.clientname}</h5>
          <p> from </p>
          <h5> {message.clientcity} </h5>
          <p> to </p>
          <h5> {message.productname} </h5>
        </div>
      </div>
    );
  };

  const fetchUserData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let newchatMessages = data.filter(
          (message) => message.sellerid == sellerid
        );
        const msgs = Array.from(
          new Set(newchatMessages.map((msg) => msg.productid))
        ).map((id) => {
          return newchatMessages.find((msg) => msg.productid === id);
        });
        setChatMessages(msgs);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUserData("http://0.0.0.0:4000/api/messages/");
  }, [sellerid]);

  return (
    <main className={s.main}>
      <div className={s.chat_box_container}>
        <h1 className={s.chat_box_header}>ALL CHATS</h1>
        {chatMessages.length === 0 ? (
          <p className={s.noMessage}>You don't have any message!</p>
        ) : (
          <div className={s.chat_box}>
            {chatMessages.map((msg) => (
              <Link
                className={s.linkk}
                to={`/direct-message`}
                key={msg.id}
                state={{
                  sellerid: msg.sellerid,
                  clientid: msg.clientid,
                  productid: msg.productid,
                  companyname: msg.companyname,
                  productname: msg.productname,
                  clientname: msg.clientname,
                  clientcity: msg.clientcity,
                }}
              >
                <ChatTemplate message={msg} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatListSeller;
