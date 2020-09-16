import React from 'react'
import { AppBar, Toolbar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: 'rgb(48,151,136)',
    width: '100vw',
    height: '127px',
    zIndex:0,
  },
}))
function Navbar() {
  const classes = useStyles()
  return (
    <AppBar className={classes.appbar} elevation={0} >
      <Toolbar></Toolbar>
    </AppBar>
  )
}

export default Navbar
