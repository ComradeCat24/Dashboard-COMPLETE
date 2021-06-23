import React from "react";
import {
	Alert,
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Col,
} from "reactstrap";
import { connect } from "react-redux";
import { ExternalLink } from "react-feather";
import {
	isUserVerified,
	resendVerificationEmail,
} from "../../redux/actions/auth";

class General extends React.Component {
	state = {
		visibleUpgrades: true,
		visibleEmailConformation: null,
	};

	componentDidMount() {
		this.props.isUserVerified(({ success }) => {
			this.setState({
				visibleEmailConformation: !!success,
			});
		});
	}

	dismissUpgradeAlert = () => {
		this.setState({
			visibleUpgrades: false,
		});
	};

	dismissEmailConformationAlert = () => {
		this.setState({
			visibleEmailConformation: false,
		});
	};

	render() {
		const { profileData, resendVerificationEmail } = this.props;
		return (
			<React.Fragment>
				<Alert
					className="mb-2"
					color="success"
					isOpen={this.state.visibleUpgrades}
					toggle={this.dismissUpgradeAlert}
				>
					<p className="mb-0">
						Upgrade to Premium. {"  "}
						<Button.Ripple
							color="flat-primary"
							className="text-primary"
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.bitfringe.com/pricing"
						>
							Pricing Page{"  "}
							<ExternalLink size={13} />
						</Button.Ripple>
					</p>
				</Alert>

				{profileData ? (
					<Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
						<Row>
							<Col sm="12">
								<FormGroup>
									<Label for="name">First Name</Label>

									<Input
										id="name"
										defaultValue={profileData.first_name}
									/>
								</FormGroup>
							</Col>
							<Col sm="12">
								<FormGroup>
									<Label for="email">Last Name</Label>
									<Input
										id="name"
										defaultValue={profileData.last_name}
									/>
								</FormGroup>
							</Col>
							<Col sm="12">
								<FormGroup>
									<Label for="number">Phone Number</Label>
									<Input
										name="number"
										defaultValue={profileData.phone_number}
									/>
								</FormGroup>
							</Col>
							<Col sm="12">
								<Alert
									className="mb-2"
									color="warning"
									isOpen={this.state.visibleEmailConformation}
									toggle={this.dismissEmailConformationAlert}
								>
									<p className="mb-0">
										Your email is not confirmed. Please
										check your inbox.
										<Button.Ripple
											// className="text-primary"
											color="flat-primary"
											onClick={() =>
												resendVerificationEmail()
											}
										>
											Resend Confirmation
										</Button.Ripple>
									</p>
								</Alert>
							</Col>
							<Col
								className="d-flex justify-content-start flex-wrap"
								sm="12"
							>
								<Button.Ripple
									className="mr-50"
									type="submit"
									color="primary"
								>
									Save Changes
								</Button.Ripple>
								<Button.Ripple
									type="submit"
									color="danger"
									outline
								>
									Cancel
								</Button.Ripple>
							</Col>
						</Row>
					</Form>
				) : null}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profileData: state.authReducer.profileData,
	};
};

export default connect(mapStateToProps, {
	isUserVerified,
	resendVerificationEmail,
})(General);
