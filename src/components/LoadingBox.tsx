import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme, Typography } from '@mui/material';

const theme = createTheme();
interface Props {
    text?: string;
}
const LoadingBox: React.FC<Props> = ({ text = 'Loading...' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: theme.spacing(4),
            }}
        >
            <CircularProgress sx={{ margin: theme.spacing(2) }} />
            <Typography variant="h6" component="h6" textAlign={'center'}>
                {text}
            </Typography>
        </Box>
    );
};
export default LoadingBox;
