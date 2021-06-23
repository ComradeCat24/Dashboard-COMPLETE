import React, { Component } from "react";
import { connect } from "react-redux";
import { validateEmail } from "../redux/actions/auth";

class Verify extends Component {
	state = {
		status: "",
		message: "",
	};

	componentDidMount() {
		let search = window.location.search;
		let params = new URLSearchParams(search);
		let token = params.get("token");

		this.props.validateEmail(token, ({ status, message }) => {
			this.setState({ status, message });
		});
	}

	render() {
		return (
			<div>
				<p>status: {this.state.status}</p>
				<p>message: {this.state.message}</p>
			</div>
		);
	}
}

export default connect(null, { validateEmail })(Verify);
