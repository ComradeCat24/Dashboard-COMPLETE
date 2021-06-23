import React from "react";
import { Navbar } from "reactstrap";
import classnames from "classnames";
import CollapsableMenu from "./CollapsableMenu";
import NavbarUser from "./NavbarUser";
import { Sun, Moon } from "react-feather";

const ThemeNavbar = (props) => {
	return (
		<React.Fragment>
			<div className="content-overlay" />
			<div className="header-navbar-shadow" />
			<Navbar
				className={classnames(
					"header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow floating-nav",
					{
						"navbar-light": props.activeMode === "light",
						"navbar-dark": props.activeMode === "dark",
					}
				)}
			>
				<div className="navbar-wrapper">
					<div className="navbar-container content">
						<div
							className="navbar-collapse d-flex justify-content-between align-items-center"
							id="navbar-mobile"
						>
							<div className="bookmark-wrapper">
								<CollapsableMenu
									sidebarVisibility={props.sidebarVisibility}
								/>
							</div>
							{props.activeMode === "dark" ? (
								<div
									className="customizer-toggle"
									onClick={() => props.changeMode("light")}
								>
									<Sun className="open-icon" size={15} />
								</div>
							) : (
								<div
									className="customizer-toggle"
									onClick={() => props.changeMode("dark")}
								>
									<Moon className="open-icon" size={15} />
								</div>
							)}
							<NavbarUser />
						</div>
					</div>
				</div>
			</Navbar>
		</React.Fragment>
	);
};

export default ThemeNavbar;
