import React from 'react';
import { Typography } from '@mui/material';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '5em' , minHeight: '110vh' }}>
            <div>
                <div >
                <Typography style={{marginTop: '2em'}} variant="h4"> Contact me</Typography>
                </div>
                <ul>
                <li>
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:romain.andres@etu.unicaen.fr"
                            target="_blank"
                            rel="noreferrer"
                        >
                            romain.andres@etu.unicaen.fr
                        </a>
                    </li>

                    <li>
                        <strong>LinkedIn:</strong>{" "}
                        <a
                            href="https://www.linkedin.com/in/romain-andres-6b551b203/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Romain Andres on LinkedIn
                        </a>
                    </li>

                    <li>
                        <strong>GitHub:</strong>{" "}
                        <a
                            href="https://github.com/VendenIX"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Romain Andres on GitHub
                        </a>
                    </li>
                </ul>
            </div>
            <div
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <a href="mailto:romain.andres@etu.unicaen.fr" target="_blank" rel="noreferrer">
                    <img
                        src="https://raw.githubusercontent.com/iconic/open-iconic/master/svg/envelope-closed.svg"
                        alt="email"
                        width="30"
                        height="30"
                        style={{ marginBottom: '0.5em' }}
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/romain-andres-6b551b203/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg"
                        alt="linkedin"
                        width="30"
                        height="30"
                        style={{ marginBottom: '0.5em' }}
                    />
                </a>
                <a href="https://github.com/VendenIX" target="_blank" rel="noreferrer">
                    <img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg"
                        alt="github"
                        width="30"
                        height="30"
                        style={{ marginBottom: '0.5em' }}
                    />
                </a>
            </div>
        </section>
    );
};

export default Contact;
