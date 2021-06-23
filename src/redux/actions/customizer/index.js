export const changeMode = (mode) => {
	return (dispatch) => dispatch({ type: "CHANGE_MODE", mode });
};

export const collapseSidebar = (value) => {
	return (dispatch) => dispatch({ type: "COLLAPSE_SIDEBAR", value });
};
