'use strict';
var path = require('path');

module.exports = {
	plugins: [
		{
			name: "typescript",
			options: {
				useBabel: true,
				useEslint: true,
				forkTsChecker: {
					tsconfig: "./tsconfig.json",
					tslint: undefined,
					watch: "./src",
					typeCheck: true,
				},
			},
		},
	],

	modify(config, { target, dev }, webpack) {
		const appConfig = config // stay immutable here
		if (target === 'node' && !dev) {
			appConfig.externals = [];
		}

		const srcPath = path.resolve("./src")
		appConfig.resolve.modules.push(srcPath);
		return appConfig;
	}
};
