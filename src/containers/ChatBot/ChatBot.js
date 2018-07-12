import React, { Component } from "react";
import "./ChatBot.css";
import AWS from "aws-sdk";
import { connect } from 'react-redux';
import * as chatBotActions from '../../redux/chatbot/actions';


class ChatBot extends Component {
  state = {
    textInput: "",
  };

  addMessage(message, response) {
    /*this.setState(...this.state, {
      conversation: this.state.conversation.concat({
        key: this.state.id,
        message: message,
        response: response
      }),
      id: this.state.id+1
    });*/
    this.props.onMessageAdded(message, response);
  }

  updateInputValue(evt) {
    this.setState(...this.state, {
      textInput: evt.target.value
    });
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.submit();
    }
  }


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

  submit() {
    var message = this.state.textInput;
    if(message.length < 1){
      alert("no inputText");
      return;
    }

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

  render() {
    console.log (this.props);
    var posts = this.props.conversation.map(conversation => {
      if (conversation.response)
        return <p key={conversation.key} className="response"> {conversation.message} </p>;
      else
        return <p key={conversation.key} className="request"> {conversation.message} </p>;
    });

    return (
      <div>
        {posts}
        <div className="middle">
          <input
            value={this.state.textInput}
            onChange={evt => this.updateInputValue(evt)}
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={() => this.submit()}> submit </button>
        </div>
      </div>
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
      message: message,
      response: response
      })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatBot);
