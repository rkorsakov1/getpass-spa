/* eslint-disable */
var fs = require('fs');
var path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const buildDir = path.resolve(fs.realpathSync(process.cwd()), 'build');

const generatePaths = () => {
	const languages = ["en", "ru"];
	const agnosticPaths = ["pro", "lite", "faq", "404", "download"];

	const paths = [];
	for (let language of languages){
		for (let  path of agnosticPaths) {
			paths.push(`/${language}/${path}`);
		}
	}
	return paths;
}

const replaceFileContents = async (from, to) => {
	const sw = `${buildDir}/public/sw.js`;
	try {
		const data = await readFile(sw, 'utf8');

		var result = data.replace(from, to);
		await writeFile(sw, result, 'utf8');
	} catch (e) {
		//	suppress
		console.log('error in replaceFileContents');
	}
}

const populate = async () => {
	const names = (generatePaths()).join('","');
	console.log(names);

	await replaceFileContents(/%URL%/g, `${names}`);
	await replaceFileContents(/%NAME%/g, `getpass-${+new Date}`);
}

populate();
