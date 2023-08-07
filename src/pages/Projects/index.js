import React, { useState } from 'react'; 
import { Card, CardContent, Typography, Button } from '@mui/material';
import ListProjects from './components/list-projects';
import { Box } from '@mui/system';
import img1 from '../../assets/project1/p1.png';
import img2 from '../../assets/project1/p2.png';
import img3 from '../../assets/project1/p3.png';
import img4 from '../../assets/project1/p4.png';
import img5 from '../../assets/project2/p1.png';
import img6 from '../../assets/project2/p2.png';
import img7 from '../../assets/project2/p3.png';
import img8 from '../../assets/project2/p4.png';
import img9 from '../../assets/project3/p1.png';
import img10 from '../../assets/project3/p2.gif';
import img11 from '../../assets/project4/p1.gif';
import img12 from '../../assets/project4/p2.png';
import img13 from '../../assets/project4/p4.png';
import ProjectDetails from './components/ProjectDetails';

const Projects = ({ onSelect }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = [
        {
            id: 1,
            title: 'Todolist App React Native\n(API Rest CRUD GraphQL)',
            description: 'My React Native Todo List application represents a pivotal moment in my coding journey as it marks my first foray into the world of React development. This project has been an exciting learning experience, as it provided me with valuable insights into building mobile applications using the React Native framework.  One of the most significant accomplishments of this project was successfully integrating a database into the application. It was my maiden voyage in working with databases in a mobile app, and it taught me essential skills in managing data and leveraging the power of a database to store and retrieve information.  As a newcomer to React, this project helped me grasp the core concepts and best practices of React development. It allowed me to understand the component-based architecture and the flow of data within a React application. Through the process of building the Todo List app, I gained confidence in using React to create responsive and interactive user interfaces.  Moreover, this project also served as my introduction to working with RESTful APIs for performing CRUD operations. I learned how to interact with an API to send and receive data, enabling seamless communication between the front-end and the back-end.  In summary, the React Native Todo List application is not just a simple task manager; it represents my first step into the world of React development and working with databases. It has been an invaluable learning experience, motivating me to explore and create more innovative and impactful projects in the future.',
            technologies: ['React native, GraphQL, Node.js'],
            images: [img1, img3, img1, img4],
            video: 'https://www.youtube.com/embed/tkCRqmgGa4Q',
            githubLink: 'https://github.com/https://github.com/VendenIX/Todolist-react-native/projet1'
        },
        {
            id: 2,
            title: 'Fractal flowers generator L-System DOL-System 2D/3D',
            description: "This project marks a significant milestone in my programming journey as it represents my first major undertaking. The Video Game Flora Generator has been an incredible learning experience, allowing me to hone my software design skills and delve into the world of 3D engine development. One of the most rewarding aspects was devising the algorithm to generate intricate fractal-based flora structures without relying on external resources, demonstrating my problem-solving abilities and creativity. While the project has been a challenging endeavor, particularly in realizing the 3D engine, it has been a gratifying journey of growth and exploration. Although the 3D version remains a work in progress, the foundation has been laid for future development and expansion. Moreover, this project also served as my introduction to object-oriented programming in Java, providing valuable insights into building modular and efficient code structures. It was an eye-opening experience that has paved the way for more ambitious projects in the future. In summary, the Video Game Flora Generator is a testament to my passion for programming and my willingness to take on challenges that push me beyond my comfort zone. It has significantly contributed to my development as a software developer and motivated me to continue exploring new frontiers in the world of game development and beyond.",
            technologies: ['Java, Swing, JavaFX'],
            images: [img5, img6, img7, img8],
            video: 'https://www.youtube.com/embed/SIk_-tes1vU',
            githubLink: 'https://github.com/VendenIX/Generateur-de-flore-video-ludique'
        },
        {
            id: 3,
            title: "AI vs. AI Virus Board Game Battle using Minmax/Alpha-Beta",
            description: "\"Virus Infection Battle\" is a captivating game that offers a unique opportunity to observe the strategic showdown between two AI opponents utilizing Minimax and Alpha-Beta Pruning algorithms at varying search depths. Players are immersed in a thrilling board game where the goal is to infect the opponent's territory with strategic moves. The game showcases the impact of search depth on AI decision-making, providing insights into how different levels of exploration influence gameplay outcomes. As players witness the AI agents battle it out, they can visualize the nodes explored and the number of iterations undertaken by each algorithm. \"Virus Infection Battle\" is a compelling experience that sheds light on the power of AI-driven strategies and their ability to navigate complex scenarios, ultimately leading to a greater understanding of the role of search depth in AI gameplay. Rules of the game are simple : Two players, Red and Blue, start with two tokens each on a 7x7 grid. Blue goes first. The winner is the one with more tokens at the end. The game ends when: 1. A player has no tokens left, 2. Both players pass, 3. The board repeats a state. On their turn, a player can clone or jump their token. Cloning places a new token one space away. Jumping moves a token two spaces, passing over others. If no move, they pass. Adjacent opponent tokens to a moved or cloned token turn to the active player's color. Then, the next player goes.",
            technologies: ['Java', 'Pseudo-code'],
            images: [img9,img10],
            video: 'https://www.youtube.com/embed/oQxr1ursKIU',
            githubLink: 'https://github.com/VendenIX/JeuInfection'
        },
        {
            id: 4,
            title: "Sorting Algorithms Visualizer",
            description: "Welcome to the study project on sorting algorithms. This project involves the visualization and generation of CSV data for sorting algorithms in Python and C++. The project requires the installation of specific libraries (see make download_lib), and please note that you might encounter issues with make download_lib if your Linux version is not up to date.This project was accomplished with the assistance of the following contributors:Antoine (GitHub: https://github.com/aa2727)Guillaume (GitHub: https://github.com/P-Pix)Logan (GitHub: https://github.com/LoganVivien)The \"Data\" folder contains the data analysis portion of the project, while the \"App\" folder contains the source code for the sorting algorithm visualization application.How to launch a visualization?Navigate to the \"App\" directory and execute the following commands:make initmake download_lib (this will install the application's dependencies if they are not already installed on your machine)make allIf everything goes smoothly, you can now run:./Sorting_Algorithm HeapSortThis command will launch the application with the HeapSort sorting algorithm.How to view the analysis results?You can navigate to the \"Data\" directory and open the .pynb files using Jupyter Notebook. Each sorting algorithm has its analysis file, and the \"ComparatifInterAlgo.ipynb\" file provides a synthesis of the results. This file can also be used to generate a report that identifies the best sorting algorithm for various data scenarios.Each sorting algorithm has its Jupyter Notebook file. In these files, you will find pseudocode, graphical representations of the algorithm's efficiency on different data types, and a summary at the end of each file. The various data types include random data (using Fisher-Yates shuffling), data shuffled only at the beginning or at the end, and more.This project is implemented in C++, and the generated data is utilized in Python using libraries such as Pandas, NumPy, SciPy, and Matplotlib within Jupyter Notebook.",
            technologies: ['C++', 'Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Jupyter Notebook'],
            images: [img11, img12, img13],
            video: 'https://www.youtube.com/embed/HMKchM3o8Xk',
            githubLink: 'https://github.com/VendenIX/analyse_tris'
        }

    ];

    const handleSelect = id => {
        const project = projects.find(p => p.id === id);
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
    };

    const redirectToGitHub = () => {
        window.open('https://github.com/VendenIX?tab=repositories', '_blank');
    };


    return (
        <section id="projects" style={{ minHeight: '110vh' }}>
            {selectedProject ? (
                <ProjectDetails 
                    title={selectedProject.title}
                    description={selectedProject.description}
                    technologies={selectedProject.technologies}
                    images={selectedProject.images}
                    video={selectedProject.video}
                    githubLink={selectedProject.githubLink}
                    onClose={handleClose}
                />
            ) : (
                <div>
                    <div style={{ padding: '20px', marginLeft:"5em" }}>
                        <Typography style={{marginTop: '2em'}}variant="h4">Projects</Typography>
                    </div>
                    <ListProjects projects={projects} onSelect={handleSelect} />
                    <Box display="flex" justifyContent="center" style={{marginTop:'5em'}} mt={3}>
                        <Button variant="contained" color="primary" onClick={redirectToGitHub}>
                            See all projects on GitHub
                        </Button>
                    </Box>
                </div>
            )}
        </section>
    );
};

export default Projects;
