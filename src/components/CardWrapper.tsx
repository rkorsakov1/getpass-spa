import React from 'react';
import { Grid, Card } from '@material-ui/core';


interface CardWrapperProps {
    width?: number
    children?: JSX.Element[] | JSX.Element;
}

const defaultProps: CardWrapperProps = {
    width: 600,
    children: <React.Fragment />
}

const CardWrapper: React.FunctionComponent<CardWrapperProps> = ({ width, children }) => {

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
        >
            <Card style={{ width }}>
                {children}
            </Card>
        </Grid>
    )
}

CardWrapper.defaultProps = defaultProps;

export default CardWrapper;