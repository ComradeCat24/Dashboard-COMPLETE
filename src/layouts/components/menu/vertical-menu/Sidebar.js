import React, { Component } from "react";
import classnames from "classnames";
import SidebarHeader from "./SidebarHeader";
import Hammer from "react-hammerjs";
import SideMenuContent from "./sidemenu/SideMenuContent";
import PerfectScrollbar from "react-perfect-scrollbar";

class Sidebar extends Component {
	static getDerivedStateFromProps(props, state) {
		if (props.activePath !== state.activeItem) {
			return {
				activeItem: props.activePath,
			};
		}
		// Return null if the state hasn't changed
		return null;
	}
	state = {
		width: window.innerWidth,
		hoveredMenuItem: null,
		activeItem: this.props.activePath,
		menuShadow: false,
		ScrollbarTag: PerfectScrollbar,
	};

	mounted = false;

	updateWidth = () => {
		if (this.mounted) {
			this.setState((prevState) => ({
				width: window.innerWidth,
			}));
			this.checkDevice();
		}
	};

	componentDidMount() {
		this.mounted = true;
		if (this.mounted) {
			if (window !== "undefined") {
				window.addEventListener("resize", this.updateWidth, false);
			}
			this.checkDevice();
		}
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	checkDevice = () => {
		var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
		var mq = function (query) {
			return window.matchMedia(query).matches;
		};

		if ("ontouchstart" in window || window.DocumentTouch) {
			this.setState({
				ScrollbarTag: "div",
			});
		} else {
			this.setState({
				ScrollbarTag: PerfectScrollbar,
			});
		}
		var query = [
			"(",
			prefixes.join("touch-enabled),("),
			"heartz",
			")",
		].join("");
		return mq(query);
	};

	handleSidebarMouseEnter = (id) => {
		if (id !== this.state.hoveredMenuItem) {
			this.setState({
				hoveredMenuItem: id,
			});
		} else {
			this.setState({
				hoveredMenuItem: null,
			});
		}
	};

	handleActiveItem = (url) => {
		this.setState({
			activeItem: url,
		});
	};

	render() {
		let {
			visibilityState,
			toggleSidebarMenu,
			sidebarHover,
			toggle,
			sidebarVisibility,
			activeTheme,
			collapsed,
			sidebarState,
		} = this.props;

		let { menuShadow, hoveredMenuItem, activeItem, ScrollbarTag } =
			this.state;
		let scrollShadow = (container, dir) => {
			if (container && dir === "up" && container.scrollTop >= 100) {
				this.setState({ menuShadow: true });
			} else if (
				container &&
				dir === "down" &&
				container.scrollTop < 100
			) {
				this.setState({ menuShadow: false });
			} else {
				return;
			}
		};
		return (
			<React.Fragment>
				<div
					className={classnames(
						`main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`,
						{
							collapsed: sidebarState === true,
							"hide-sidebar":
								this.state.width < 1200 &&
								visibilityState === false,
						}
					)}
					onMouseEnter={() => sidebarHover(false)}
					onMouseLeave={() => sidebarHover(true)}
				>
					<SidebarHeader
						toggleSidebarMenu={toggleSidebarMenu}
						collapsed={collapsed}
						toggle={toggle}
						sidebarVisibility={sidebarVisibility}
						menuShadow={menuShadow}
					/>
					<ScrollbarTag
						className={classnames("main-menu-content", {
							"overflow-hidden": ScrollbarTag !== "div",
							"overflow-scroll": ScrollbarTag === "div",
						})}
						{...(ScrollbarTag !== "div" && {
							options: { wheelPropagation: false },
							onScrollDown: (container) =>
								scrollShadow(container, "down"),
							onScrollUp: (container) =>
								scrollShadow(container, "up"),
							onYReachStart: () =>
								menuShadow === true &&
								this.setState({
									menuShadow: false,
								}),
						})}
					>
						<Hammer
							onSwipe={() => {
								sidebarVisibility();
							}}
						>
							<ul className="navigation navigation-main">
								<SideMenuContent
									activeItemState={activeItem}
									hoverIndex={hoveredMenuItem}
									handleActiveItem={this.handleActiveItem}
									deviceWidth={this.props.deviceWidth}
									toggleMenu={sidebarVisibility}
									handleSidebarMouseEnter={
										this.handleSidebarMouseEnter
									}
								/>
							</ul>
						</Hammer>
					</ScrollbarTag>
				</div>
			</React.Fragment>
		);
	}
}

export default Sidebar;
