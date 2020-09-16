import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import { fetchUsers } from '../services'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useUIState, useUIDispatch } from '../context/UI'
import { useUserDispatch, useUserState } from '../context/User'
import { Paper, makeStyles, Grid } from '@material-ui/core'
import NoUserSelected from '../components/NoUserSelected'
import ActiveUser from '../components/ActiveUser'
import Users from '../components/Users'
import SearchBar from '../components/SearchBar'
import UserProfileBar from '../components/UserProfileBar'
import TextArea from '../components/TextArea'
import Messages from '../components/Messages'
import Navbar from '../components/Navbar'
import VideoCall from '../components/VideoCall'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '95vh',
    margin: 'auto',
    zIndex: 1,
  },

  messageBox: {
    background: `url(${require('../assets/message_bg.png')})`,
  },

  search: {
    background: 'rgb(246,246,246)',
    padding: '8px 16px 8px 16px',
  },
}))

function Chat({ history }) {
  const classes = useStyles()
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))

  const uiState = useUIState()
  const uiDispatch = useUIDispatch()

  const userState = useUserState()
  const userDispatch = useUserDispatch()

  const [stream, setStream] = useState(null)
  let userVideo = useRef()
  let partnerVideo = useRef()

  useEffect(() => {
    if (!userState.currentUser) {
      history.push('/login')
    }

    userState.socket.on('end_call', () => {
      CleanUpAndEndCall()
    })

    userState.socket.on('hey', (data) => {
      userDispatch({ type: 'RECEIVING_CALL', payload: true })
      userDispatch({ type: 'CALLER', payload: data.from })
      userDispatch({ type: 'CALLER_SIGNAL', payload: data.signal })
    })
  }, [])

  useEffect(() => {
    uiDispatch({ type: 'SCREEN', payload: mdUp })
  }, [mdUp])

  useEffect(() => {
    userDispatch({ type: 'LOADING', payload: true })
    fetchUsers()
      .then((res) => {
        userDispatch({ type: 'SET_USERS', payload: res.users })
        userDispatch({ type: 'LOADING', payload: false })
      })
      .catch((err) => {
        console.log(err)
        userDispatch({ type: 'LOADING', payload: false })
      })
    userDispatch({ type: 'LOADING', payload: true })
  }, [])

  function CleanUpAndEndCall() {
    userDispatch({ type: 'RECEIVING_CALL', payload: false })
    userDispatch({ type: 'CALLER', payload: null })
    userDispatch({ type: 'CALLER_SIGNAL', payload: null })
    userDispatch({ type: 'CALL_ACCEPTED', payload: false })
    userDispatch({ type: 'VIDEO_WINDOW', payload: false })
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }

  ///////////

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
          {
            urls: 'turn:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
        ],
      },
      stream: stream,
    })

    peer.on('signal', (data) => {
      userState.socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: userState.currentUser,
      })
    })

    peer.on('stream', (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream
      }
    })

    userState.socket.on('callAccepted', (signal) => {
      userDispatch({ type: 'CALL_ACCEPTED', payload: true })
      peer.signal(signal)
    })
  }

  function acceptCall() {
    userDispatch({ type: 'CALL_ACCEPTED', payload: true })
    userDispatch({ type: 'VIDEO_WINDOW', payload: true })
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    })
    peer.on('signal', (data) => {
      userState.socket.emit('acceptCall', {
        signal: data,
        to: userState.caller.id,
      })
    })

    peer.on('stream', (stream) => {
      if (partnerVideo) {
        partnerVideo.current.srcObject = stream
      }
    })

    peer.signal(userState.callerSignal)
  }

  const endCall = () => {
    if (userState.selectedUser) {
      userState.socket.emit('end_call', userState.selectedUser.id)
    }
    CleanUpAndEndCall()
  }

  const MainScreen = () => {
    if (userState.videoWindow || userState.receivingCall) {
      return (
        <VideoCall
          stream={stream}
          setStream={setStream}
          partnerVideo={partnerVideo}
          userVideo={userVideo}
          callPeer={callPeer}
          endCall={endCall}
        />
      )
    } else {
      return <Messages />
    }
  }
  //////////////////
  return (
    <div>
      {uiState.mdUp && <Navbar />}
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ position: 'relative' }}
      >
        <Grid item xs={12} sm={12} md={10}>
          <Paper
            className={classes.paper}
            style={{ marginTop: mdUp && '24px' }}
          >
            <Grid
              container
              spacing={0}
              style={{ width: '100%', height: '100%' }}
            >
              {mdUp ? (
                <Grid item md={4}>
                  <ActiveUser />
                  <div className={classes.search}>
                    <SearchBar text="Search or start new chat" icon={true} />
                  </div>
                  <Users />
                </Grid>
              ) : null}

              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                className={userState.selectedUser && classes.messageBox}
                style={{
                  position: 'relative',
                  background: !userState.selectedUser && 'rgb(248,249,250)',
                }}
              >
                <UserProfileBar acceptCall={acceptCall} endCall={endCall} />
                {!userState.selectedUser && !userState.videoWindow && (
                  <NoUserSelected mdUp={mdUp} />
                )}
                <div
                  style={{
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    width: '100%',
                    height: '80vh',
                  }}
                >
                  {MainScreen()}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '4px',
                    width: '100%',
                    height: '65px',
                  }}
                >
                  {userState.selectedUser && !userState.videoWindow && (
                    <TextArea />
                  )}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat
