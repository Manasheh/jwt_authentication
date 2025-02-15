import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Stack } from '@mui/material'

const Header = () => {
  return (
    <div>
      <Stack spacing={2} direction={'row'}>
        <Button LinkComponent={Link} to='/'>Home</Button>
        <Button LinkComponent={Link} to='/login'>Login</Button>
        <Button LinkComponent={Link} to='/register'>Register</Button>
        <Button LinkComponent={Link} to='/dashboard'>DashBoard</Button>
      </Stack>
    </div>
  )
}

export default Header
