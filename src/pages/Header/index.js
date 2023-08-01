import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import translations from '../../translations/fr.js';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {translations['about.name']}
                </Typography>
                <Button color="inherit" href="#accueil">Accueil</Button>
                <Button color="inherit" href="#a-propos">A-propos</Button>
                <Button color="inherit" href="#projets">Projets</Button>
                <Button color="inherit" href="#savoirs-et-competences">Savoirs et compétences</Button>
                <Button color="inherit" href="#contact">Contact</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
