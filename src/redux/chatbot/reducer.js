import * as actionTypes from './actions';

const initialState = {
  conversation: [],
  id: 0
};

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case actionTypes.ADD_MESSAGE:
      return{
        ...state,
          conversation: state.conversation.concat({
            key: state.id,
            text: action.text,
            sender: action.sender,
            messageTime: (new Date).getTime()
          }),
          id: state.id+1
      }

    default:
      return state;
  }
}

export default reducer;
