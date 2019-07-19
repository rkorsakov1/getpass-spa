import React, { useState, createContext, useEffect } from "react";
import { Snackbar, Fade, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { useTranslation } from "react-i18next";
import * as serviceWorker from 'serviceWorker';

//  https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
const NotificationContext = createContext({
	message: "",
	updateMessage: (_: string): void => { }
});


interface NotifyProps {
	children: JSX.Element;
	timeout?: number;
}

const NotifyWrapper: React.FC<NotifyProps> = ({ children, timeout }): JSX.Element => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');

	const updateMessage = (message: string) => {
		setMessage(message);
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			serviceWorker.register({
				onSuccess: (registration: ServiceWorkerRegistration) => updateMessage(t('notify.pwa.ready')),
				onUpdate: (registration: ServiceWorkerRegistration) => updateMessage(t('notify.pwa.update')),
			});
		} else {
			console.log("Service worker not supported");
		}
	});

	const renderSnackBar = () => {
		return (
			<Snackbar
				autoHideDuration={timeout}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={open}
				message={message}
				onClose={handleClose}
				TransitionComponent={Fade}
				action={(
					<IconButton
						key='close'
						aria-label='Close'
						color='inherit'
						onClick={handleClose}
					>
						<Close />
					</IconButton>
				)}
			/>
		);
	}

	return (
		<NotificationContext.Provider value={{ message, updateMessage }}>
			<React.Fragment>
				{children}
				{renderSnackBar()}
			</React.Fragment>
		</NotificationContext.Provider>
	);
}

NotifyWrapper.defaultProps = {
	timeout: 4096
}

export { NotifyWrapper, NotificationContext }
