/* eslint-disable */
interface Config {
	onSuccess?: (registration: ServiceWorkerRegistration) => void;
	onUpdate?: (registration: ServiceWorkerRegistration) => void;
}


function registerValidSW(swUrl: string, config?: Config): void {
	navigator.serviceWorker
		.register(swUrl)
		.then(registration => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							//	See https://bit.ly/CRA-PWA.
							console.log('New content is available and will be used when all tabs for this page are closed.');

							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							console.log('Content is cached for offline use.');

							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch(error => {
			console.error('Error during service worker registration:', error);
		});
}

export function register(config?: Config): void {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		// The URL constructor is available in all browsers that support SW.
		const publicUrl = new URL(
			(process as { env: { [key: string]: string } }).env.PUBLIC_URL,
			window.location.href
		);
		if (publicUrl.origin !== window.location.origin) {
			// Our service worker won't work if PUBLIC_URL is on a different origin
			// from what our page is served on. This might happen if a CDN is used to
			// serve assets; see https://github.com/facebook/create-react-app/issues/2374
			return;
		}

		window.addEventListener('load', () => {
			const swUrl = `/sw.js`;
			registerValidSW(swUrl, config);
		});
	}
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(registration => {
			registration.unregister();
		});
	}
}
