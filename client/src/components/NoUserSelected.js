import React from 'react'
import { makeStyles, Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '95vh',
    maxWidth: '460px',
    margin: 'auto',
  },

  heading: {
    color: '#525252',

    fontWeight: '400',
    marginTop: '24px',
  },
  subtitle: {
    color: '#00000073',
    fontSize: '13px',
    marginTop: '8px',
  },
}))
function NoUserSelected({ mdUp }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Avatar
        style={{
          width: mdUp ? '360px' : '280px',
          height: mdUp ? '360px' : '280px',
        }}
      >
        <img
          src="https://web.whatsapp.com//img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg"
          width="100%"
          height="100%"
        />
      </Avatar>
      <Typography
        className={classes.heading}
        style={{ fontSize: mdUp ? '36px' : '26px' }}
      >
        Select user to start Text + Video chat
      </Typography>

      
    </div>
  )
}

export default NoUserSelected
