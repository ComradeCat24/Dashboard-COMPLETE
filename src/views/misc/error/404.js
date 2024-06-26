import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { history } from "../../../history";
import errorImg from "../../../assets/img/pages/404_2.png";

class Error404 extends React.Component {
	render() {
		return (
			<Row className="m-0">
				<Col sm="12">
					<Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
						<CardBody className="text-center">
							<img
								src={errorImg}
								alt="404ErrorImg"
								className="img-fluid align-self-center notfound"
							/>

							<h1 className="my-1 error-head black">
								Page Not Found!
							</h1>
							<p className="pt-2 mb-0 black">
								Looks like the page you requested was not found.
							</p>
							<Button.Ripple
								color="primary"
								size="lg"
								className="mt-2"
								onClick={() => history.goBack()}
							>
								Back to Dashboard
							</Button.Ripple>
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}
export default Error404;
