import React, { useEffect } from 'react'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useUIState, useUIDispatch } from '../context/UI'
import { useUserState, useUserDispatch } from '../context/User'



function Home({ history }) {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))

  const uiState = useUIState()
  const uiDispatch = useUIDispatch()
 
  const userState = useUserState()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    uiDispatch({ type: 'SCREEN', payload: mdUp })
  }, [mdUp])

  useEffect(() => {
    if (userState.currentUser) {
      history.push('/chat')
    }
    history.push('/login')
  }, [])

  return <div></div>
}

export default Home
