import React, { useState } from 'react'
import { Menu as MenuIcon } from '@material-ui/icons'
import { IconButton, Drawer } from '@material-ui/core'
import Users from './Users'
import ActiveUser from './ActiveUser'
function UserDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <IconButton
        style={{ color: 'rgb(145,145,145)' }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon style={{ color: 'tomato' }} />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(!open)}
        variant="temporary"
      >
        <div style={{width:'320px'}}>
          <ActiveUser setOpen={setOpen}/>
          <Users />
        </div>
      </Drawer>
    </div>
  )
}

export default UserDrawer
