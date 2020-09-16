import React, { createContext, useReducer, useContext, useEffect } from 'react'
import io from 'socket.io-client'
const UserStateContext = createContext()
const UserDispatchContext = createContext()

const ENDPOINT = 'https://whatsappme.herokuapp.com/'

let userState = {
  users: [],
  loading: false,
  selectedUser: null,
  currentUser: null,
  socket: null,
  videoWindow: false,
  receivingCall: false,
  caller: null,
  callerSignal: null,
  callAccepted: false,
  messages: [],
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      }

    case 'SET_USER':
      return {
        ...state,
        users: [action.payload, ...state.users],
      }

    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      }

    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    case 'LOGOUT':
      const usersData = state.users.filter((user) => user.id !== action.payload)
      return {
        ...state,
        currentUser: null,
        users: usersData,
      }

    case 'REMOVE_USER':
      const users_data = state.users.filter(
        (user) => user.id !== action.payload,
      )
      return {
        ...state,
        users: users_data,
      }

    case 'SOCKET':
      return {
        ...state,
        socket: action.payload,
      }

    case 'VIDEO_WINDOW':
      return {
        ...state,
        videoWindow: action.payload,
      }

    case 'RECEIVING_CALL':
      return {
        ...state,
        receivingCall: action.payload,
      }

    case 'CALLER':
      return {
        ...state,
        caller: action.payload,
      }
    case 'CALLER_SIGNAL':
      return {
        ...state,
        callerSignal: action.payload,
      }
    case 'CALL_ACCEPTED':
      return {
        ...state,
        callAccepted: action.payload,
      }

    case 'MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    default:
      throw new Error(`unknown action type ${action.type}`)
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userState)

  useEffect(() => {
    console.log(userState)
    const socket = io(`${ENDPOINT}`)
    dispatch({ type: 'SOCKET', payload: socket })

    socket.on('users', (data) => {
      dispatch({ type: 'SET_USERS', payload: data.users })
    })

    socket.on('message', (data) => {
      dispatch({ type: 'MESSAGE', payload: data })
    })

    return () => {
      socket.emit('disconnect')
      socket.on('users', (data) => {
        dispatch({ type: 'SET_USERS', payload: data.users })
      })
    }
  }, [])
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export const useUserState = () => useContext(UserStateContext)
export const useUserDispatch = () => useContext(UserDispatchContext)
