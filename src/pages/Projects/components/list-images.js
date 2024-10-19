import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const ListImages = ({ images }) => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' position='relative' zIndex={0}>
            <Carousel
                animation='fade'
                navButtonsAlwaysInvisible={true} // Masque les flèches de navigation
                autoPlay={true}
                interval={3000}
                indicators={false}
                sx={{ width: '100%', marginBottom: 3}}
            >
                {images.map((image, index) => (
                    <Box key={index} display='flex' justifyContent='center'>
                        <img src={image} alt={`Project ${index}`} style={{ width: "100%", height: "25em" }} />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default ListImages;
