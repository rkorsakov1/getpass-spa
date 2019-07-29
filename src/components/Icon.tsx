import React, { ReactNode } from 'react';
import { IconButton, Tooltip, Zoom } from '@material-ui/core';

interface IconProps {
	enabled?: boolean;
	tooltip: string;
	children: ReactNode;
	onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ tooltip, children, onClick, enabled }): JSX.Element => (
	<Tooltip TransitionComponent={Zoom} title={tooltip} style={{ fontSize: 40 }}>
		<div>
			<IconButton
				disabled={!enabled}
				color="secondary"
				onClick={onClick}
			>
				{children}
			</IconButton>
		</div>
	</Tooltip>
);

Icon.defaultProps = {
	enabled: true,
};

export default Icon;
