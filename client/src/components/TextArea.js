import React, { useState } from 'react'
import { useUserState, useUserDispatch } from '../context/User'
import { Paper, IconButton, TextField } from '@material-ui/core'
import {
  EmojiEmotionsOutlined as EmojiIcon,
  MicRounded,
  AttachFile,
  Send,
} from '@material-ui/icons'

function TextArea() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const userState = useUserState()
  const userDispatch = useUserDispatch()

  const sendMessge = (e) => {
    e.preventDefault()
    setError('')
    let payload = {
      to: userState.selectedUser.id,
      from: userState.currentUser.id,
      text: message,
    }
    userState.socket.emit('message', payload, (error) => setError(error))
    setMessage("")
  }
  return (
    <div>
      <Paper
        style={{
          background: 'rgb(240,240,240)',
          width: '100%',
          height: '65px',
          padding: '10px',
        }}
        elevation={0}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div>
            <IconButton>
              <EmojiIcon style={{ color: 'rgb(151,151,151)' }} />
            </IconButton>
          </div>

          <div>
            <IconButton>
              <AttachFile style={{ color: 'rgb(151,151,151)' }} />
            </IconButton>
          </div>

          <div style={{ flexGrow: 2 }}>
            <TextField
              style={{ width: '100%' }}
              value={message}
              onChange={(e) => {
                setError('')
                setMessage(e.target.value)
              }}
              error={error || message.trim().length === 0}
              helperText={error && error}
            />
          </div>
          <IconButton onClick={sendMessge} disabled={!userState.selectedUser}>
            <Send style={{ color: 'rgb(151,151,151)' }} />
          </IconButton>
          <div>
            <IconButton>
              <MicRounded style={{ color: 'rgb(151,151,151)' }} />
            </IconButton>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default TextArea
