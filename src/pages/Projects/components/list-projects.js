import React from 'react';
import { Grid } from '@mui/material';
import ProjectBadge from './projet-badge';
const ListProjects = ({ projects, onSelect }) => {
    return (
        <Grid container spacing={10} justifyContent="space-between">
            {projects.map((project, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <ProjectBadge project={project} onSelect={onSelect} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ListProjects;
