import { alphabet, verify } from "./alphabet";
import { bytesToHex, scrypt } from "./scrypt";
import { base } from "./base";
import { sha } from "./sha";

export interface IRandom {
	customAlphabetValue: string;
	customAlphabetFlag: boolean;
	lower: boolean;
	upper: boolean;
	number: boolean;
	special: boolean;
	length: number;
}

const randomImplementation = async ({ customAlphabetValue, customAlphabetFlag, lower, upper, number, special, length }: IRandom): Promise<string> => {

	const randomAlphabet = alphabet({
		lower: true,
		upper: true,
		number: true,
		special: true
	});

	const customAlphabet = customAlphabetFlag ? customAlphabetValue : alphabet({
		lower,
		upper,
		number,
		special
	})

	let password = '';
	let salt = '';
	for (let i = 0; i < 256; i++) {
		password += randomAlphabet.charAt(Math.floor(Math.random() * randomAlphabet.length));
	}
	for (let i = 0; i < 64; i++) {
		salt += randomAlphabet.charAt(Math.floor(Math.random() * randomAlphabet.length));
	}

	let N = 1 << 14, r = 8, p = 1;
	const hash = bytesToHex(await scrypt(password, salt, N, r, p, length));


	let result = hash;
	do {
		result = base({
			input: sha(result),
			alphabet: customAlphabet,
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

export default randomImplementation;
