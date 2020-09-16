import React, { Fragment } from 'react'
import Peer from 'simple-peer'
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  IconButton,
  ListItemSecondaryAction,
  makeStyles,
  ListItemText,
  Typography,
  ListItemIcon,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { useUserState, useUserDispatch } from '../context/User'
import { useUIState } from '../context/UI'
import UserDrawer from './UserDrawer'
import { MoreVert, VideoCall, Call as CallIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  iconbutton: {
    color: 'rgb(145,145,145)',
  },
}))
function UserProfileBar({ acceptCall, endCall }) {
  const classes = useStyles()
  const uiState = useUIState()

  const userState = useUserState()

  const userDispatch = useUserDispatch()

  const handleVideoCall = () => {
    userDispatch({ type: 'VIDEO_WINDOW', payload: true })
  }
  return (
    <List style={{ background: 'rgb(237,237,237)' }}>
      <ListItem>
        {!uiState.mdUp && (
          <ListItemIcon>
            <UserDrawer />
          </ListItemIcon>
        )}
        {userState.selectedUser && (
          <Fragment>
            <ListItemAvatar>
              <Avatar>
                {userState.loading ? (
                  <Skeleton variant="circle" width="100%" height="100%" />
                ) : (
                  userState.selectedUser.name.slice(0, 2).toUpperCase()
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                userState.loading ? (
                  <Skeleton variant="text" />
                ) : (
                  <Typography style={{ fontSize: '16px' }}>
                    {userState.selectedUser.name}
                  </Typography>
                )
              }
              style={{ margin: 0, padding: 0 }}
            />
          </Fragment>
        )}

        {userState.caller && (
          <Fragment>
            {userState.callAccepted ? (
              <IconButton style={{ color: 'seagreen' }} onClick={endCall}>
                <CallIcon style={{ color: 'tomato' }} />
              </IconButton>
            ) : (
              <IconButton style={{ color: 'seagreen' }} onClick={acceptCall}>
                <CallIcon />
              </IconButton>
            )}
            <ListItemText
              primary={
                userState.loading ? (
                  <Skeleton variant="text" />
                ) : (
                  <Typography style={{ fontSize: '16px' }}>
                    {userState.caller.name}
                  </Typography>
                )
              }
              secondary={
                userState.loading ? (
                  <Skeleton variant="text" />
                ) : (
                  <Typography
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: '13px',
                      color: '#00000099',
                    }}
                  >
                    {userState.callAccepted ? 'end call' : 'Incomming call'}
                  </Typography>
                )
              }
              style={{ margin: 0, padding: 0 }}
            />
          </Fragment>
        )}
        <ListItemSecondaryAction>
          {userState.selectedUser && (
            <IconButton
              className={classes.iconbutton}
              onClick={handleVideoCall}
            >
              <VideoCall style={{ color: 'blue' }} />
            </IconButton>
          )}
          <IconButton className={classes.iconbutton}>
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default UserProfileBar
