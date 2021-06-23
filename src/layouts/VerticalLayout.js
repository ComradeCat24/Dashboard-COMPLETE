import React, { PureComponent } from "react";
import classnames from "classnames";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { connect } from "react-redux";
import { changeMode, collapseSidebar } from "../redux/actions/customizer/index";

class VerticalLayout extends PureComponent {
	state = {
		width: window.innerWidth,
		sidebarState: this.props.app.customizer.sidebarCollapsed,
		collapsedContent: this.props.app.customizer.sidebarCollapsed,
		sidebarHidden: false,
	};

	mounted = false;

	updateWidth = () => {
		if (this.mounted) {
			this.setState({
				width: window.innerWidth,
			});
		}
	};

	handleChangeMode = (mode) => {
		this.props.changeMode(mode);
	};

	componentDidMount() {
		this.mounted = true;
		let {
			app: {
				customizer: { theme },
			},
		} = this.props;

		if (this.mounted) {
			if (window !== "undefined") {
				window.addEventListener("resize", this.updateWidth, false);
			}

			return theme === "dark"
				? document.body.classList.add("dark-layout")
				: theme === "semi-dark"
				? document.body.classList.add("semi-dark-layout")
				: null;
		}
	}

	componentDidUpdate(prevProps) {
		let {
			app: {
				customizer: { theme, sidebarCollapsed },
			},
		} = this.props;

		if (this.mounted) {
			if (theme === "dark") {
				document.body.classList.remove("semi-dark-layout");
				document.body.classList.add("dark-layout");
			}
			if (theme === "semi-dark") {
				document.body.classList.remove("dark-layout");
				document.body.classList.add("semi-dark-layout");
			}
			if (theme !== "dark" && theme !== "semi-dark") {
				document.body.classList.remove(
					"dark-layout",
					"semi-dark-layout"
				);
			}

			if (
				prevProps.app.customizer.sidebarCollapsed !==
				this.props.app.customizer.sidebarCollapsed
			) {
				this.setState({
					collapsedContent: sidebarCollapsed,
					sidebarState: sidebarCollapsed,
				});
			}
		}
	}

	toggleSidebarMenu = (val) => {
		this.setState({
			sidebarState: !this.state.sidebarState,
			collapsedContent: !this.state.collapsedContent,
		});
	};

	sidebarMenuHover = (val) => {
		this.setState({
			sidebarState: val,
		});
	};

	handleSidebarVisibility = () => {
		if (this.mounted) {
			if (window !== undefined) {
				window.addEventListener("resize", () => {
					if (this.state.sidebarHidden) {
						this.setState({
							sidebarHidden: !this.state.sidebarHidden,
						});
					}
				});
			}
			this.setState({
				sidebarHidden: !this.state.sidebarHidden,
			});
		}
	};

	componentWillUnmount() {
		this.mounted = false;
	}

	handleCurrentLanguage = (lang) => {
		this.setState({
			currentLang: lang,
		});
	};

	render() {
		let appProps = this.props.app.customizer;

		let sidebarProps = {
			toggleSidebarMenu: this.props.collapseSidebar,
			toggle: this.toggleSidebarMenu,
			sidebarState: this.state.sidebarState,
			sidebarHover: this.sidebarMenuHover,
			sidebarVisibility: this.handleSidebarVisibility,
			visibilityState: this.state.sidebarHidden,
			activePath: this.props.match.path,
			collapsed: this.state.collapsedContent,
			deviceWidth: this.state.width,
		};

		let navbarProps = {
			toggleSidebarMenu: this.toggleSidebarMenu,
			sidebarState: this.state.sidebarState,
			sidebarVisibility: this.handleSidebarVisibility,
		};

		let customizerProps = {
			changeMode: this.handleChangeMode,
			activeMode: appProps.theme,
		};

		return (
			<div
				className={classnames(`wrapper vertical-layout`, {
					"menu-collapsed":
						this.state.collapsedContent === true &&
						this.state.width >= 1200,
				})}
			>
				<Sidebar {...sidebarProps} />
				<div className="app-content content">
					<Navbar {...navbarProps} {...customizerProps} />
					<div className="content-wrapper">{this.props.children}</div>
				</div>
				<Footer />
				<div
					className="sidenav-overlay"
					onClick={this.handleSidebarVisibility}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		app: state.customizer,
	};
};
export default connect(mapStateToProps, {
	changeMode,
	collapseSidebar,
})(VerticalLayout);
