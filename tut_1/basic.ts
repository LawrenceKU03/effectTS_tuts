import { Effect, Data } from "effect";
import axios from "axios";


class ErroUnreachable extends Data.TaggedError("ErroUnreachable")<{
	readonly cause: string;
	readonly url: string;
}> { }

const getFn = (url: string): Effect<string, ErroUnreachable, never> => {
	Effect.tryPromise({
		try: async () => {
			const res = await axios.get(url);
			return res.data;
		},
		catch: (cause: unknown) => new ErroUnreachable({ cause, url })
	})
};

const main = async () => {
	const url = "https://google.com";
	const data = await getFn(url);
	console.log(data);
};

main()
