import React from "react";
import {
	Row,
	Col,
	Button,
	Card,
	CardBody,
	Table,
	Label,
	CardHeader,
	CardTitle,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	CustomInput,
} from "reactstrap";
import { Search, ChevronLeft, ChevronRight } from "react-feather";
import XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { connect } from "react-redux";

class TableView extends React.Component {
	static getDerivedStateFromProps(props, state) {
		if (state.tableData !== props.tableData) {
			return { tableData: props.tableData };
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			tableData: [],
			filteredData: [],
			value: "",
			name: "",
			fileName: "",
			fileFormat: "xlsx",
			modal: false,
			tableNumber: 0,
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentPage !== this.props.currentPage) {
			return this.setState({ tableNumber: 0 });
		}
	}

	toggleModal = () => {
		this.setState({ modal: !this.state.modal });
	};

	handleFilter = (e) => {
		let data =
			this.state.tableData[this.props.currentPage][
				this.state.tableNumber
			];
		let filteredData = [];
		let value = e.target.value;
		this.setState({ value });

		if (value.length) {
			filteredData = data.filter((col) => {
				let keys = Object.keys(col);

				let startsWithCondition = keys.filter((key) => {
					return col[key]
						.toString()
						.toLowerCase()
						.startsWith(value.toLowerCase());
				});

				let includesCondition = keys.filter((key) =>
					col[key]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				);

				if (startsWithCondition.length) return col[startsWithCondition];
				else if (!startsWithCondition && includesCondition.length)
					return col[includesCondition];
				else return null;
			});
			this.setState({ value, filteredData });
		} else {
			return null;
		}
	};

	handleExport = () => {
		this.toggleModal();
		let bookType = this.state.fileFormat.length
			? this.state.fileFormat
			: "xlsx";

		//array of Arrays => Sheet
		let wb = XLSX.utils.book_new();

		this.state.tableData.map((pageData, idx) => {
			return pageData.map((data, i) => {
				// nomenclature
				let tableName = i !== 0 ? `Table ${i + 1}` : "";
				let sheetName = `Page ${idx + 1} ${tableName} `;

				// diving in multiple sheets
				wb.SheetNames.push(sheetName);
				let ws = XLSX.utils.aoa_to_sheet(data);
				wb.Sheets[sheetName] = ws;

				return ws;
			});
		});

		let wbout = XLSX.write(wb, { bookType, type: "binary" });

		const s2ab = (s) => {
			let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
			let view = new Uint8Array(buf); //create uint8array as viewer
			for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
			return buf;
		};

		let file =
			this.state.fileFormat.length && this.state.fileFormat.length
				? `${this.state.fileName}.${this.state.fileFormat}`
				: this.state.fileName.length
				? `${this.state.fileName}.xlsx`
				: this.state.fileFormat.length
				? `excel-sheet.${this.state.fileFormat}`
				: "excel-sheet.xlsx";

		return FileSaver.saveAs(
			new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
			file
		);
	};

	changeTable(offset) {
		this.setState((prevState) => {
			return {
				tableNumber: prevState.tableNumber + offset,
			};
		});
	}

	render() {
		let tableData = this.state.tableData[this.props.currentPage];

		let dataArr = this.state.value.length
			? this.state.filteredData
			: this.state.tableData.length && !this.state.value.length
			? tableData[this.state.tableNumber]
			: null;

		let renderTableBody =
			dataArr !== null && dataArr.length
				? dataArr.map((col, index1) => {
						let pageNumber = this.props.currentPage;
						let keys = Object.keys(col);
						let renderTd = keys.map((key, index) => (
							<td key={index} className="ocr-table">
								<Input
									type="text"
									value={col[key]}
									onChange={(event) => {
										this.forceUpdate();
										return this.props.handleChange(
											event,
											pageNumber,
											this.state.tableNumber,
											index1,
											index
										);
									}}
								/>
							</td>
						));
						return <tr key={index1}>{renderTd}</tr>;
				  })
				: null;

		return (
			<React.Fragment>
				{this.state.tableData.length ? (
					<Row>
						<Col sm="12">
							<Card>
								<CardHeader
									className="justify-content-between flex-wrap"
									style={{ padding: "1.5rem 0" }}
								>
									<CardTitle>{this.state.name}</CardTitle>
									<Col sm="12" className="pl-0 pr-0">
										<div className="d-flex justify-content-between flex-wrap">
											<Button
												color="primary"
												onClick={this.toggleModal}
												style={{
													height: "fit-content",
												}}
											>
												Export
											</Button>
											<div className="filter position-relative has-icon-left">
												<Input
													type="text"
													value={this.state.value}
													onChange={(e) =>
														this.handleFilter(e)
													}
												/>
												<div className="form-control-position">
													<Search size={15} />
												</div>
											</div>
										</div>
									</Col>
								</CardHeader>
								<CardBody
									style={{ paddingLeft: "0" }}
									className="pr-0"
								>
									<Table
										className="table-hover-animation"
										responsive
									>
										<tbody>{renderTableBody}</tbody>
									</Table>
									{this.state.tableData[
										this.props.currentPage
									].length !== 1 && (
										<>
											<Button
												className="round"
												color="primary"
												outline
												style={{
													marginRight: "10px",
													padding: "0",
													border: "none",
												}}
												disabled={
													this.state.tableNumber <= 0
												}
												onClick={() =>
													this.changeTable(-1)
												}
											>
												<ChevronLeft size="25" />
											</Button>

											<Button
												className="round"
												color="primary"
												outline
												style={{
													padding: "0",
													border: "none",
												}}
												disabled={
													this.state.tableNumber >=
													this.state.tableData[
														this.props.currentPage
													].length -
														1
												}
												onClick={() =>
													this.changeTable(1)
												}
											>
												<ChevronRight size="25" />
											</Button>
										</>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
				) : null}
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggleModal}
					className="modal-dialog-centered"
				>
					<ModalHeader toggle={this.toggleModal}>
						Export To
					</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Input
								type="text"
								value={this.state.fileName}
								onChange={(e) =>
									this.setState({ fileName: e.target.value })
								}
								placeholder="Enter File Name"
							/>
						</FormGroup>
						<FormGroup>
							<Label>File Format</Label>
							<CustomInput
								type="select"
								id="selectFileFormat"
								name="customSelect"
								value={this.state.fileFormat}
								onChange={(e) =>
									this.setState({
										fileFormat: e.target.value,
									})
								}
							>
								<option>xlsx</option>
								<option
									disabled={this.state.tableData.length !== 1}
								>
									csv
								</option>
								<option
									disabled={this.state.tableData.length !== 1}
								>
									txt
								</option>
							</CustomInput>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.handleExport}>
							Export
						</Button>
						<Button color="flat-danger" onClick={this.toggleModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentPage: state.navigatePages.currentPage,
	};
};

export default connect(mapStateToProps)(TableView);
