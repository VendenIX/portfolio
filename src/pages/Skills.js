import React from 'react';
import { Typography, Box } from '@mui/material';

const Skills = () => {
    const skills = [
        "React",
        "Material UI",
        "JavaScript",
        "Node.js",
        // Ajoutez d'autres compétences ici
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4">Compétences</Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                {skills.map((skill, index) => (
                    <Box key={index} m={1}>
                        <Typography variant="body1">{skill}</Typography>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default Skills;
