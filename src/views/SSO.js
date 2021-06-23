// Parent Iframe
import React, { Component } from "react";
import { setNewHeaders } from "../components/axiosApi";
import { history } from "../history";
import Spinner from "../components/spinner/Fallback-spinner";
import { connect } from "react-redux";

class SSO extends Component {
	constructor(props) {
		super(props);
		this.iFrameRef = React.createRef();
	}

	componentDidMount() {
		this.props.shouldLogout
			? this.iFrameRef.current.addEventListener("load", () =>
					this.sendMessage()
			  )
			: window.addEventListener("message", this.getTokens);
	}

	getTokens = (e) => {
		if (e.origin !== "https://www.bitfringe.com") return;

		if (e.data.access && e.data.refresh) {
			setNewHeaders(e.data);
			return history.push("/");
		} else {
			return history.push("/not-authorized");
		}
	};

	sendMessage = () => {
		if (!this.iFrameRef.current) return;
		this.iFrameRef.current.contentWindow.postMessage("SHOULD_LOGOUT", "*");
		window.location.replace("https://www.bitfringe.com/");
	};

	render() {
		const message = this.props.shouldLogout
			? "HAVE A GOOD DAY! BYE"
			: "SETTING UP YOUR ACCOUNT";
		return (
			<>
				<Spinner msg={message} />

				<iframe
					id="iframe"
					ref={this.iFrameRef}
					src="https://www.bitfringe.com/sso"
					sandbox="allow-same-origin allow-scripts"
					style={{
						position: "absolute",
						width: 0,
						height: 0,
						border: 0,
					}}
					title="Child iframe"
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		shouldLogout: state.authReducer.shouldLogout,
	};
};

export default connect(mapStateToProps)(SSO);
