import React from 'react';
import { Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { CardWrapper, MarkDown, TitleWrapper } from 'components';
import { useTranslation } from 'react-i18next';

interface IQA {
	q: string;
	a: string;
}


const QA: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const m = (path: string): string => t(path, { joinArrays: '  \n', });

	const QAdata: IQA[] = [];

	for (let i = 0; i < 12; i++) {
		const q: string = m(`qa.q${i}`);
		const a: string = m(`qa.a${i}`);
		QAdata.push({ q, a });
	}

	const QABlock = ({ q, a }: IQA, key: number): JSX.Element => {
		return (
			<div key={key}>
				<ExpansionPanel style={{ marginBottom: 8 }}>
					<ExpansionPanelSummary
						expandIcon={<ExpandMore />}
					>
						<Typography variant="subtitle1">{q}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Divider />
						<MarkDown source={a} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	};

	return (
		<TitleWrapper componentName="qa">
			<CardWrapper asCard={false}>
				{QAdata.map((el: IQA, i: number): JSX.Element => QABlock(el, i))}
			</CardWrapper>
		</TitleWrapper>
	)
}

export default QA;

/*<FlareComponent width={200} height={200} animationName="Loading" file={require(`assets/animation/getpass.white.flr`)} />*/
