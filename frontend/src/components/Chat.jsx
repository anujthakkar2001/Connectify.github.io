import React, { useState, useEffect } from "react";
import img from "../img.png";
import Attach from "../attach.png";


const ChatForm = () => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    const sendMessage = (e) => {
        e.preventDefault();
        setMessage("");
    };
    
    useEffect(() => {
        
    }, [messages]);
    
    return (
      <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        size={175}
        //onChange={(e) => setText(e.target.value)}
        //value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          //onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button type="submit">Send</button>
      </div>
    </div>
    );

}

export default ChatForm;