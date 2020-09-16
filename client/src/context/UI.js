import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { useUserState } from './User'
const UIStateContext = createContext()
const UIDispatchContext = createContext()

let uiState = {
  showNavbar: false,
  showVideoCallScreen: false,
  showDrawer: false,
  loading: false,
  mdUp: '',
  alerts: [],
}

const uiReducer = (state, action) => {
  switch (action.type) {
    case 'NAVBAR':
      return {
        ...state,
        showNavbar: action.payload,
      }

    case 'VIDEOCALL_SCREEN':
      return {
        ...state,
        showVideoCallScreen: action.payload,
      }

    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    case 'DRAWER':
      return {
        ...state,
        showDrawer: action.payload,
      }

    case 'SCREEN':
      return {
        ...state,
        mdUp: action.payload,
      }

    case 'ALERT':
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      }
    default:
      throw new Error(`unknown action type ${action.type}`)
  }
}

export const UIProvider = ({ children }) => {
  const userState = useUserState()
  const [state, dispatch] = useReducer(uiReducer, uiState)

  return (
    <UIStateContext.Provider value={state}>
      <UIDispatchContext.Provider value={dispatch}>
        {children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  )
}

export const useUIState = () => useContext(UIStateContext)
export const useUIDispatch = () => useContext(UIDispatchContext)
