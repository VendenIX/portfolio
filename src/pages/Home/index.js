import React from 'react';
import { Typography, Box } from '@mui/material';
import ProfileImage from '../../assets/p1.jpg';

const Home = () => {
    return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h3">Étudiant en Intelligence Artificielle</Typography>
                    <Typography variant="body1">Je suis passionné par l'intelligence artificielle et j'aimerais apporter ma contribution à ce domaine fascinant.</Typography>
                </Box>
                
                <Box sx={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', m: 2 }}>
                    <img 
                        src={ProfileImage} 
                        alt="Profile" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </Box>
                
            </Box>
    );
};

export default Home;
