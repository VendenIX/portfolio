import React from 'react';
import { Typography, Box } from '@mui/material';

const Skills = () => {
    const frontendSkills = [
        "React ",
        "PHP",
        "Material UI",
        "Responsive Design",
        "Cypress",
        "Jest",
        "Tailwind CSS",
    ];

    const backendSkills = [
        "Node.js",
        "GraphQL",
        "Flask API CRUD",
        "Do a proxy enginx",
        "Full config of a NAS server FreeBSD encrypted",
        "Fix the CORS Policy 😎 !"
    ];

    const databaseSkills = [
        "MySQL",
        "MongoDB",
        "MariaDB",
        "PostgreSQL",
        "Talend",
        "Weka"
    ];

    const machineLearningSkills = [
        "Data Preprocessing",
        "Data Cleaning",
        "Data Visualization",
        "Feature Engineering",
        "Model Selection",
        "Model Evaluation",
        "Model Deployment",
    ];

    const otherSkills = [
        "Networking",
        "Scrapping Selenium",
        "Python, Numpy, Scipy, Matplotlib",
        "Java, Android, Swing, JavaFX, JUnit",
        "C, C++, SFML, SDL2",
        "Git",
        "Virtual Machines",
    ];

    const SkillSection = ({ title, skills }) => (
        <Box style={{ backgroundColor: '#f9f9f9', borderRadius: '1em', margin: '1em 0', padding: '1em' }}>
            <Typography variant="h5" color="primary">{title}</Typography>
            <Box display="flex" flexDirection="column">
                {skills.map((skill, index) => (
                    <Box key={index} m={1}>
                        <Typography variant="body1" style={{ color: "blue" }}>{skill}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );

    return (
        <section id="skills" style={{ minHeight: '100vh' }}>
            <div style={{ padding: '5em'}}>
                <Typography variant="h4" style={{marginLeft:'20px'}}>Skills</Typography>
                <SkillSection title="Front-end" skills={frontendSkills} />
                <SkillSection title="Back-end" skills={backendSkills} />
                <SkillSection title="Database Skills" skills={databaseSkills} />
                <SkillSection title="Machine Learning" skills={machineLearningSkills} />
                <SkillSection title="Other Skills" skills={otherSkills}/>
            </div>
        </section>
    );
};

export default Skills;
