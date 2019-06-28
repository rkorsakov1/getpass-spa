import { base } from "auxiliary/base";
import { scrypt, bytesToHex } from "auxiliary/scrypt";
import { alphabet, verify } from "auxiliary/alphabet";
import { sha256, Message } from 'js-sha256';
import { defaults } from 'auxiliary/defaults';


const copyToClipboard = (text: string) => {
    var copyFrom = document.createElement("textarea");
    var copyTo = document.getElementById("clipboard");
    copyFrom.textContent = text;

    copyTo!.appendChild(copyFrom);

    copyFrom.select();
    document.execCommand('copy');

    copyTo!.removeChild(copyFrom);
}

export interface GeneratorState {
    login: string,
    secret: string,
    service: string,
    counter: number,
    length: number,
    lower: boolean,
    upper: boolean,
    number: boolean,
    special: boolean,
    costFactor: number,
    blockSizeFactor: number,
}

export interface RandomState {
    customAlphabetValue: string,
    customAlphabetFlag: boolean,
    lower: boolean,
    upper: boolean,
    number: boolean,
    special: boolean,
    length: number,
}


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

const randomImplementation = async ({ customAlphabetValue, customAlphabetFlag, lower, upper, number, special, length }: RandomState): Promise<string> => {

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
const generatePasswordImplementation = async ({ login, service, secret, counter, lower, upper, number, special, length, costFactor, blockSizeFactor }: GeneratorState): Promise<string> => {
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

export { copyToClipboard, generatePasswordImplementation, randomImplementation, defaults };