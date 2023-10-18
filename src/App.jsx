import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import PropaneIcon from '@mui/icons-material/Propane';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Outlet } from 'react-router-dom';
import { Divider } from '@mui/material';

function App() {
  return (
    <Box sx={{maxWidth: "465px", margin: "0px auto", display: "flex", flexDirection: "column", height: "100vh", justifyContent:"space-between", alignItems: "stretch"}}>
       <AppBar position="static" elevation={1}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          KBSTORE
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Paper  variant = "outlined" className="app" sx={{ padding: "1.5rem", marginY: "3px", flexGrow: 1, borderBottom: 0}}>
        <Outlet />
      </Paper>
      <Divider />
      <Paper sx={{padding: "10px"}}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<PropaneIcon color="primary"/>} />
          <BottomNavigationAction label="Favorites" icon={<PropaneIcon />} />
          <BottomNavigationAction label="Archive" icon={<PropaneIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default App
