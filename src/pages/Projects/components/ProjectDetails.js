import React from 'react';
import { Box, Stack, Typography, Link, Button, IconButton } from '@mui/material';
import ListImages from './list-images';
import Close from '@mui/icons-material/Close'; 

const ProjectDetails = ({title, description, technologies, images, video, githubLink, onClose}) => {

    return (
        <Box sx={{ backgroundColor: "#f0f0f0", padding: "2em", borderRadius: "2em", margin: "1em 0", maxWidth: '100%', maxHeight: '100%' }}>
             <IconButton onClick={onClose}>
                <Close />
            </IconButton>
            <Typography variant="h2" component="div" sx={{ marginBottom: "1em", color: "#38B3FF" }}>{title}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ marginBottom: "1em", color: "#000" }}>{description}</Typography>
                </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: "1em" }}>
                {technologies.map((tech, index) => (
                    <Typography key={index} variant="body2" sx={{ backgroundColor: "#38B3FF", color: "#fff", padding: "0.5em 1em", borderRadius: "0.5em" }}>
                        {tech}
                    </Typography>
                ))}
            </Stack>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: '1em',
                    overflow: 'hidden',
                    margin: '1em 0',
                }}
            >
                <div>
                    <iframe 
                        width="640" 
                        height="360" 
                        src={video}
                        title="Demo projet react-native Todo app (CRUD w/GraphQL)" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    />
                </div>
            </Box>
            <Button href={githubLink} target="_blank" rel="noopener noreferrer" variant="contained" color="primary">Github Repository</Button>
        </Box>
    );
};

export default ProjectDetails;
