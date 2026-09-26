import axios from "axios";

const getFn = async (url: string): Promise<string> => {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (e: unknown) {
		throw new Error(`${e?.message}`);
	}
};

const main = async () => {
	const url = "https://google.com";
	const data = await getFn(url);
	console.log(data);
};

main()
