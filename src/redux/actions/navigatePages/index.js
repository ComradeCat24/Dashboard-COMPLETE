export const changePage = (offset) => {
	return (dispatch) => dispatch({ type: "CHANGE_PAGE", offset });
};

export const resetPageNumber = () => {
	return (dispatch) => dispatch({ type: "RESET_PAGE_NUMBER" });
};
