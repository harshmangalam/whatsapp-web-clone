import React, { Fragment } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core'
import { useUserState, useUserDispatch } from '../context/User'
import { Skeleton } from '@material-ui/lab'

function Users() {
  const userState = useUserState()
  const userDispatch = useUserDispatch()
  return (
    <List style={{ marginTop: 0, paddingTop: 0 }}>
      {userState.users &&
        userState.users
          .filter((u) => u.id !== userState.currentUser.id)
          .map((user) => (
            <Fragment key={user.id}>
              <ListItem
                button
                onClick={() =>
                  userDispatch({ type: 'SET_SELECTED_USER', payload: user })
                }
              >
                <ListItemAvatar>
                  <Avatar style={{ width: '50px', height: '50px',background:'seagreen',color:'white' }}>
                    {userState.loading ? (
                      <Skeleton variant="circle" width="100%" height="100%" />
                    ) : (
                      user.name.slice(0, 2).toUpperCase()
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    userState.loading ? (
                      <Skeleton variant="text" />
                    ) : (
                      <Typography
                        style={{ fontWeight: '400', fontSize: '17px' }}
                      >
                        {user.name}
                      </Typography>
                    )
                  }

                  style={{ marginLeft: '8px' }}
                />
              
              </ListItem>
              <Divider variant="inset" />
            </Fragment>
          ))}
    </List>
  )
}

export default Users
