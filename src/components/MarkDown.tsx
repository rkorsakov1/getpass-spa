import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkDownProps {
	source: string;
}

const MarkDown: React.FC<MarkDownProps> = ({ source }): JSX.Element => (
	<div style={{ textAlign: "justify", fontFamily: "Roboto" }}>
		<ReactMarkdown source={source} />
	</div>
)

export default MarkDown;
