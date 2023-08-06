import React from 'react';
import { Typography } from '@mui/material';

const AboutMe = () => {
    return (
        <section id="aboutMe" style={{ padding: '5em' , minHeight: '110vh' }}>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4">About me</Typography>
            </div>
            <h1>A brief introduction:</h1>
            <p>
                I am a passionate individual, always seeking opportunities for learning and growth. As an aspiring Master's 1 student in Artificial Intelligence, Data Analysis, and Health Access, I am committed to pushing the boundaries of knowledge and contributing to the advancement of technology and society.
            </p>
            <p>
                Never settling for mediocrity, I thrive on challenges and constantly challenge myself to think creatively and critically. My tenacity and autonomy drive me to seek out new skills and knowledge through self-learning and online tutorials.
            </p>
            <p>
                In addition to my passion for technology and data, I have a love for music, and every month I share my favorite songs on my YouTube channel. Music is my way of connecting with others and expressing myself beyond the realm of code and algorithms.
            </p>
            <p>
                I am driven by the desire to contribute to the open-source community and to make a positive impact through AI and mobile/web applications. I believe in the power of technology to transform lives and improve accessibility to healthcare and education.
            </p>
            <p>
                As part of my journey to broaden my horizons and collaborate with like-minded individuals, I will be participating in the Hackathon 2023 in Caen.
            </p>
            <h2>I am currently studying in the university of Caen in Master's 1 Student in Artificial Intelligence, Data Analysis, Health Access</h2>
            <h3>My readings related to computer science:</h3>
            <ul>
                <li>Don't Make Me Think (Revisited) - Steve Krug</li>
                <li>Introduction to Algorithms - Thomas Cormen, Charles Leiserson, Ronald Rivest, Clifford Stein</li>
                <li>Superintelligence - Nick Bostrom</li>
                <li>Black Swan - Nassim Taleb</li>
                <li>Bullshit Jobs - David Graeber</li>
            </ul>
            <p>
                In my daily work, I rely on Ubuntu with ZSH bash coupled with the Kitty terminal, which enables me to be efficient and effective in my coding endeavors.
            </p>
            <p>
                I am also open to remote work opportunities, as I believe in the power of technology to connect people across geographical boundaries.
            </p>
        </section>
    );
};

export default AboutMe;
