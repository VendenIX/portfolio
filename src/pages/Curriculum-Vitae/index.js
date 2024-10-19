// src/pages/Curriculum-Vitae/index.js

import React from 'react';
import { Typography } from '@mui/material';

const CvViewer = () => {
    return (
        <iframe
            src="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/VendenIX/curriculum_vitae/main/Curriculum_vitae.pdf&embedded=true"
            style={{ width: '80%', height: '90vh', margin: 'auto', display: 'block', border: 'none' }}
            title="CV"
        />
    );
};

const CurriculumVitae = () => {
    return (
        <section id="cv" style={{ padding: '5em', minHeight: '110vh' }}>
            <div>
                <Typography variant="h4" style={{ marginBottom: '1em' }}>Curriculum Vitae</Typography>
                <CvViewer />
            </div>
        </section>
    );
};

export default CurriculumVitae;