import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import notAuthImg from "../../assets/img/pages/not-authorized.png";

class NotAuthorized extends React.Component {
	render() {
		return (
			<>
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ height: "100vh" }}
				>
					<Row className="m-0">
						<Col sm="12">
							<Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
								<CardBody className="text-center">
									<img
										src={notAuthImg}
										alt="notAuthImg"
										className="img-fluid align-self-center mt-75"
									/>
									<h1 className="my-2 error-head black">
										You are not authorized!
									</h1>
									<p className="pt-2 mb-0 black">
										Try refreshing the page or logging in
										again.
									</p>

									<Button.Ripple
										tag="a"
										href="/"
										color="primary"
										size="lg"
										className="mt-2 round"
									>
										Refresh
									</Button.Ripple>
									<br />
									<Button.Ripple
										tag="a"
										href="https://www.bitfringe.com/"
										target="_blank"
										rel="noopener noreferrer"
										color="secondary round"
										size="md"
										className="mt-2"
										outline
										onClick={() => localStorage.clear()}
									>
										SignIn
									</Button.Ripple>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}
export default NotAuthorized;
