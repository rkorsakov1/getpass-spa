const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialCase = '!#$%&()*+,-.:;<=>?@[]^_{}';
const numberCase = '0123456789';

const lowerCaseArray = lowerCase.split('');
const upperCaseArray = upperCase.split('');
const specialCaseArray = specialCase.split('');
const numberCaseArray = numberCase.split('');

interface AlphabetProps {
	lower: boolean;
	upper: boolean;
	number: boolean;
	special: boolean;
}

interface VerifyProps extends AlphabetProps {
	input: string;
}

interface ApplyProps {
	flag: boolean;
	alphabet: string;
}

const apply = ({ flag, alphabet }: ApplyProps): string => {
	return flag ? alphabet : '';
}

const alphabet = ({ lower, upper, number, special }: AlphabetProps): string => {
	return [
		apply({ flag: lower, alphabet: lowerCase }),
		apply({ flag: upper, alphabet: upperCase }),
		apply({ flag: number, alphabet: numberCase }),
		apply({ flag: special, alphabet: specialCase }),
	].join('');
}

const verify = ({ lower, upper, number, special, input }: VerifyProps): boolean => {
	var inputArray = input.split('');
	if (lower) {
		if (!inputArray.filter((el): boolean => lowerCaseArray.includes(el)).length) {
			return false;
		}
	}
	if (upper) {
		if (!inputArray.filter((el): boolean => upperCaseArray.includes(el)).length) {
			return false;
		}
	}
	if (number) {
		if (!inputArray.filter((el): boolean => numberCaseArray.includes(el)).length) {
			return false;
		}
	}
	if (special) {
		if (!inputArray.filter((el): boolean => specialCaseArray.includes(el)).length) {
			return false;
		}
	}
	return true;
}

export { alphabet, verify };
