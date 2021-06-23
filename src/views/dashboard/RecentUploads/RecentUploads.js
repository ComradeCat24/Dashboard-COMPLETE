import React from "react";
import {
	Row,
	Col,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Table,
	Badge,
} from "reactstrap";
import _ from "lodash";
import axiosAPI from "../../../components/axiosApi";

import "../../../assets/scss/pages/import-export.scss";

class RecentUploads extends React.Component {
	state = {
		data: [],
	};

	componentDidMount() {
		//recieve data from server using axiosAPI
		axiosAPI
			.get("/optix/documents")
			.then((response) => {
				const reducedData = _.take(response.data.data, 5);
				this.setState({ data: reducedData });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		let array = this.state.value
			? this.state.filteredData
			: this.state.data;

		let renderTableData = array.map((col, i) => {
			return (
				<tr key={col.id}>
					<td>{i + 1}</td>
					<td>
						<div className="user-info text-truncate ml-0">
							<span
								title={col.filename}
								className="d-block text-bold-500 text-truncate mb-0"
							>
								{col.filename}
							</span>
						</div>
					</td>
					<td>{col.date}</td>
					<td>
						<Badge
							color={
								col.status === "Reviewed"
									? "light-success"
									: col.status === "Processed"
									? "light-warning"
									: col.status === "Processing"
									? "light-danger"
									: "light-error"
							}
							pill
						>
							{col.status}
						</Badge>
					</td>
				</tr>
			);
		});
		return (
			<React.Fragment>
				{this.state.data.length !== 0 && (
					<Row className="export-component">
						<Col sm="12">
							<Card>
								<CardHeader>
									<CardTitle>Recent Uploads</CardTitle>
								</CardHeader>
								<CardBody>
									<Table
										innerRef={(el) => (this.tableRef = el)}
										className="dashboard-table table-hover-animation mb-0 mt-1"
										responsive
									>
										<thead>
											<tr>
												<th>SNo.</th>
												<th>File Name</th>
												<th>Date Added</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>{renderTableData}</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				)}
			</React.Fragment>
		);
	}
}

export default RecentUploads;
