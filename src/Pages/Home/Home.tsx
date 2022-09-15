import React from 'react';
import { Box, Button, Grid } from 'grommet';

export default function Home() {
    return (
        <Box fill background={'background'} pad='medium'>
            <Grid fill="vertical" gap="medium">
                <Button label='Graph csv' href='/csvgraph' color='reverseOffBackground' primary fill="horizontal" />
                <Button label='About' href='/about' color='reverseOffBackground' primary fill="horizontal" />
            </Grid>
        </Box>
    );
}