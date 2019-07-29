import { verify, alphabet } from "./alphabet";
import { sha, shaCycle } from "./sha";
import { base } from "./base";
import { bytesToHex, scrypt } from "./scrypt";

export interface IGenerate {
	login: string;
	secret: string;
	service: string;
	counter: number;
	length: number;
	lower: boolean;
	upper: boolean;
	number: boolean;
	special: boolean;
	costFactor: number;
	blockSizeFactor: number;
}

const generateImplementation = async ({ login, service, secret, counter, lower, upper, number, special, length, costFactor, blockSizeFactor }: IGenerate): Promise<string> => {
	service = `${service}${counter}`;

	let N = 1 << costFactor, r = blockSizeFactor, p = 1;

	let currentAlphabet = alphabet({
		lower: lower,
		upper: upper,
		number: number,
		special: special,
	});

	let password = shaCycle([secret, login, service]);
	let salt = shaCycle([login, service, secret]);

	let hash = bytesToHex(await scrypt(password, salt, N, r, p, length));

	let result = hash;
	do {
		result = base({
			input: sha(result),
			alphabet: currentAlphabet,
		}).slice(0, length);
	} while ((length >= 8) &&
		(!verify({
			lower: lower,
			upper: upper,
			number: number,
			special: special,
			input: result
		})));

	return result;
}

export default generateImplementation;
