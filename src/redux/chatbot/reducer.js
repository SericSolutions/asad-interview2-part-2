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
            message: action.message,
            response: action.response
          }),
          id: state.id+1
      }

    default:
      return state;
  }
}

export default reducer;
