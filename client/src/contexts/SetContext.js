import {createContext, useState, useEffect, useContext} from 'react';
import {userContext} from "./UserContext";
import axios from 'axios';
// Create a Context
export const setContext = createContext();

// Create a Component wrapper from Context.Provider
export default function SetProvider(props) {
  // Here is our Shared State Object

  // This list can get long with a lot of functions.  Reducer may be a better choice
  const providerData = { };

  // We can now use this as a component to wrap anything
  // that needs our state
  return (
    <setContext.Provider value={providerData}>
      {props.children}
    </setContext.Provider>
  );
};