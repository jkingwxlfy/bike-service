export const useHttp = () => {
	const request = async (url, method = "GET", body = null) => {
		const token = localStorage.getItem("token");
		const headers = {
			"Content-Type": "application/json",
		};
		if (token) {
			headers.Authorization = "Bearer " + token;
		}

		try {
			const response = await fetch(url, { method, body, headers });

			const data = await response.json();

			if (data.status === "ERR") {
				throw new Error(`${data.message}`);
			}

			return data;
		} catch (e) {
			throw e;
		}
	};

	return { request };
};
