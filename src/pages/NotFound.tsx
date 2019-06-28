import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { navigation } from 'components/RouterWrapper';

const style = {
    button1: {
        color: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        background: 'linear-gradient(45deg, #5C6BC0 30%, #283593 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
    },
    button2: {
        color: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        background: 'linear-gradient(45deg, #283593 30%, #5C6BC0 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
    },
};

const NotFound = () => (
    <Grid
        container
        justify='center'
        alignItems='center'
    >

        <Grid item xs={12} style={{ height: '20vh' }} />
        <Typography variant='h1' color='primary'>404</Typography>

        <Grid item xs={12} />
        <Typography variant='h5'>Sorry, page not found</Typography>

        <Grid item xs={12} style={{ height: '2vh' }} />
        <Button
            style={style.button1}
            onClick={() => navigation.push('/generator')}
            id='editor-button'
        >
            go to generator
        </Button>
        <Grid item xs={12} style={{ height: '2vh' }} />
        <Button
            style={style.button2}
            onClick={() => navigation.push('/random')}
            id='editor-button'
        >
            go to random
        </Button>
    </Grid>
);

export default NotFound;