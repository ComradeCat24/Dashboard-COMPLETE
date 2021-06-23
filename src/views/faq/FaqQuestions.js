import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Collapse } from "reactstrap";
import { ChevronDown } from "react-feather";
import classnames from "classnames";

const collapseItems = [
	{
		id: 1,
		title: "Is my data safe?",
		content:
			"BitFringe does not use third-party services for storage or computing, all data is uploaded to our solely controlled data centre and stored securely for your unhindred usage.",
	},
	{
		id: 2,
		title: "How do i cancel my subscription ?",
		content:
			"We apologise if you are facing issues with our service and we are unhappy to let you go. You can easily cancel your subscription, downgrade & delete your account by navigating to those options in the My Profile section ",
	},
	{
		id: 3,
		title: "I want to process more documents than the Enterprise plan",
		content:
			"You can contact our Sales team through the Contact Us section on the website and we'll be happy to cater to all your needs.",
	},
];

class FaqQuestions extends React.Component {
	state = {
		collapseID: "",
		status: "Closed",
	};

	toggleCollapse = (collapseID) => {
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : "",
		}));
	};

	onEntered = (id) => {
		if (id === this.state.collapseID) this.setState({ status: "Opened" });
	};
	onEntering = (id) => {
		if (id === this.state.collapseID)
			this.setState({ status: "Opening..." });
	};

	onExited = (id) => {
		if (id === this.state.collapseID) this.setState({ status: "Closed" });
	};

	onExiting = (id) => {
		if (id === this.state.collapseID)
			this.setState({ status: "Closing..." });
	};

	render() {
		const accordionMarginItems = collapseItems.map((collapseItem) => {
			if (this.props.value > 0) {
				return (
					<div
						className="collapse-margin accordion vx-collapse"
						key={collapseItem.id}
					>
						<Card
							onClick={() => this.toggleCollapse(collapseItem.id)}
							className={classnames("shadow-none", {
								"collapse-collapsed":
									this.state.status === "Closed" &&
									this.state.collapseID === collapseItem.id,
								"collapse-shown":
									this.state.status === "Opened" &&
									this.state.collapseID === collapseItem.id,
								closing:
									this.state.status === "Closing..." &&
									this.state.collapseID === collapseItem.id,
								opening:
									this.state.status === "Opening..." &&
									this.state.collapseID === collapseItem.id,
							})}
						>
							<CardHeader>
								<CardTitle className="lead collapse-title collapsed text-truncate w-75">
									{collapseItem.title}
								</CardTitle>
								<ChevronDown
									className="collapse-icon"
									size={15}
								/>
							</CardHeader>
							<Collapse
								isOpen={
									collapseItem.id === this.state.collapseID
								}
								onEntering={() =>
									this.onEntering(collapseItem.id)
								}
								onEntered={() =>
									this.onEntered(collapseItem.id)
								}
								onExiting={() =>
									this.onExiting(collapseItem.id)
								}
								onExited={() => this.onExited(collapseItem.id)}
							>
								<CardBody className="answer-faq">{collapseItem.content}</CardBody>
							</Collapse>
						</Card>
					</div>
				);
			} else if (
				collapseItem.title.toLowerCase().includes(this.props.value)
			) {
				return (
					<div
						className="collapse-margin accordion vx-collapse"
						key={collapseItem.id}
					>
						<Card
							onClick={() => this.toggleCollapse(collapseItem.id)}
							className={classnames("shadow-none", {
								"collapse-collapsed":
									this.state.status === "Closed" &&
									this.state.collapseID === collapseItem.id,
								"collapse-shown":
									this.state.status === "Opened" &&
									this.state.collapseID === collapseItem.id,
								closing:
									this.state.status === "Closing..." &&
									this.state.collapseID === collapseItem.id,
								opening:
									this.state.status === "Opening..." &&
									this.state.collapseID === collapseItem.id,
							})}
						>
							<CardHeader>
								<CardTitle className="lead collapse-title collapsed text-truncate w-75">
									{collapseItem.title}
								</CardTitle>
								<ChevronDown
									className="collapse-icon"
									size={15}
								/>
							</CardHeader>
							<Collapse
								isOpen={
									collapseItem.id === this.state.collapseID
								}
								onEntering={() =>
									this.onEntering(collapseItem.id)
								}
								onEntered={() =>
									this.onEntered(collapseItem.id)
								}
								onExiting={() =>
									this.onExiting(collapseItem.id)
								}
								onExited={() => this.onExited(collapseItem.id)}
							>
								<CardBody className="answer-faq">{collapseItem.content}</CardBody>
							</Collapse>
						</Card>
					</div>
				);
			} else {
				return null;
			}
		});
		return <div> {accordionMarginItems}</div>;
	}
}
export default FaqQuestions;
