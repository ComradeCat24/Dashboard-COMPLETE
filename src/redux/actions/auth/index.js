import axiosAPI from "../../../components/axiosApi";
import { history } from "../../../history";

export const userData = () => {
	return (dispatch) => {
		axiosAPI
			.get("/auth/profile")
			.then((response) => {
				dispatch({
					type: "SET_PROFILE_DATA",
					payload: response.data.data[0],
				});
			})
			.catch((error) => {
				console.log(error);
				history.push("/error/500");
			});
	};
};

export const isUserVerified = (callback) => {
	return (dispatch) => {
		axiosAPI
			.get("/auth/check-verified")
			.then((response) => {
				callback(response.data);
				dispatch({
					type: "IS_USER_VERIFIED",
					payload: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const resendVerificationEmail = () => {
	return (dispatch) => {
		axiosAPI
			.get("/auth/validate-email")
			.then((response) => {
				dispatch({
					type: "RESEND_EMAIL",
					payload: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const validateEmail = (token, callback) => {
	return (dispatch) => {
		axiosAPI
			.post("/auth/validate-email", { token })
			.then((response) => {
				callback(response.data);
				dispatch({
					type: "VALIDATE_EMIAL",
					payload: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const shouldLogout = () => {
	localStorage.clear();
	history.push("/sso");
	return (dispatch) => {
		dispatch({
			type: "SHOULD_LOGOUT",
			payload: true,
		});
	};
};
