import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import * as Icon from "react-feather";

class SideMenuContent extends React.Component {
	render() {
		const navigationConfig = [
			{
				id: "dashboard",
				title: "Dashboard",
				icon: <Icon.Home size={20} />,
				navLink: "/",
			},
			{
				id: "uploads",
				title: "Uploads",
				icon: <Icon.Upload size={20} />,
				navLink: "/uploads",
			},
			{
				id: "myDocuments",
				title: "My Documents",
				icon: <Icon.List size={20} />,
				navLink: "/my-docs",
			},
			{
				id: "accountSettings",
				title: "Account Settings",
				icon: <Icon.Settings size={20} />,
				navLink: "/account-settings",
			},
			{
				id: "faq",
				title: "FAQ",
				icon: <Icon.HelpCircle size={20} />,
				navLink: "/faq",
			},
		];

		// Loop over sidebar items
		const menuItems = navigationConfig.map((item) => {
			return (
				<li
					className={classnames("nav-item", {
						hover: this.props.hoverIndex === item.id,
						active: this.props.activeItemState === item.navLink,
					})}
					key={item.id}
					onClick={(e) => {
						e.stopPropagation();

						this.props.handleActiveItem(item.navLink);
						if (this.props.deviceWidth <= 1200) {
							this.props.toggleMenu();
						}
					}}
				>
					<Link
						to={item.navLink}
						key={item.id}
						className="d-flex"
						onMouseEnter={() => {
							this.props.handleSidebarMouseEnter(item.id);
						}}
						onMouseLeave={() => {
							this.props.handleSidebarMouseEnter(item.id);
						}}
					>
						<div className="menu-text">
							{item.icon}
							<span className="menu-item menu-title">
								{item.title}
							</span>
						</div>
					</Link>
				</li>
			);
		});
		return <>{menuItems}</>;
	}
}
export default SideMenuContent;
