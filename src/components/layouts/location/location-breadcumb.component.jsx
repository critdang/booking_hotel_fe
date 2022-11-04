import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Box, CssBaseline } from '@mui/material';
const theme = createTheme();

export default function LocationBreadcumb() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
          }}
        >
          <Container maxWidth="lg">
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  to="/"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Home
                </Link>
                <Typography color="text.primary">Location</Typography>
              </Breadcrumbs>
            </div>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
