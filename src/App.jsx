import { Box, Button, Container, CssBaseline } from '@mui/material'
import Dashboard from './features/dashboard'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{height: '100vh'}}>
        <Outlet />
      </Box>
    </>
  )
}

export default App
