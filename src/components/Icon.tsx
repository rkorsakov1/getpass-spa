import React, { ReactNode } from 'react';
import { IconButton, Tooltip, Zoom } from '@material-ui/core';

interface IconProps {
    enabled?: boolean,
    tooltip: string,
    children: ReactNode,
    onClick: () => void,
}

const Icon: React.FunctionComponent<IconProps> = ({ tooltip, children, onClick, enabled }) => (
    <Tooltip TransitionComponent={Zoom} title={tooltip} style={{ fontSize: 40 }}>
        <IconButton
            disabled={!enabled}
            color="secondary"
            onClick={onClick}
        >
            {children}
        </IconButton>
    </Tooltip>
);

Icon.defaultProps = {
    enabled: true,
};

export default Icon;