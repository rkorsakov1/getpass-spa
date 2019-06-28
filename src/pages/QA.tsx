import React from 'react';
import { Grid, Typography, CardContent } from '@material-ui/core';
import CardWrapper from 'components/CardWrapper';


interface IQA {
    q: string,
    a: string
}


const QA = () => {

    const QAdata: IQA[] = [];

    const QABlock = ({ q, a }: IQA) => {
        return (
            <Grid item key={q}>
                <Typography variant="h6">Q: {q}</Typography>
                <Typography variant="body1">A: {a}</Typography>
            </Grid>
        );
    };

    return (
        <CardWrapper>
            <CardContent>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="stretch">
                    {QAdata.map((el: IQA, i: number) => QABlock(el))}

                </Grid>

            </CardContent>
        </CardWrapper>
    )
}

export default QA;

/*<FlareComponent width={200} height={200} animationName="Loading" file={require(`assets/animation/getpass.white.flr`)} />*/