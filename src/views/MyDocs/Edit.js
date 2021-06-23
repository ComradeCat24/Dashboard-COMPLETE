import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { ArrowLeft } from "react-feather";
import PdfView from "../Invoice/pdf/pdfView";
import OcrForm from "../Invoice/pdf/OcrForm";

export default class Edit extends Component {
	render() {
		const { preview, fileID, fileExt, fileName } = this.props;
		return (
			<Card>
				<CardBody>
					<ArrowLeft
						onClick={() => this.props.handleBackClick()}
						style={{ marginRight: "25px" }}
					/>
					{fileName}
					<hr />
					<Row>
						<Col lg="5" md="12" sm="12">
							{fileExt === "pdf" ? (
								<PdfView preview={preview} />
							) : (
								<img
									src={preview}
									alt="preview"
									style={{ width: "100%" }}
								/>
							)}
						</Col>
						<Col>
							<OcrForm fileID={fileID} />
						</Col>
					</Row>
				</CardBody>
			</Card>
		);
	}
}
