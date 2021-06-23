import React from "react";
import { Card, CardBody } from "reactstrap";
import Avatar from "../../../components/avatar/AvatarComponent";
import { connect } from "react-redux";

import decorLeft from "../../../assets/img/elements/decore-left.png";
import decorRight from "../../../assets/img/elements/decore-right.png";

class SalesCard extends React.Component {
	state = {
		day: new Date(),
	};

	componentDidMount() {
		let hr = this.state.day.getHours();

		// Greetings
		if (
			hr === 6 ||
			hr === 7 ||
			hr === 8 ||
			hr === 9 ||
			hr === 10 ||
			hr === 11
		) {
			this.setState({
				gretting: "Good Morning",
			});
		} else if (
			hr === 15 ||
			hr === 16 ||
			hr === 13 ||
			hr === 12 ||
			hr === 14 ||
			hr === 16
		) {
			this.setState({
				gretting: "Good Afternoon",
			});
		} else if (
			hr === 17 ||
			hr === 18 ||
			hr === 19 ||
			hr === 20 ||
			hr === 21 ||
			hr === 22
		) {
			this.setState({
				gretting: "Good Evening",
			});
		} else if (
			hr === 23 ||
			hr === 24 ||
			hr === 1 ||
			hr === 2 ||
			hr === 3 ||
			hr === 4 ||
			hr === 5
		) {
			this.setState({
				gretting: "You Need Sleep",
			});
		}

		// subtext
		if (hr === 1) {
			this.setState({
				subtext: "1 AM and still your going!",
			});
		} else if (hr === 2) {
			this.setState({
				subtext: "Hey, it is past 2AM! You can continue this tomorrow",
			});
		} else if (hr === 3) {
			this.setState({
				subtext: "Hey, it is after 3AM! Are you a vampire or what?",
			});
		} else if (hr === 4) {
			this.setState({ subtext: "4AM? You must roam all night huh!" });
		} else if (hr === 5) {
			this.setState({
				subtext: "Whoa! It's almost daylight and your still going!",
			});
		} else if (hr === 6) {
			this.setState({
				subtext: "Hey, isn't it too early to be using your computer",
			});
		} else if (hr === 7 || hr === 8 || hr === 9 || hr === 10) {
			this.setState({ subtext: "" });
		} else if (hr === 11) {
			this.setState({ subtext: "11AM... Is it time for lunch yet?" });
		} else if (hr === 12) {
			this.setState({
				subtext: "NOON! Great, it must be time for lunch!",
			});
		} else if (hr === 13) {
			this.setState({
				subtext: "",
			});
		} else if (hr === 14) {
			this.setState({ subtext: "It's 2 PM. Have you eaten lunch yet?" });
		} else if (hr === 15 || hr === 16) {
			this.setState({ subtext: "" });
		} else if (
			hr === 17 ||
			hr === 18 ||
			hr === 19 ||
			hr === 20 ||
			hr === 21 ||
			hr === 22
		) {
			this.setState({
				subtext: "Welcome to prime time on the web!",
			});
		} else if (hr === 23) {
			this.setState({
				subtext: "It's almost midnight...Aren't you sleepy yet?",
			});
		} else if (hr === 0) {
			this.setState({ subtext: "It's midnight... time to sleep!" });
		}
	}

	render() {
		const { profileData } = this.props.profileData;
		return (
			<>
				<Card className="bg-analytics text-white sales-card">
					{profileData && (
						<>
							<CardBody className="text-center">
								<img
									src={decorLeft}
									alt="card-img-left"
									className="img-left"
								/>
								<img
									src={decorRight}
									alt="card-img-right"
									className="img-right"
								/>
								<Avatar
									color="primary"
									content={profileData.first_name
										.substring(0, 2)
										.toUpperCase()}
									size="xl"
								/>
								<div className="award-info text-center">
									<h1 className="mb-2 text-white">
										{this.state.gretting},{" "}
										{profileData.first_name}
									</h1>
								</div>
								<p className="m-auto mb-0 w-75">
									{this.state.subtext}
								</p>
							</CardBody>
						</>
					)}
				</Card>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profileData: state.authReducer,
	};
};

export default connect(mapStateToProps)(SalesCard);
