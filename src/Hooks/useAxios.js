import axios from "axios";
import { useState, useEffect } from "react";

export const useAxios = (url) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			setIsPending(true);
			try {
				const res = await axios(url, { signal: controller.signal });

				if (!res.statusText === "OK") {
					throw new Error(res.statusText);
				}

				setIsPending(false);
				setData(res.data);
				setError(null);
			} catch (err) {
				if (err.name === "AbortError") {
					console.log("the fetch was aborted");
				} else {
					setIsPending(false);
					setError(true);
				}
			}
		};
		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, isPending, error };
};
