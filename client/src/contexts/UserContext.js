import { createContext, useState, useEffect } from "react";
// Create a Context
export const userContext = createContext();

// Create a Component wrapper from Context.Provider
export default function UserProvider(props) {
  // Here is our Shared State Object
  //------------------------STATES------------------------------------------///
  const [authenticated, setAuthenticated] = useState(
    window.sessionStorage.getItem("isAuthenticated")
  );
  const [userId, setUserId] = useState(Number(window.sessionStorage.getItem("userId")));

  const providerData = { authenticated, userId };

  // We can now use this as a component to wrap anything
  // that needs our state
  return (
    <userContext.Provider value={providerData}>
      {props.children}
    </userContext.Provider>
  );
}
