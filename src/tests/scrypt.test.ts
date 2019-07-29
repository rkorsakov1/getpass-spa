/* eslint-disable */
import { scrypt, bytesToHex } from "../auxiliary";

interface ScryptInterface {
	password: string;
	salt: string;
	dkLen: number;
	n: number;
	r: number;
	p: number;
}

class ScryptTest {
	private input: ScryptInterface;
	public constructor(input: ScryptInterface) {
		this.input = input;
	}

	public async evaluate(): Promise<string> {
		let { password, salt, n, r, p, dkLen } = this.input;
		return bytesToHex(await scrypt(password, salt, n, r, p, dkLen));
	}
}

describe('Scrypt implementation', () => {
	test('Scrypt implementation', async () => {
		let s1 = new ScryptTest({
			password: "The quick brown fox jumps over the lazy dog",
			salt: "fox137",
			dkLen: 64,
			n: 1 << 12,
			r: 8,
			p: 1
		});
		let s2 = new ScryptTest({
			password: "The quick brown fox jumps over the lazy dog",
			salt: "doge",
			dkLen: 128,
			n: 1 << 14,
			r: 8,
			p: 1
		});
		let s3 = new ScryptTest({
			password: "Шустрая коричневая лиса прыгает через обленившуюся собаку",
			salt: "ГалактикаUniverse",
			dkLen: 64,
			n: 1 << 12,
			r: 8,
			p: 1
		});
		let s4 = new ScryptTest({
			password: "Шустрая коричневая лиса прыгает через обленившуюся собаку",
			salt: "!!@#мишки",
			dkLen: 128,
			n: 1 << 14,
			r: 8,
			p: 1
		});
		let s5 = new ScryptTest({
			password: "速い茶色のキツネは怠惰な犬を飛び越えます",
			salt: "うまく_!",
			dkLen: 64,
			n: 1 << 12,
			r: 8,
			p: 1
		});
		let s6 = new ScryptTest({
			password: "速い茶色のキツネは怠惰な犬を飛び越えます",
			salt: "ありがとう",
			n: 1 << 14,
			dkLen: 128,
			r: 8,
			p: 1
		});

		expect(
			await s1.evaluate()).toEqual(
			"17b7fb3f00219c8a1602aeb58b3597725a545df7df287553c27a791bb50404fb155e0d75434c3a64aa9da2cc2028d3a5e9045fe08ca4366940a83bd152c21657",
		);
		expect(
			await s2.evaluate()).toEqual(
			"5c4ff3ba45edb5278687e05d8b68e945473ea1b408e908fe8da0f0b83d35e86f95e263a938e998db22f3ca20444cdb1b01439f2c075a7967caca73b9b3138901687a5a90317347d8abcf0d6ae13bed3c099e40f5a41288ffda746a1727c5e499ba4d7efa402a1b4d4793a84c39606b5570e034285ae3b0b8dc830034add48d3f",
		);
		expect(
			await s3.evaluate()).toEqual(
			"fb345e458419e6c6277be8dbd2cea6cac9dd20ae2fdc3a4a87efadb0e04c6174e024343e65f624e86ee3f29c07e8ba629bd83761755ee92fb54409492691e6f9",
		);
		expect(
			await s4.evaluate()).toEqual(
			"98f1cad2639d24ca9b5924043fe2875d42e492231a6cb5236e06750e9dc8aff946c5fb4b6dee8491b201fb7e1efef18f5da0d5d0d00afffe231cae714c124a74329fc82c4ac987994ac0242f66a9069acbc54f0b3c6390197ed47e499ad81bf41080d23d30825231573b744589369dc042e7e2611678b48b1c594d192fca969d",
		);
		expect(
			await s5.evaluate()).toEqual(
			"d1023c164b86e336f3ae5e15634553b8af75409c026e40b15eeffbae75beb3e074d3b401a2f72158db23cc1c2c5274012c921e1396e746624009e85f0e2fca6d",
		);
		expect(
			await s6.evaluate()).toEqual(
			"a961446f48cb27fbd20baf030679a6f26ecbcba8153c81adba1a2e31455faf89bb3fa9227de35ad3b9323f16f5f20e5972a9ea809d09f7a7efffa69ea4cc9867116cdf872f2105defa27845d0b739b31d9735b2b843096443d34ac71c8d99b87ccd7e4a22b586cdfb6dd602ffed38cbd1addcaf9fefd5519f69437e705c7bd2d",
		);
	})
})
