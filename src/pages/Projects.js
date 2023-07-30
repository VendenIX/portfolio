import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Projects = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4">Mes Projets</Typography>
            <Card>
                <CardContent>
                    <Typography variant="h5">Nom du Projet</Typography>
                    <Typography variant="body2">Description du Projet</Typography>
                    // Ajoutez ici des images ou des liens vers votre projet
                </CardContent>
            </Card>
            // Ajoutez d'autres cartes pour les autres projets
        </div>
    );
};

export default Projects;
