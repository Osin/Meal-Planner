import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Typography from '@mui/material/Typography';

const footer = () => (
    <AppBar position="sticky" color="primary"><Toolbar variant={'dense'}>
          <Typography>Copyright 2023 - Housseini Toumani</Typography>
          <Typography>
                <a href="https://www.flaticon.com/free-icons/lunch" title="lunch icons">
                      Lunch icons created by Linector - Flaticon
                </a>
          </Typography>
    </Toolbar>
</AppBar>
)
;
export default footer;