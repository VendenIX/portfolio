import React from 'react';
import { Typography } from '@mui/material';
import translations from '../translations/fr.js';
const AboutMe = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4">À propos de moi</Typography>
            <Typography variant="body1">
                {translations['about.big_description']}
            </Typography>
        </div>
    );
};

export default AboutMe;
