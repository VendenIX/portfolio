// src/pages/projects/components/ListProjects.js
import React from 'react';
import Project from './project';

const ListProjects = ({projects}) => {
    return (
        <div>
            {projects.map((project, index) => 
                <Project 
                    key={index}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    video={project.video}
                    githubLink={project.githubLink}
                />
            )}
        </div>
    );
};

export default ListProjects;
