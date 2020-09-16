import React, { useEffect, Fragment } from 'react'
import { makeStyles, Grid, Typography, Paper, Avatar } from '@material-ui/core'
import Readed from './svg/Readed'
import { useUserState } from '../context/User'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: '16px 8px 26px 8px',
  },

  me: {
    background: 'rgb(220,245,198)',
    padding: '8px',
    maxWidth: '60%',
    float: 'right',
  },

  partner: {
    background: '#fff',
    padding: '8px',
    maxWidth: '60%',
    margin: 'auto',
    float: 'left',
    padding: '8px',
  },
  date: {
    fontSize: '12px',
    color: '#00000099',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px',
    margin: 'auto',
  },
}))
function Messages() {
  const classes = useStyles()
  const userState = useUserState()
  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center" justify="center">
        {userState.messages &&
          userState.selectedUser &&
          userState.messages
            .filter(
              (m) =>
                (m.from == userState.currentUser.id ||
                  m.from == userState.selectedUser.id) &&
                (m.to == userState.currentUser.id ||
                  m.to == userState.selectedUser.id),
            )
            .map((message, i) => (
              <Fragment key={i}>
                {userState.currentUser.id !== message.from ? (
                  <Grid item md={12} xs={12} sm={12}>
                    <Paper className={classes.partner}>
                      <Typography>{message.text}</Typography>
                      <Typography className={classes.date}>
                        {`${new Date(message.time).getHours()} : ${new Date(
                          message.time,
                        ).getMinutes()}`}
                      </Typography>
                    </Paper>
                  </Grid>
                ) : (
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: '16px' }}
                  >
                    <Paper className={classes.me}>
                      <Typography>{message.text}</Typography>
                      <Typography className={classes.date}>
                        {`${new Date(message.time).getHours()} : ${new Date(
                          message.time,
                        ).getMinutes()}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Fragment>
            ))}
      </Grid>
    </div>
  )
}

export default Messages
