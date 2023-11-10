import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {FoodBankOutlined} from '@mui/icons-material';

export default function Header() {
  return (
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{alignSelf: {xs: 'center', md: 'inherit'}}}>
          <FoodBankOutlined sx={{display: {xs: 'flex', md: 'flex'}, mr: 1}}/>
          <Typography
              variant="h5"
              noWrap
              component="h1"
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'flex'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
          >
            Meal Planner
          </Typography>
          <Typography variant={'subtitle1'}
                      sx={{display: {xs: 'none', md: 'block'}}}>
            A free app for planning meal without sharing your data
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
