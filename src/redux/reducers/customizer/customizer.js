const themeConfig = {
	theme: localStorage.getItem("theme") || "dark", // options[String]: 'light'(default), 'dark', 'semi-dark'
	sidebarCollapsed: true, // options[Boolean]: true, false(default)
};

const customizerReducer = (state = themeConfig, action) => {
	switch (action.type) {
		case "CHANGE_MODE":
			localStorage.setItem("theme", action.mode);
			return { ...state, theme: action.mode };
		case "COLLAPSE_SIDEBAR":
			return { ...state, sidebarCollapsed: action.value };

		default:
			return state;
	}
};

export default customizerReducer;
