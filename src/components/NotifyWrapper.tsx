import React, { useState, createContext, useEffect } from "react";
import { Snackbar, Fade, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as serviceWorker from 'serviceWorker';

//  https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
const NotificationContext = createContext({
    message: "",
    updateMessage: (message: string) => { }
});


interface Props {
    children: JSX.Element;
}

const NotifyWrapper = ({ children }: Props) => {
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
        console.log('registered');
        serviceWorker.register({
            onSuccess: (registration: ServiceWorkerRegistration) => updateMessage('Content is cached for offline use [PWA ready].'),
            onUpdate: (registration: ServiceWorkerRegistration) => updateMessage('New content is available, please reload your web browser'),
        });
    });

    const renderSnackBar = () => {
        return (
            <Snackbar
                autoHideDuration={4096}
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
            <>
                {children}
                {renderSnackBar()}
            </>
        </NotificationContext.Provider>
    );
}

export { NotifyWrapper, NotificationContext }