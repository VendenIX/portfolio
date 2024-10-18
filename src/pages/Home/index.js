import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../../App.css';

const IMAGE_BASE_URL = '/portfolio/images/';

const Home = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isLaptop = useMediaQuery('(max-width:1300px) and (max-height:850px)');

    const nameStyle = isSmallScreen || isLaptop
        ? { textAlign: 'center', margin: '1em 0' }
        : { textAlign: 'center'};

    const imageSize = '15em';

    const contentStyle = isSmallScreen || isLaptop
        ? { margin: '1em', marginRight: '5em', marginLeft: '5em', marginBottom: '20em', fontSize: isSmallScreen ? '0.8em' : '1em', width: '60%' }
        : { marginLeft: '3em', marginTop: '-50em' };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* TITRE*/}
            <Typography variant="h1" style={nameStyle}>Romain Andres</Typography>

            {/* PHOTO DE PROFIL*/}
            <Box sx={{ width: imageSize, height: imageSize, borderRadius: '50%', overflow: 'hidden', m: 2}}>
                <img
                    src={`${IMAGE_BASE_URL}p1.jpg`}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', rotate: '3deg' }}
                />
            </Box>

            {/* TEXTE DE PRESENTATION*/}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: isSmallScreen ? '0em' : '28em' }}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', ...contentStyle }}>
                    {!isSmallScreen ? (
                        <Typography className="typing-demo" variant="h3" style={{ width: '35%', fontSize: 'inherit' }}>
                                <strong>Student in AI, data analysis access on health !</strong>
                        </Typography>
                        ) : null}

                    <Typography variant="body1">I aspire to contribute to the field of AI and make a difference in the field of medicine by developing innovative technological solutions.</Typography>
                </Box>
            </Box>

        </Box>
    );
    
    
};

export default Home;
