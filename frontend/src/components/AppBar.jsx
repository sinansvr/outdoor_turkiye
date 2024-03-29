import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import BadgeAvatar from './BadgeAvatar';
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall"



const pages = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Blogs", url: "/blogs" },
  { id: 3, title: "New Blog", url: "/newblog" }];

const settings = [
  { id: 1, title: "Profile", url: "/profile" },
  { id: 2, title: "My Blogs", url: "/myblogs" },
  { id: 3, title: "Logout", url: "logout" }];



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  let {token} = useSelector((state)=>state.auth)
  const {logout} = useAuthCall()
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                to="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                OUTDOOR TURKIYE
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <NavLink to={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {page.title}
                        </NavLink>
                      </Typography>

                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <NavLink style={{ textDecoration: "none", color: "white", letterSpacing: "0.1rem" }} to={page.url}>
                      {page.title}
                    </NavLink>

                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip >

                  <IconButton onClick={token ? handleOpenUserMenu : () => navigate("/login")} sx={{ p: 0 }}>
                    {token ? <BadgeAvatar /> : <Typography sx={{color:"white", backgroundColor:"green", px:2, py:1, borderRadius:3, cursor:"pointer", "&:hover":{transform:"scale(0.9)"},transition: "transform 0.3s"}} variant='button'>Get Start</Typography>}
                  </IconButton>

                </Tooltip>

                {token && <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.id} onClick={handleCloseUserMenu} >
                      
                        <Typography  textAlign="center">                         
                          
                          <NavLink onClick={()=>setting.title === "Logout" && logout()} to={setting.url} style={{textDecoration:"none", color:'black'}}>{setting.title}</NavLink>
                          
                        </Typography>
                      
                      
                    </MenuItem>
                  ))}
                </Menu>}

              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>
    </Grid>

  );
}
export default ResponsiveAppBar;

// {
//   settings.map((setting) => (
//     <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
//       <Typography textAlign="center">

        // {setting.title === 'Logout' ? <NavLink onClick={() => logout()} to={setting.url} > {setting.title}</NavLink>
//         :
//           <NavLink onClick={() => setting.title === 'Logout' && logout()} style={({ isActive }) => ({ color: isActive ? "rgb(255, 47, 47)" : 'black', textDecoration: 'none' })} to={setting.url} > {setting.title}</NavLink>}

//       </Typography>
//     </MenuItem>
//   ))
// }