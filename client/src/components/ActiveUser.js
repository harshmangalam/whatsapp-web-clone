import React from 'react'
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
} from '@material-ui/core'

import { ArrowBack } from '@material-ui/icons'

import { useUserState } from '../context/User'
const useStyles = makeStyles((theme) => ({
  iconbutton: {
    color: 'rgb(145,145,145)',
  },
}))
function ActiveUser({setOpen}) {
  const classes = useStyles()
  const userState = useUserState()

  return (
    <List style={{ background: 'rgb(237,237,237)' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{background:'tomato',color:'white'}}>
           {userState.currentUser && userState.currentUser.name.slice(0,2).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography>{userState.currentUser.name}</Typography>}
        ></ListItemText>
        <ListItemSecondaryAction>
          <IconButton  onClick={()=>setOpen(false)}>
            <ArrowBack />
          </IconButton>
         
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default ActiveUser
