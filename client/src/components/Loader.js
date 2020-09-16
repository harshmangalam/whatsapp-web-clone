import React from 'react'
import { Paper, CircularProgress, Backdrop } from '@material-ui/core'

function Loader() {
  return (
    <Backdrop open={true}>
      <Paper style={{padding:"16px"}}>
        <CircularProgress style={{color:"tomato"}} />
      </Paper>
    </Backdrop>
  )
}

export default Loader
