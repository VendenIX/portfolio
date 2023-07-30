// src/pages/projects/components/Project.js
import React from 'react';
import { Box, Stack } from '@mui/material';
import ListImages from './list-images';
const Project = ({title, description, images, video, githubLink}) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <ListImages images={images} />
            <Stack direction='row' justifyContent='center'>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '40%',
                        borderRadius: '1em',
                        overflow: 'hidden',
                    }}>
                <iframe 
                    width="640" 
                    height="360" 
                    src= {video}
                    title="Demo projet react-native Todo app (CRUD w/GraphQL)" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                </Box>
            </Stack>
            <a href={githubLink} target="_blank" rel="noreferrer">Voir le dépôt GitHub</a>
        </div>
    );
};

export default Project;
