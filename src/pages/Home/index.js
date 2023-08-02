import React from 'react';
import { Typography, Box } from '@mui/material';
import ProfileImage from '../../assets/p1.jpg';
import '../../App.css';

const Home = () => {
    
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15em' }}>
                <Typography variant="h1" style={{ marginLeft: '3em', marginRight: '1.3em' }}>Romain Andres</Typography>
                <Box sx={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', m: 2 }}>
                    <img
                        src={ProfileImage}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '3em', marginTop:'-50em' }}>
                    <Typography class="typing-demo" variant="h3">Student in AI, data analysis access on health :)</Typography>
                    <Typography variant="body1">I aspire to contribute to the field of AI and make a difference in the field of medicine by developing innovative technological solutions.</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
