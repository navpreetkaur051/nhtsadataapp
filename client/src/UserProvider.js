import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    user: {},
    error: null,
    authenticated: false,
  });

  return (
    <UserContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext };
