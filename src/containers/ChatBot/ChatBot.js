import React, { Component } from "react";
import Messages from "./ChatBotmessages"
import ComposeMessage from "./ChatBotcomposMessage"
import { ChatBox, ChatWindow, ToggleViewProfile } from "./message.style";
import ChatRooms from "./chatrooms";

const divStyle = {
  overflowY: "scroll",
  height: "500px"
};


class ChatBot extends Component {
  render(){
    return(
      <div style={{textAlign: "center"}}>
        <div style={{width: "80%", display: "inline-block" }}>
          <div style={divStyle}>
            <Messages />
          </div>
          <ComposeMessage autosize={{ minRows: 2, maxRows: 6 }} />
        </div>
      </div>
  );
  }
}

export default ChatBot;
