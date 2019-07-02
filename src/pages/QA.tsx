import React from 'react';
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { CardWrapper } from 'components';
import { at, I18n, useTranslation } from 'localization';
import ReactMarkdown from 'react-markdown';
interface IQA {
    q: string,
    a: string
}


const QA = () => {
    const { t } = useTranslation();

    const QAdata: IQA[] = [];

    for (let i = 0; i < 11; i++) {
        const q: string = t(at(parseInt(I18n[`q${i}` as any], 10)));
        const a: string = t(at(parseInt(I18n[`a${i}` as any], 10)));
        QAdata.push({ q, a });
    }

    const QABlock = ({ q, a }: IQA, key: number) => {
        return (
            <ExpansionPanel key={key}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography variant="subtitle1">{q}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div style={{ textAlign: "justify", fontFamily: "Roboto" }}>
                        <Divider />
                        <ReactMarkdown source={a} />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    return (
        <CardWrapper asCard={false}>
            {QAdata.map((el: IQA, i: number) => QABlock(el, i))}
        </CardWrapper>
    )
}

export default QA;

/*<FlareComponent width={200} height={200} animationName="Loading" file={require(`assets/animation/getpass.white.flr`)} />*/