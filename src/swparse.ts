/* eslint-disable */
var fs = require('fs');
var path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const buildDir = path.resolve(fs.realpathSync(process.cwd()), 'build');

function endsWithAny(suffixes: string[], string: string) {
	return suffixes.some((suffix: string) => string.endsWith(suffix));
}


const getFiles = async (path: string) => {
	let names = [];
	try {
		names = await readdir(path);
	} catch (e) {
		//	suppress
		console.log('error in getFiles');
	}

	return names.filter((name: string) => endsWithAny([".js", ".json", ".css"], name));
}

const readFileNames = async () => {
	const names = [
		...await getFiles(buildDir),
		...await getFiles(`${buildDir}/public`),
		...await getFiles(`${buildDir}/public/static`),
		...await getFiles(`${buildDir}/public/static/css`),
		...await getFiles(`${buildDir}/public/static/js`),
	];
	console.log(names);
	return names;
}

const replaceFileContents = async (from: RegExp, to: string) => {
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

const replace = async () => {
	const names = (await readFileNames()).join('","');

	await replaceFileContents(/%URL%/g, `${names}`);
	await replaceFileContents(/%NAME%/g, `getpass-${+new Date}`);
}

replace();
