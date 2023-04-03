import * as React from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { Container } from '@mui/system';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import PersonIcon from '@mui/icons-material/Person';
import { useCart } from '../../../context/cart/cart.provider';
import { useAuth } from '../../../context/auth/auth';
import { useEffect } from 'react';

export default function HeaderHome() {
  // [START - useContext]
  const { state } = useCart();
  // [END - useContext]
  const navigate = useNavigate();

  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const openMenu = Boolean(anchorElMenu);

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  // style badgeContent
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -4,
      top: 5,
      padding: '0 4px',
    },
  }));
  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    window.location.reload();
  };
  const { signed } = useAuth();
  // [START] - get selectedBranch from sessionStorage
  const [selectedBranch, setSelectedBranch] = React.useState();

  useEffect(() => {
    const branch = JSON.parse(sessionStorage.getItem('selectedBranch'));
    if (branch !== null) {
      setSelectedBranch(branch);
    } else {
      setSelectedBranch(null);
    }
  }, []);
  // [END] - get selectedBranch from sessionStorage

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0px 0px 0px 0px',
        paddingTop: '10px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar id="back-to-top-anchor">
          {/* START - LOGO on laptop */}
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <Typography
              variant="h3"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'roboto',
                fontWeight: 500,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CASA 3
            </Typography>
          </Link>
          {/* END - LOGO on laptop */}

          {/* START - MENU on responsive */}
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'black', textDecoration: 'none' }}>
                    Home
                  </Button>
                </Link>
              </MenuItem>
              {selectedBranch && selectedBranch !== null && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to={`/room`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Button sx={{ color: 'black', textDecoration: 'none' }}>
                      Dorm & Rooms
                    </Button>
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/activities"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Button sx={{ color: 'black', textDecoration: 'none' }}>
                    Activities
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/about"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Button sx={{ color: 'black', textDecoration: 'none' }}>
                    About
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/location"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Button sx={{ color: 'black' }}>Location</Button>
                </Link>
              </MenuItem>
              {/* <MenuItem onClick={handleCloseNavMenu}> */}
              {/* <Link to="/profile">
                  <Button underline="none" sx={{ color: 'black' }}>
                    <PersonIcon></PersonIcon>
                  </Button>
                </Link> */}
              {/* </MenuItem> */}
              <MenuItem onClick={handleCloseNavMenu}>
                {signed ? (
                  <Button
                    sx={{ color: 'black', textDecoration: 'none' }}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button sx={{ color: 'black' }}>Login</Button>
                  </Link>
                )}
              </MenuItem>
              {signed && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button onClick={handleCloseMenu} sx={{ color: 'black' }}>
                    <Link
                      to="/profile"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      Profile
                    </Link>
                  </Button>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Grid container>
                  <Grid xs={6} sm={6} md={6} item>
                    <a
                      href="https://www.facebook.com/Crit1008/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', padding: '0 25px' }}
                    >
                      <FaFacebookF />
                    </a>
                  </Grid>
                  <Grid xs={6} sm={6} md={6} item>
                    <a
                      href="https://www.instagram.com/thesecretgarden/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        padding: '0 25px',
                      }}
                    >
                      <AiOutlineInstagram size="20px" />
                    </a>
                  </Grid>
                </Grid>
              </MenuItem>
            </Menu>
          </Box>
          {/* END - MENU on responsive */}

          {/* START - LOGO on responsive */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'roboto',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              CASA 3
            </Link>
          </Typography>
          {/* END - LOGO on responsive */}

          {/* START - MENU on laptop */}
          <Box
            sx={{
              justifyContent: 'right',
              flexGrow: 1,
              alignItems: 'center',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'black', textDecoration: 'none' }}>
                Home
              </Button>
            </Link>
            {selectedBranch && selectedBranch !== null && (
              <Link to="/room" style={{ textDecoration: 'none' }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    color: 'black',
                    '&:hover': {
                      opacity: '50%',
                    },
                  }}
                >
                  Dorm & Rooms
                </Button>
              </Link>
            )}

            <div>
              <Link
                to="/activities"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Button sx={{ color: 'black', textDecoration: 'none' }}>
                  Activities
                </Button>
              </Link>
              <Link
                to="/about"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Button sx={{ color: 'black', textDecoration: 'none' }}>
                  About
                </Button>
              </Link>
              <Link
                to="/location"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Button sx={{ color: 'black', textDecoration: 'none' }}>
                  Location
                </Button>
              </Link>

              {signed ? (
                <Button
                  sx={{ color: 'black', textDecoration: 'none' }}
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'black' }}>Login</Button>
                </Link>
              )}
              {signed && (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleClickMenu}
                    sx={{
                      color: 'black',
                      '&:hover': {
                        opacity: '50%',
                      },
                    }}
                  >
                    <Avatar
                      alt="avatar"
                      src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                      sx={{ width: 30, height: 30 }}
                    />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorElMenu}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <Link
                      to="/profile"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <MenuItem
                        onClick={handleCloseMenu}
                        sx={{ color: 'black' }}
                      >
                        Profile
                      </MenuItem>
                    </Link>
                    <Link
                      to="/orders"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <MenuItem
                        onClick={handleCloseMenu}
                        sx={{ color: 'black' }}
                      >
                        My Orders
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              )}
            </div>
            {/* <Link to="/cart">
              <IconButton aria-label={notificationsLabel(4)}>
                <StyledBadge badgeContent={state.count} color="success">
                  <ShoppingCartIcon
                    cursor="pointer"
                    sx={{
                      color: 'white',
                      stroke: 'black',
                      verticalAlign: 'bottom',
                    }}
                  >
                    Cart
                  </ShoppingCartIcon>
                </StyledBadge>
              </IconButton>
            </Link> */}
            {/* <Link to="/profile">
              <PersonIcon
                cursor="pointer"
                sx={{
                  color: 'white',
                  stroke: 'black',
                  verticalAlign: 'bottom',
                }}
              ></PersonIcon>
            </Link> */}
          </Box>
          {/* END - MENU on laptop */}

          {/* Start- Book & Social icon on laptop */}
          {selectedBranch && selectedBranch !== null && (
            <Box sx={{ flexGrow: 0 }}>
              <Link
                to="/room"
                style={{ textDecoration: 'none', paddingLeft: '30px' }}
              >
                <Button variant="outlined" color="error">
                  Book
                </Button>
              </Link>
            </Box>
          )}
          {/* End- Book & Social icon on laptop */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
