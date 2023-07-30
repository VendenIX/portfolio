import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

const Contact = () => {
    return (
        <div>
            <Typography variant="h4">Contactez-moi</Typography>
            <form>
                <TextField label="Nom" variant="outlined" />
                <TextField label="Email" variant="outlined" />
                <TextField label="Message" variant="outlined" multiline rows={4} />
                <Button variant="contained" color="primary" type="submit">Envoyer</Button>
            </form>
        </div>
    );
};

export default Contact;
