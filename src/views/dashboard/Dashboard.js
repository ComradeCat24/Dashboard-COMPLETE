import React from "react";
import { Row, Col } from "reactstrap";
import SalesCard from "./Sales/SalesCard";
// import Xyz from "./Xyz/Xyz";
import RecentUploads from "./RecentUploads/RecentUploads";
import UploadsThisWeek from "./UploadsThisWeek/UploadsThisWeek";

import "../../assets/scss/pages/dashboard-analytics.scss";

class AnalyticsDashboard extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Row className="match-height">
					<Col lg="6" md="12">
						<SalesCard />
					</Col>
					{/* <Col lg="3" md="6" sm="12">
						<Xyz />
					</Col> */}
					<Col lg="6" md="12">
						<UploadsThisWeek />
					</Col>
				</Row>

				<Row>
					<Col sm="12">
						<RecentUploads />
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}

export default AnalyticsDashboard;
