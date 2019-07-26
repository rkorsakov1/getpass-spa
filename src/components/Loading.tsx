import React, { useState } from 'react';
import {
	Grid, Dialog, DialogActions, CircularProgress, DialogContent, DialogTitle
} from '@material-ui/core';

interface LoadingState {
	open: boolean;
}

const Loading = ({ open }: LoadingState): JSX.Element => {
	let [isOpened, setOpen] = useState(open);

	const handleClose = (): void => {
		setOpen(false);
	}

	if (isOpened !== open) {
		setOpen(open);
	}
	return (
		<Dialog
			open={isOpened}
			onClose={handleClose}
		>
			<DialogTitle>{"Generating password..."}</DialogTitle>
			<DialogContent>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<CircularProgress disableShrink />
				</Grid>
			</DialogContent>
			<DialogActions>
			</DialogActions>
		</Dialog>
	);
}

export default Loading;
