import React, { useEffect, useState, useRef } from 'react'
import { useUIState, useUIDispatch } from '../context/UI'
import { useUserDispatch, useUserState } from '../context/User'
import { Paper, Grid, TextField, Button, Typography } from '@material-ui/core'
import Navbar from '../components/Navbar'

const ENDPOINT = 'http://localhost:5000/'

function Home({ history }) {
  const uiState = useUIState()
  const uiDispatch = useUIDispatch()
  const userDispatch = useUserDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const userState = useUserState()

  useEffect(() => {
    userState.socket.on('login', (data) => {
      userDispatch({ type: 'SET_CURRENT_USER', payload: data.user })
      history.push('/chat')
    })

    userState.socket.on('alert', (data) => {
      console.log(data)
      uiDispatch({
        type: 'ALERT',
        payload: { type: 'success', text: data.text },
      })
    })
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (!name || name.trim().length === 0) {
      setError('your name is required to enter chat room')
      return
    }
    userState.socket.emit('login', { name }, (err) => {
      setError(err)
    })
  }
  return (
    <div>
      <Navbar />
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={4}>
          <Paper style={{ marginTop: '200px', padding: '32px' }} elevation={12}>
            <Typography variant="h4">One Step to Start Chat</Typography>

            <TextField
              error={Boolean(error)}
              label="name"
              helperText={error ? error : null}
              variant="outlined"
              value={name}
              onChange={(e) => {
                setError('')
                setName(e.target.value)
              }}
              style={{ width: '100%', marginTop: '32px', marginBottom: '16px' }}
            />
            <Button
              onClick={handleLogin}
              style={{
                width: '100%',
                background: 'rgb(8,157,247)',
                color: 'white',
                fontSize: '20px',
                fontWeight: '700',
                padding: '8px',
              }}
            >
              Enter
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
