import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileImage from '../../assets/p1.jpg';
import '../../App.css';

const Home = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallHeight = useMediaQuery('(max-height:850px)');
    const isLaptop = useMediaQuery('(max-width:1300px) and (max-height:850px)');

    const nameStyle = isSmallScreen || isLaptop
        ? { textAlign: 'center', margin: '1em 0' }
        : { textAlign: 'center'};

    const imageSize = '15em';

    const contentStyle = isSmallScreen || isLaptop
        ? { margin: '1em', marginRight: '5em', marginLeft: '5em', marginBottom: '20em', fontSize: isSmallScreen ? '0.8em' : '1em', width: '60%' }
        : { marginLeft: '3em', marginTop: '-50em' };

    const marginTopForName = isLaptop ? '1em' : (isSmallScreen ? '5em' : '15em');

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
                    src={ProfileImage}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            {/* TEXTE DE PRESENTATION*/}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: isSmallScreen ? '0em' : '28em' }}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', ...contentStyle }}>
                    <Typography className="typing-demo" variant="h3" style={{ width: '35%',fontSize: isSmallScreen ? '1.2em' : 'inherit' }}><strong>Student in AI, data analysis access on health !</strong></Typography>
                    <Typography variant="body1">I aspire to contribute to the field of AI and make a difference in the field of medicine by developing innovative technological solutions.</Typography>
                </Box>
            </Box>

        </Box>
    );
    
    
};

export default Home;
