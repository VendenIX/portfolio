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
    const isSpecificSize = useMediaQuery('(min-width:390px) and (max-width:414px) and (min-height:844px) and (max-height:896px)');

    const nameStyle = isSmallScreen
        ? { textAlign: 'center', margin: '1em 0' }
        : { marginLeft: '3em', marginRight: '1.3em' };

    const imageSize = isSpecificSize ? 150 : (isSmallScreen ? 100 : 200);

    const contentStyle = isSmallScreen || isSmallHeight
        ? { margin: '1em', marginTop: '2em', textAlign: 'center', fontSize: isSmallScreen ? '0.8em' : '1em' }
        : { marginLeft: '3em', marginTop: '-50em' };

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: (isSmallHeight || isSpecificSize) ? 'column' : 'row', alignItems: 'center', marginTop: isSmallScreen ? '5em' : '15em' }}>
                <Typography variant="h1" style={nameStyle}>Romain Andres</Typography>
                <Box sx={{ width: imageSize, height: imageSize, borderRadius: '50%', overflow: 'hidden', m: 2 }}>
                    <img
                        src={ProfileImage}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ...contentStyle }}>
                    <Typography className="typing-demo" variant="h3" style={{ fontSize: isSmallScreen ? '1.2em' : 'inherit' }}>Student in AI, data analysis access on health !</Typography>
                    <Typography variant="body1">I aspire to contribute to the field of AI and make a difference in the field of medicine by developing innovative technological solutions.</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
