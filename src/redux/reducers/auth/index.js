const authReducer = (state = { shouldLogout: false }, action) => {
	switch (action.type) {
		case "SET_PROFILE_DATA":
			return { ...state, profileData: action.payload };
		case "IS_USER_VERIFIED":
			return { ...state, verifiedOrNot: action.payload };
		case "RESEND_EMAIL":
			return { ...state, resendEmail: action.payload };
		case "VALIDATE_EMIAL":
			return { ...state, validateEmail: action.payload };
		case "SHOULD_LOGOUT":
			return { ...state, shouldLogout: action.payload };
		default:
			return { ...state };
	}
};

export default authReducer;
