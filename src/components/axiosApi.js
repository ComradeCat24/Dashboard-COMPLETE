import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const accessToken = localStorage.getItem("access_token");

const axiosAPI = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: {
		Authorization: accessToken ? `Bearer ${accessToken}` : null,
		"Content-Type": "application/json",
		accept: "application/json",
	},
});

axiosAPI.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Prevent infinite loops
		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + "auth/refresh/"
		) {
			window.location.href = "https://www.bitfringe.com/";
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			error.response.statusText === "Unauthorized"
		) {
			const refresh = localStorage.getItem("refresh_token");

			if (refresh) {
				const tokenParts = JSON.parse(atob(refresh.split(".")[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);

				if (tokenParts.exp > now) {
					try {
						const response = await axiosAPI.post("/auth/refresh/", {
							refresh,
						});
						setNewHeaders(response.data);
						originalRequest.headers["Authorization"] =
							"Bearer " + response.data.access;
						return axiosAPI(originalRequest);
					} catch (error) {
						console.log("unable to set new token");
						console.log(error);
					}
				} else {
					localStorage.clear();
					console.log(
						"Refresh token is expired",
						tokenParts.exp,
						now
					);
					window.location.href = "https://www.bitfringe.com/";
				}
			} else {
				localStorage.clear();
				console.log("Refresh token not available.");
				window.location.href = "https://www.bitfringe.com/";
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export const setNewHeaders = (response) => {
	axiosAPI.defaults.headers["Authorization"] = "Bearer " + response.access;
	localStorage.setItem("access_token", response.access);
	response.refresh && localStorage.setItem("refresh_token", response.refresh);
};

export default axiosAPI;
