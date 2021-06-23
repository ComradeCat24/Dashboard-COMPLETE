import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Disc, X, Circle } from "react-feather";
import classnames from "classnames";
class SidebarHeader extends Component {
	render() {
		let {
			toggleSidebarMenu,
			collapsed,
			toggle,
			sidebarVisibility,
			menuShadow,
		} = this.props;
		return (
			<div className="navbar-header">
				<ul className="nav navbar-nav flex-row">
					<li className="nav-item mr-auto">
						<NavLink to="/" className="navbar-brand">
							<div className="brand-logo" />
							<h2 className="brand-text mb-0">BitFringe</h2>
						</NavLink>
					</li>
					<li className="nav-item nav-toggle">
						<div className="nav-link modern-nav-toggle">
							{collapsed === false ? (
								<Disc
									onClick={() => {
										toggleSidebarMenu(true);
										toggle();
									}}
									className="toggle-icon icon-x d-none d-xl-block font-medium-4 text-primary"
									size={20}
									data-tour="toggle-icon"
								/>
							) : (
								<Circle
									onClick={() => {
										toggleSidebarMenu(false);
										toggle();
									}}
									className="toggle-icon icon-x d-none d-xl-block font-medium-4 text-primary"
									size={20}
								/>
							)}
							<X
								onClick={sidebarVisibility}
								className="toggle-icon icon-x d-block d-xl-none font-medium-4 text-primary"
								size={20}
							/>
						</div>
					</li>
				</ul>
				<div
					className={classnames("shadow-bottom", {
						"d-none": menuShadow === false,
					})}
				/>
			</div>
		);
	}
}

export default SidebarHeader;
