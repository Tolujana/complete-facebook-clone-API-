const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'FRIEND_REQUEST':
      return { ...state, user: action.payload };
    case 'CHAT_START':
      return { ...state, chats: [...state?.chats, action.payload] };
    case 'SOCKET':
      return { ...state, socket: action.payload };
    case 'CHATMESSAGES':
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};
export default AuthReducer;
