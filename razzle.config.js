'use strict';
var path = require('path');

module.exports = {
	plugins: [
		{
			//	swap from tslint to eslint
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
		const appConfig = config

		//	resolve absolute paths
		const srcPath = path.resolve("./src")
		appConfig.resolve.modules.push(srcPath);

		//	import fonts
		appConfig.module.rules.push({
			test: /\.(woff|woff2|eot|ttf|svg)$/,
			loader: 'file-loader'
		});
		return appConfig;
	}
};
