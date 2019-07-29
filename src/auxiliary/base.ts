interface BaseProps {
	alphabet: string;
	input: string;
}
interface LogarithmProps {
	radix: number;
	value: number;
}
interface BitCountProps {
	bitCount: number;
	charCount: number;
}

const stringToHex = (input: string): string => {
	const chars: string[] = input.split('');
	const hexChars = chars.map((el): string => el.charCodeAt(0).toString(2));
	const hexPaddedChars = hexChars.map((el): string => `${'0'.repeat(8 - el.length)}${el}`);

	return hexPaddedChars.join('');
}

//  https://m.habr.com/ru/post/219993/
//  http://kvanttt.github.io/BaseNcoding/

//  a - Alphabet capacity
//  b - radix (=2)
//  k - count of encoding chars
//  n - number of bits in radix b for representing k chars of alphabet
//  n1 - max block bits count (=64)
//  a^k >= b^n
//  rval = a^k / b^n inside [+1;+infinity) -> min
//  rbits = n/k inside [+1;+infinity) -> max
//  n inside [floor(log_b(a))); n1]
//  k = ceil(log_a(b^n))


const logarithm = ({ radix, value }: LogarithmProps): number => {
	return Math.log2(value) / Math.log2(radix);
}

const getOptimalBitsCount = (alphabetCapacity: number): BitCountProps => {
	const a = alphabetCapacity;
	const n1 = 64;  //  max block bits value
	const b = 2;    //  baseRadix

	let kFinal = 0;
	let nFinal = 0;
	let n0 = Math.floor(logarithm({ radix: b, value: a }));

	let deltaFinal = 0;

	for (let n = n0; n <= n1; n++) {
		let k = Math.ceil(n * logarithm({ radix: a, value: b }));
		let delta = n / k;

		if (delta > deltaFinal) {
			deltaFinal = delta;
			nFinal = n;
			kFinal = k;
		}
	}

	return { bitCount: nFinal, charCount: kFinal, };
}

const base = ({ alphabet, input }: BaseProps): string => {
	//alphabet = [...new Set(alphabet.split(''))].join('');
	let data = stringToHex(input);
	const { bitCount, charCount } = getOptimalBitsCount(alphabet.length);

	//  tail is withdrawn
	//  8 - UTF8 char length in bits
	const mainBitLength = Math.floor(input.length * 8 / bitCount) * bitCount;
	const mainCharCount = mainBitLength * charCount / bitCount;
	const length = mainCharCount / charCount;

	let result = '';
	for (let i = 0; i < length; i++) {
		const bitIndex = i * bitCount;

		const bitArray = data.slice(bitIndex, bitIndex + bitCount);
		let number = parseInt(bitArray, 2);

		for (let c = 0; c < charCount; c++) {
			result += alphabet[number % alphabet.length];
			number = Math.trunc(number / alphabet.length);
		}
	}

	return result;
}

export { base }
