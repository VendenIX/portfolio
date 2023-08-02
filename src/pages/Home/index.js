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
        : { marginLeft: '3em', marginRight: '1.3em' };

    const imageSize = isSmallScreen || isLaptop ? 100 : 200;

    const contentStyle = isSmallScreen || isLaptop
        ? { margin: '1em', marginLeft: '13em', marginBottom: '20em', fontSize: isSmallScreen ? '0.8em' : '1em' }
        : { marginLeft: '3em', marginTop: '-50em' };

    const marginTopForName = isLaptop ? '1em' : (isSmallScreen ? '5em' : '15em');

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: isSmallHeight || isLaptop ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', marginTop: marginTopForName }}>
                <Typography variant="h1" style={nameStyle}>Romain Andres</Typography>
                <Box sx={{ width: imageSize, height: imageSize, borderRadius: '50%', overflow: 'hidden', m: 2 , marginBottom: '4em'}}>
                    <img
                        src={ProfileImage}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: isLaptop ? '60vh' : '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ...contentStyle }}>
                    <Typography className="typing-demo" variant="h3" style={{ fontSize: isSmallScreen ? '1.2em' : 'inherit' }}><strong>Student in AI, data analysis access on health !</strong></Typography>
                    <Typography variant="body1">I aspire to contribute to the field of AI and make a difference in the field of medicine by developing innovative technological solutions.</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
