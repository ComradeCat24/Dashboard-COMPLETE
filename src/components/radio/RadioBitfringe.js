import React from "react";
import classnames from "classnames";

class RadioBitfringe extends React.Component {
	render() {
		return (
			<div
				className={classnames(
					`bf-radio-con ${this.props.className} bf-radio-${this.props.color}`
				)}
			>
				<input
					type="radio"
					defaultChecked={this.props.defaultChecked}
					value={this.props.value}
					disabled={this.props.disabled}
					name={this.props.name}
					onClick={this.props.onClick}
					onChange={this.props.onChange}
					ref={this.props.ref}
					checked={this.props.checked}
				/>
				<span
					className={classnames("bf-radio", {
						"bf-radio-sm": this.props.size === "sm",
						"bf-radio-lg": this.props.size === "lg",
					})}
				>
					<span className="bf-radio--border" />
					<span className="bf-radio--circle" />
				</span>
				<span>{this.props.label}</span>
			</div>
		);
	}
}
export default RadioBitfringe;
