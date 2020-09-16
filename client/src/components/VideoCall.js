import React, { useEffect, useState, useRef } from 'react'
import { useUserDispatch, useUserState } from '../context/User'
import { Paper, Button } from '@material-ui/core'
import { CallEnd as CallEndIcon, Call as CallIcon } from '@material-ui/icons'

function VideoCall({
  stream,
  setStream,
  callPeer,
  partnerVideo,
  userVideo,
  endCall,
}) {
  const userState = useUserState()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream)

        if (userVideo.current) {
          userVideo.current.srcObject = stream
        }
      })

    userState.socket.on('end_call', () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    })

    userState.socket.on('hey', (data) => {
      userDispatch({ type: 'RECEIVING_CALL', payload: true })
      userDispatch({ type: 'CALLER', payload: data.from })
      userDispatch({ type: 'CALLER_SIGNAL', payload: data.signal })
    })
  }, [])

  let UserVideo
  if (stream) {
    UserVideo = (
      <video
        playsInline
        muted
        ref={userVideo}
        autoPlay
        width="100%"
        height="100%"
      />
    )
  }

  let PartnerVideo
  if (userState.callAccepted) {
    PartnerVideo = (
      <video
        playsInline
        ref={partnerVideo}
        autoPlay
        width="100%"
        height="100%"
      />
    )
  }

  return (
    <div>
      <Paper style={{ position: 'relative', width: '100%', height: '80vh' }}>
        {UserVideo}
        <Paper
          style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            right: 20,
            bottom: 20,
          }}
        >
          {PartnerVideo}
        </Paper>
        {userState.selectedUser && (
          <>
            {userState.callAccepted ? (
              <Button
                onClick={endCall}
                style={{
                  position: 'absolute',
                  color: 'white',
                  bottom: 20,
                  left: 20,
                  background: 'tomato',
                }}
                startIcon={<CallEndIcon />}
              >
                End call {userState.selectedUser.name}
              </Button>
            ) : (
              <Button
                onClick={() => callPeer(userState.selectedUser.id)}
                style={{
                  position: 'absolute',
                  color: 'white',
                  bottom: 20,
                  left: 20,
                  background: 'seagreen',
                }}
                startIcon={<CallIcon />}
              >
                Call {userState.selectedUser.name}
              </Button>
            )}
          </>
        )}
      </Paper>
    </div>
  )
}

export default VideoCall
