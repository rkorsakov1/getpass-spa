import { sha256, Message } from 'js-sha256';

const sha = (input: Message) => {
	return sha256(input);
}

const shaCycle = (input: string[]) => {
	let hash = 'getpass';
	for (let i = 0; i < input.length; i++) {
		let entry = input[i];
		hash = sha(`${hash}${entry}`);
	}
	return hash;
}

export { sha, shaCycle }
