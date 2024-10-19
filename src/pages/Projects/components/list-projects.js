import { Box, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './ListProjects.css'; // fichier CSS pour gérer la transition
import ProjectDetails from './ProjectDetails';
import ProjectBadge from './projet-badge';

const ListProjects = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const projectDetailsRef = useRef(null);
    const projectsTopRef = useRef(null); // ref au début de la section projets

    const handleSelectProject = (projectId) => {
        // find le projet sélectionné par son ID
        const project = projects.find(p => p.id === projectId);
        setSelectedProject(project);
        setShowDetails(true);

        // scroll jusqu'à la section des détails du projet, ajusté 10% moins bas
        setTimeout(() => {
            const detailsPosition = (projectDetailsRef.current?.offsetTop || 0) - (window.innerHeight * 0.1);
            window.scrollTo({ top: detailsPosition, behavior: 'smooth' });
        }, 100);
    };

    const handleCloseDetails = () => {
        // masquer les détails avec une transition avant de scroller vers le haut
        setShowDetails(false);

        // use un délai pour laisser le temps à la transition de se terminer
        setTimeout(() => {
            setSelectedProject(null);

            // Scroller vers le haut de la liste des projets
            setTimeout(() => {
                const topPosition = (projectsTopRef.current?.offsetTop || 0) - (window.innerHeight * 0.1);
                window.scrollTo({ top: topPosition, behavior: 'smooth' });
            }, 100);
        }, 300); // Laisser 300ms pour la transition fade out
    };

    return (
        <div>
            {/* référence au début de la section des projets */}
            <div ref={projectsTopRef}></div>

            {/* section pour les cartes de projet */}
            <Grid container spacing={10} justifyContent="space-between">
                {projects.map((project, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <ProjectBadge project={project} onSelect={handleSelectProject} />
                    </Grid>
                ))}
            </Grid>

            {/* section pour les détails du projet sélectionné avec transition */}
            {selectedProject && (
                <CSSTransition
                    in={showDetails}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
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
                </CSSTransition>
            )}
        </div>
    );
};

export default ListProjects;