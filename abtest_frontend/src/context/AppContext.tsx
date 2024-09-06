"use client"


import React, { Dispatch, createContext, useReducer } from "react";

type StateType = {
  loading: boolean;
  error: {
    isError: boolean,
    message: string
  };
  isSidebarOpen: boolean
  subSideBar: {
    isOpen: boolean,
    component: React.ReactNode
  },
  isLogin: boolean
};

type ActionType = {
  type: string;
  value?: any; // Add a value property to ActionType
};

const initialState: StateType = {
  loading: false,
  error: {
    isError: false,
    message: ''
  },
  isSidebarOpen: true,
  subSideBar: {
    isOpen: false,
    component: null
  },
  isLogin: false
};

const reducer = (
    state: StateType, 
    action: ActionType) => 
    {
    switch (action.type) {
        case "LOADING":
          return {
              ...state,
              loading: action.value 
          };
        case "ERROR":
          return {
              ...state,
              error: action.value
          };
        case "SUB_SIDE_BAR":
          return {
            ...state,
            subSideBar: action.value
        };
        case "LOGIN":
          return {
            ...state,
            isLogin: action.value
          }
        default:
        return state;
    }
};

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });


export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};


export const setLoading = (
  dispatch: Dispatch<ActionType>, 
  value: boolean
) => dispatch({ type: "LOADING", value });

export const setError = (
    dispatch: Dispatch<ActionType>,
    value:  { isError: boolean; message: string }
) => dispatch({ type: "ERROR", value });


export const setSubSideBar = (
  dispatch: Dispatch<ActionType>,
  value: {isOpen: boolean, component: React.ReactNode}
) => dispatch({type:"SUB_SIDE_BAR", value})

export const setIsLogin = ( 
  dispatch: Dispatch<ActionType>,
  value: boolean
) => dispatch({type:"LOGIN", value})
  