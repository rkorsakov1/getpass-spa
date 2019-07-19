/* eslint-disable */
import express from 'express';
import app from './server';

if (module.hot) {
	module.hot.accept('./server', (): void => {
		console.log('🔁  HMR Reloading `./server`...');
	});
	console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
	.use((req, res): void => (app as any).handle(req, res))
	.listen(port, (): void => {

		console.log(`> Started on port ${port}`);
	});
