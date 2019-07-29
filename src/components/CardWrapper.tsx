import React from 'react';
import { Grid, Card } from '@material-ui/core';


interface CardWrapperProps {
    asCard?: boolean
    width?: number
    children?: JSX.Element[] | JSX.Element;
}

const defaultProps: CardWrapperProps = {
    width: 600,
    asCard: true,
    children: <React.Fragment />
}

const CardWrapper: React.FC<CardWrapperProps> = ({ width, children, asCard }): JSX.Element => {

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
        >
            {
                asCard ?
                <Card style={{ width }}>
                    {children}
                </Card> :
                <div style={{ width }}>
                    {children}
                </div>
            }
        </Grid>
    )
}

CardWrapper.defaultProps = defaultProps;

export default CardWrapper;
