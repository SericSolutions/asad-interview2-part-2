import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeDifference } from '../../helpers/utility';
import { MessageSingle, MessageChatWrapper } from './message.style';
import * as chatBotActions from '../../redux/chatbot/actions';


class Messages extends Component {
  scrollToBottom = () => {
    const messageChat = document.getElementById('messageChat');
    messageChat.scrollTop = messageChat.scrollHeight;
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const {
      toggleViewProfile,
      toggleMobileProfile,
    } = this.props;

    const renderMessage = message => {
      const isUser = message.sender;
      //const messageUser = isUser ? user : selectedChatRoom.otherUserInfo;
      if (!isUser) {
        return (
          <MessageSingle className="loggedUser" key={message.messageTime}>
            <div className="messageContent isUser">
              <div className="messageContentText">
                <p>{message.text}</p>
              </div>
              <div className="messageTime">
                <p>{timeDifference(message.messageTime)}</p>
              </div>
            </div>
            <div className="messageGravatar">
              <img
                alt="#"
                src={"https://cdn4.dualshockers.com/wp-content/uploads/2010/09/borderlands_claptraprevolution_05.jpg"}
                onClick={() => {
                }}
              />
            </div>
          </MessageSingle>
        );
      } else {
        return (
          <MessageSingle key={message.messageTime}>
            <div className="messageGravatar">
              <img
                alt="#"
                src={"https://d30y9cdsu7xlg0.cloudfront.net/png/415502-200.png"}
                onClick={() => {
                }}
              />
            </div>
            <div className="messageContent notUser">
              <div className="messageContentText">
                <p>{message.text}</p>
              </div>
              <div className="messageTime">
                <p>{timeDifference(message.messageTime)}</p>
              </div>
            </div>
          </MessageSingle>
        );
      }
    };
    return (
      <MessageChatWrapper id="messageChat">
        {this.props.conversation.map(renderMessage)}
      </MessageChatWrapper>
    );
  }
}

const mapStateToProps = state => {
  console.log (state)
  return {
    conversation: state.ChatBot.conversation,
    id: state.ChatBot.id
  }
}

export default connect(mapStateToProps, chatBotActions)(Messages);
