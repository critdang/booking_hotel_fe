import * as React from 'react';
import { AppBar, Badge, Fab, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useCart } from '../../../context/cart/cart.provider';
export default function HeaderHome() {
  // [START - useContext]
  const { state } = useCart();
  // [END - useContext]

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

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Box sx={{ position: 'fixed', bottom: 80, right: 16, mr: 1 }}>
          <Fab>
            <Link to="/cart">
              <IconButton aria-label={notificationsLabel(3)}>
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
            </Link>
          </Fab>
        </Box>
      </Container>
    </AppBar>
  );
}
