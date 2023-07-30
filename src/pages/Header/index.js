import React from 'react';
import { Typography } from '@mui/material';
import translations from '../../translations/fr.js';
const Header = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2">{translations['about.name']}</Typography>
            <Typography variant="p">{translations['about.description']}</Typography>
        </div>
    );
};

export default Header;
