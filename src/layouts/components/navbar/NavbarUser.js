import React from "react";
import {
	UncontrolledDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
} from "reactstrap";
import { User, Power } from "react-feather";
import Avatar from "../../../components/avatar/AvatarComponent";
import { history } from "../../../history";
import { userData, shouldLogout } from "../../../redux/actions/auth";
import { connect } from "react-redux";

class NavbarUser extends React.PureComponent {
	componentDidMount() {
		!!localStorage.getItem("access_token") && this.props.userData();
	}

	render() {
		const { profileData } = this.props.profileData;
		return (
			<ul className="nav navbar-nav navbar-nav-user float-right">
				<UncontrolledDropdown
					tag="li"
					className="dropdown-user nav-item"
				>
					<DropdownToggle
						tag="a"
						className="nav-link dropdown-user-link"
					>
						<div className="user-nav d-sm-flex d-none">
							<span className="user-name text-bold-600">
								{profileData && profileData.first_name}
							</span>
							<span className="user-status">
								{profileData && profileData.last_name}
							</span>
						</div>
						<span profileData-tour="user">
							{profileData && (
								<Avatar
									color="primary"
									content={profileData.first_name
										.substring(0, 2)
										.toUpperCase()}
									size="md"
								/>
							)}
						</span>
					</DropdownToggle>

					<DropdownMenu right>
						<DropdownItem
							onClick={() => history.push("/account-settings")}
						>
							<User size={14} className="mr-50" />
							<span className="align-middle">Edit Profile</span>
						</DropdownItem>

						<DropdownItem divider />
						<DropdownItem
							onClick={(e) => this.props.shouldLogout()}
						>
							<Power size={14} className="mr-50" />
							<span className="align-middle">Log Out</span>
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</ul>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profileData: state.authReducer,
	};
};

export default connect(mapStateToProps, { userData, shouldLogout })(NavbarUser);
