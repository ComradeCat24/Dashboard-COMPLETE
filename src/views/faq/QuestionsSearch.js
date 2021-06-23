import React from "react";
import { Card, CardBody, FormGroup, Input, Row, Col } from "reactstrap";
import { Search } from "react-feather";
import FaqQuestions from "./FaqQuestions";

class QuestionSearch extends React.Component {
	state = {
		value: "",
	};
	onChange = (event) => {
		let searchText = event.target.value.toLowerCase();
		this.setState({
			value: searchText,
		});
	};
	render() {
		return (
			<Row>
				<Col sm="12">
					<Card className="faq-bg">
						<CardBody className="p-sm-4 p-2">
							<h1 className="white">Have Any Questions?</h1>
							<p className="mb-2 white">
								Scroll through our list of curated questions
								or drop a query to our customer support and we'll get back to you asap!
							</p>
							<form>
								<FormGroup className="position-relative has-icon-left mb-0">
									<Input
										type="text"
										placeholder="Search"
										bsSize="lg"
										value={this.state.value}
										onChange={this.onChange}
									/>
									<div className="form-control-position">
										<Search size={14} />
									</div>
								</FormGroup>
							</form>
						</CardBody>
					</Card>
				</Col>
				<Col sm="12">
					<div className="faq">
						<FaqQuestions value={this.state.value} />
					</div>
				</Col>
			</Row>
		);
	}
}
export default QuestionSearch;
