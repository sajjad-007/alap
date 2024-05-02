import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const RootLayout = () => {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar/>  
                </Grid>
                <Grid item xs={10}>
                    <Outlet/>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default RootLayout