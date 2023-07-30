import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const ListImages = ({ images }) => {
    return (
        <Grid container spacing={2}>
            {images.map((image, index) => (
                <Grid item xs={6} key={index}>
                    <Paper>
                        <img src={image} alt={`Project ${image}`} style={{ width: "auto", height: "20em", }} />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default ListImages;
