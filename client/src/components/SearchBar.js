import React from 'react'
import { makeStyles, InputBase } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '50px 50px 50px 50px',
    backgroundColor: '#fff',
  },

  searchIcon: {
    color: 'rgb(159,159,159)',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
    padding: '3px 10px 3px 0px',
    width:'100%'
  },
  inputInput: {
    flexGrow: 1,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}))
function SearchBar({ text ,icon=false}) {
  const classes = useStyles()
  return (
    <div className={classes.search}>
      {icon && (
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
      )}
      <InputBase
        placeholder={text}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  )
}

export default SearchBar
