import React from "react";
import logo from "../../assets/img/logo/nav-logo.png";
import "../../assets/scss/components/app-loader.scss";

class SpinnerComponent extends React.Component {
	render() {
		return (
			<div className="fallback-spinner vh-100">
				<img className="fallback-logo" src={logo} alt="logo" />
				<div className="spinner-msg">
					<div className="loading">
						<div className="effect-1 effects"></div>
						<div className="effect-2 effects"></div>
						<div className="effect-3 effects"></div>
					</div>
					{this.props.msg && (
						<div className="msg">
							<p className="msg-txt">{this.props.msg}</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default SpinnerComponent;
