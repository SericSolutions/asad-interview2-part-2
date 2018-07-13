import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/uielements/button";
import notification from "../../components/notification";
import { ComposeMessageWrapper, Textarea } from "./message.style";
import * as chatBotActions from '../../redux/chatbot/actions';
import AWS from "aws-sdk";



class ComposeMessage extends Component {
  state = {
    value: ""
  };

  scrollToBottom = () => {
    const messageChat = document.getElementById('messageChat');
    messageChat.scrollTop = messageChat.scrollHeight;
  };

  componentWillMount() {
    AWS.config.update({
      region: "us-east-1",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1:b1c8d65c-1d1a-403b-928b-94b2ecbc639c"
      })
    });

    this.lexruntime = new AWS.LexRuntime();
    this.lexUserId = "chatbot-demo" + Date.now();
    this.sessionAttributes = {};
  }

  addMessage(message, response) {
    this.props.onMessageAdded(message, response);
  }

  submit() {
    var message = this.state.value;

    this.addMessage(message, false);

    var params = {
      botAlias: "$LATEST",
      botName: "G_Fifty_One_Test",
      inputText: message,
      userId: this.lexUserId,
      sessionAttributes: this.sessionAttributes
    };

    var parent = this;
    this.lexruntime.postText(params, function(err, data) {
      if (err) console.log(err, err.stack);

      if (data) {
        console.log(data);
        parent.addMessage(data.message, true);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: "" });
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { value } = this.state;
      if (value && value.length > 0) {
        this.submit();
        this.setState({ value: "" });
        this.scrollToBottom()
      } else {
        notification("error", "Please type something");
      }
    }
  };

  render() {
    const { value } = this.state;
    return (
      <ComposeMessageWrapper>
        <Textarea
          autosize={this.props.autosize}
          value={value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder="Type your message"
        />
        {this.props.showButton ? (
          <div className="sendMessageButton">
            <Button type="primary" onClick={this.sendMessage}>
              Send Message
            </Button>
          </div>
        ) : (
          ""
        )}
      </ComposeMessageWrapper>
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

const mapDispatchToProps = dispatch => {
  return {
    onMessageAdded: (message, response) => dispatch({
      type: chatBotActions.ADD_MESSAGE,
      text: message,
      sender: response
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMessage);
