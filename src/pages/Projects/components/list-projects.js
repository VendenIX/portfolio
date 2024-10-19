import { Box, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import ProjectDetails from './ProjectDetails';
import ProjectBadge from './projet-badge';

const ListProjects = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projectDetailsRef = useRef(null);
    const projectsTopRef = useRef(null); // Référence au début de la section projets

    const handleSelectProject = (projectId) => {
        // Trouver le projet sélectionné par son ID
        const project = projects.find(p => p.id === projectId);
        setSelectedProject(project);

        // Scroller jusqu'à la section des détails du projet, ajusté 10% moins bas
        setTimeout(() => {
            const detailsPosition = (projectDetailsRef.current?.offsetTop || 0) + (window.innerHeight * -0.1); // Défilement 10% moins bas
            window.scrollTo({ top: detailsPosition, behavior: 'smooth' });
        }, 100);
    };

    const handleCloseDetails = () => {
        setSelectedProject(null);

        // Utiliser window.scrollTo pour revenir en haut de la liste des projets
        setTimeout(() => {
            const topPosition = (projectsTopRef.current?.offsetTop || 0) - (window.innerHeight * 0.1); // Défilement 10% plus haut
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }, 100);
    };

    return (
        <div>
            {/* Référence au début de la section des projets */}
            <div ref={projectsTopRef}></div>

            {/* Section pour les cartes de projet */}
            <Grid container spacing={10} justifyContent="space-between">
                {projects.map((project, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <ProjectBadge project={project} onSelect={handleSelectProject} />
                    </Grid>
                ))}
            </Grid>

            {/* Section pour les détails du projet sélectionné */}
            {selectedProject && (
                <Box ref={projectDetailsRef} sx={{ marginTop: '2em' }}>
                    <ProjectDetails
                        title={selectedProject.title}
                        description={selectedProject.description}
                        technologies={selectedProject.technologies}
                        images={selectedProject.images}
                        video={selectedProject.video}
                        githubLink={selectedProject.githubLink}
                        onClose={handleCloseDetails}
                    />
                </Box>
            )}
        </div>
    );
};

export default ListProjects;