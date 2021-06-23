const initialPageConfig = {
	currentPage: 0,
};

const customizerReducer = (state = initialPageConfig, action) => {
	switch (action.type) {
		case "CHANGE_PAGE":
			return { ...state, currentPage: state.currentPage + action.offset };
		case "RESET_PAGE_NUMBER":
			return { ...state, currentPage: 0 };
		default:
			return state;
	}
};

export default customizerReducer;
