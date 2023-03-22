import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
  chats: [],
  messages: [],
  socket: null,
  modalType: "",
};

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);
  const localData = JSON.parse(localStorage.getItem("user"));
  return (
    <AuthContext.Provider
      value={{
        user: localData || state.user,
        isFetching: state.isFetching,
        error: state.error,
        chats: state.chats,
        socket: state.socket,
        messages: state.messages,
        modalType: state.modalType,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// _id: "622f4191b32a471db4a725b8",
//     username: "jane",
//     email: "jane@gmail.com",
//     profilePicture: "",
//     coverPicture: "",
//     followers: ["622f48914bc225b196242aa7", "622f48914bc225b196242aa7"],
//     following: [
//       "622f44b121ce9d0bcd43cf6d",
//       "622f48914bc225b196242aa7",
//       "62b996c451ddf3207a86d9f0",
//       "62b996dc51ddf3207a86d9f2",
//       "62b996fb51ddf3207a86d9f4",
//     ],
//     isAdmin: false,
//     createdAt: "2022-03-14T13:22:25.404Z",
//     __v: 0,
//     city: "lagos",
//     desc: "I am just awesome",
