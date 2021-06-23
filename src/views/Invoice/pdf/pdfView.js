import React, { Component } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight } from "react-feather";
import { changePage } from "../../../redux/actions/navigatePages";
import { connect } from "react-redux";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PdfView extends Component {
	state = {
		numPages: null,
	};

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({
			numPages: numPages,
		});
	};

	render() {
		return (
			<>
				<Card>
					<CardBody>
						{this.props.preview && (
							<Document
								file={this.props.preview}
								onLoadSuccess={this.onDocumentLoadSuccess}
								className="pdfPrev"
							>
								<Page
									renderTextLayer={false}
									pageNumber={this.props.currentPage}
									style={{height:'100%', width:'100%'}}
								/>
							</Document>
						)}

						{this.state.numPages !== 1 && (
							<>
								<div>
									<p style={{ marginTop: "10px"}}>
										Page{" "}
										{this.props.currentPage ||
											(this.state.numPages
												? 1
												: "--")}{" "}
										of {this.state.numPages || "--"}
									</p>
									<Button
									className="round"
									color="primary"
									outline
									style={{ marginRight: "10px", padding:"0", border:"none"}}
									disabled={this.props.currentPage <= 1}
									onClick={() => this.props.changePage(-1)}
								>
									<ChevronLeft size="25" />
								</Button>
								
								<Button
									className="round"
									color="primary"
									outline
									style={{padding:"0", border:"none"}}
									disabled={
										this.props.currentPage >=
										this.state.numPages
									}
									onClick={() => this.props.changePage(1)}
								>
									<ChevronRight size="25" />
								</Button>
								</div>
								
							</>
						)}
					</CardBody>
				</Card>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentPage: state.navigatePages.currentPage + 1,
	};
};

export default connect(mapStateToProps, { changePage })(PdfView);
