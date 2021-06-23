import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import errorImg from "../../../assets/img/pages/maintain.png";

class Error500 extends React.Component {
	render() {
		return (
			<Row className="m-0">
				<Col sm="12">
					<Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
						<CardBody className="text-center">
							<img
								src={errorImg}
								alt="ErrorImg"
								className="img-fluid align-self-center mt-75 servdown"
							/>
							{/* <h1 className="font-large-2 my-2">
								Internal Server Error!
							</h1> */}
							<h1 className="my-2 error-head black">
								Server is taking too long to respond.
							</h1>
							<p style={{ color: "black" }}>
								The site could be temporarily unavailable or too
								busy. Try Logging In again or try in a few
								moments.
								<br />
								{/* <br />
								If you are unable to load any pages, check your
								computer’s network connection.
								<br />
								<br />
								If your computer or network is protected by a
								firewall or proxy, make sure that your Browser
								is permitted to access the Web. */}
							</p>
							<Button.Ripple
								tag="a"
								href="/"
								color="primary"
								size="lg"
								className="mt-2 round"
							>
								Try Again
							</Button.Ripple>{" "}
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
		);
	}
}
export default Error500;
