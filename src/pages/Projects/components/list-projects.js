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
                    images={project.images}
                    video={project.video}
                    githubLink={project.githubLink}
                />
            )}
        </div>
    );
};

export default ListProjects;
