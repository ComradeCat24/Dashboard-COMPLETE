import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Menu } from "react-feather";

class CollapsableMenu extends React.PureComponent {
	render() {
		let { sidebarVisibility } = this.props;

		return (
			<div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
				<ul className="navbar-nav d-xl-none">
					<NavItem className="mobile-menu mr-auto">
						<NavLink
							className="nav-menu-main menu-toggle hidden-xs is-active"
							onClick={sidebarVisibility}
						>
							<Menu className="ficon" />
						</NavLink>
					</NavItem>
				</ul>
			</div>
		);
	}
}

export default CollapsableMenu;
