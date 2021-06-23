import React from "react";
import ReactDOM from "react-dom";
import {
	Row,
	Col,
	Card,
	CardBody,
	Button,
	Table,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	FormGroup,
	CustomInput,
	Pagination,
	PaginationItem,
	PaginationLink,
} from "reactstrap";
import { Search, Eye, Edit3, Delete, RefreshCw } from "react-feather";
import XLSX from "xlsx";
import * as FileSaver from "file-saver";
import axiosAPI from "../../components/axiosApi";
import PdfView from "../Invoice/pdf/pdfView";
import Edit from "./Edit";
import { history } from "../../history";
import classnames from "classnames";
import SweetAlert from "react-bootstrap-sweetalert";
import { resetPageNumber } from "../../redux/actions/navigatePages";
import { connect } from "react-redux";
import emptyImg from "../../assets/img/svg/e_2.svg";
import "../../assets/scss/pages/import-export.scss";

class MyInvoices extends React.Component {
	state = {
		data: [],
		filteredData: [],
		value: "",
		previewModal: false,
		modal: false,
		fileName: "",
		fileFormat: "xlsx",
		//temp_obj
		previewImage: {},
		isLoading: false,
		//pagination
		currentPage: 1,
		dataPerPage: 10,
		//alert
		defaultAlert: false,
		confirmAlert: false,
		cancelAlert: false,
	};

	componentDidMount() {
		this.requestData();
	}

	requestData = () => {
		this.setState({
			isLoading: true,
		});
		axiosAPI
			.get("/optix/documents")
			.then((response) => {
				const data = response.data.data;

				this.setState({
					data,
				});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setTimeout(() => {
					this.setState({
						isLoading: false,
					});
				}, 2000);
			});
	};

	// componentDidUpdate() {
	// 	setTimeout(
	// 		() =>
	// 			this.state.data.map((data) => {
	// 				data.status === "Processing" && this.requestData();
	// 			}),
	// 		2500
	// 	);
	// }

	togglePreviewModal = () => {
		this.setState({ previewModal: !this.state.previewModal });
	};

	toggleModal = () => {
		this.setState({ modal: !this.state.modal });
	};

	handleFilter = (e) => {
		let data = this.state.data;
		let filteredData = [];
		let value = e.target.value;
		this.setState({ value });
		if (value.length) {
			filteredData = data.filter((col) => {
				let startsWithCondition =
					col.filename
						.toLowerCase()
						.startsWith(value.toLowerCase()) ||
					col.date
						.toString()
						.toLowerCase()
						.startsWith(value.toLowerCase()) ||
					col.status.toLowerCase().startsWith(value.toLowerCase()) ||
					col.id
						.toString()
						.toLowerCase()
						.startsWith(value.toLowerCase());

				let includesCondition =
					col.filename.toLowerCase().includes(value.toLowerCase()) ||
					col.date.toLowerCase().includes(value.toLowerCase()) ||
					col.status.toLowerCase().includes(value.toLowerCase()) ||
					col.id
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase());

				if (startsWithCondition) return startsWithCondition;
				else if (!startsWithCondition && includesCondition)
					return includesCondition;
				else return null;
			});
			this.setState({ value, filteredData });
		}
	};

	handleExport = () => {
		this.toggleModal();
		let table = ReactDOM.findDOMNode(this.tableRef);
		let bookType = this.state.fileFormat.length
			? this.state.fileFormat
			: "xlsx";
		let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" });
		let wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" });

		const s2ab = (s) => {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
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

	handlePreview = (col, fileExt) => {
		this.setState({ previewImage: col, fileExt });
		this.togglePreviewModal();
	};

	handleEdit = (col, fileExt) => {
		this.setState({ edit: col, fileExt });
	};

	handleBackClick = () => {
		this.setState({ edit: null, fileExt: null });
	};

	handleDeleteId = (id) => {
		this.setState({ deleteFileID: id });
	};

	handleDelete = () => {
		const data = {
			id: this.state.deleteFileID,
		};

		axiosAPI
			.delete("/optix/delete", { data })
			.then(() => {
				this.requestData();
			})
			.catch((error) => console.log(error));
	};

	handleAlert = (state, value) => {
		this.setState({ [state]: value });
	};

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id),
		});
	}

	handleClick2(event) {
		this.setState({
			currentPage: Number(event.target.id),
		});
	}

	render() {
		let returnToTable = {
			handleBackClick: this.handleBackClick,
		};
		// Logic for displaying data
		let array = this.state.value
			? this.state.filteredData
			: this.state.data;

		const indexOfLastData = this.state.currentPage * this.state.dataPerPage;
		const indexOfFirstData = indexOfLastData - this.state.dataPerPage;
		const newArray = array.slice(indexOfFirstData, indexOfLastData);

		// Logic for displaying page numbers
		const pageNumbers = [];
		for (
			let i = 1;
			i <= Math.ceil(this.state.data.length / this.state.dataPerPage);
			i++
		) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map((number) => {
			return (
				<>
					<PaginationItem
						className={
							(this.state.currentPage === number
								? "active "
								: "") + "controls"
						}
					>
						<PaginationLink
							key={number}
							id={number}
							onClick={(e) => this.handleClick(e)}
						>
							{number}
						</PaginationLink>
					</PaginationItem>
				</>
			);
		});
		let renderTableData = newArray.map((col, i) => {
			return (
				<tr key={col.id}>
					<td>{i + 1}</td>
					{/* <td>{col.id}</td> */}
					<td>
						<div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
							<div className="user-img ml-xl-0 ml-2">
								<img
									className="img-fluid" //rounded-circle
									height="36"
									width="36"
									src={col.thumbnail}
									alt={col.name}
								/>
							</div>
							<div className="user-info text-truncate ml-xl-50 ml-0">
								<span
									title={col.filename}
									className="d-block text-bold-500 text-truncate mb-0"
								>
									{col.filename}
								</span>
							</div>
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
					<td>
						<Eye
							className="actions-icons"
							color="#726CEB"
							size="18"
							onClick={() => {
								this.props.resetPageNumber();
								let fileExt = col.filename.split(".").pop();
								this.handlePreview(col, fileExt);
							}}
						/>

						<Edit3
							className="actions-icons"
							color="#FE9D4E"
							size="18"
							onClick={() => {
								this.props.resetPageNumber();
								let fileExt = col.filename.split(".").pop();
								this.handleEdit(col, fileExt);
							}}
						/>

						<Delete
							color="#ea5455"
							size="18"
							onClick={() => {
								this.handleAlert("defaultAlert", true);
								this.handleDeleteId(col.id);
							}}
						/>
					</td>
				</tr>
			);
		});

		return (
			<React.Fragment>
				{this.state.edit && this.state.edit.id ? (
					<Edit
						fileID={this.state.edit.id}
						preview={this.state.edit.image}
						fileExt={this.state.fileExt}
						fileName={this.state.edit.filename}
						{...returnToTable}
					/>
				) : (
					<>
						<Row className="export-component">
							<Col sm="12">
								<Card className="nobottom">
									<CardBody>
										{this.state.data.length === 0 ? (
											<Row>
												<Col sm="12">
													<div className="default-mydocs full-layout wrapper blank-page flexbox-container">
														<img
															src={emptyImg}
															alt="emptyImg"
															className="img-fluid align-self-center mt-75 emptyImg"
														/>
														<h1
															className="my-0 error-head empty"
															style={{
																fontSize:
																	"2.5rem",
															}}
														>
															There are no items
															here.
														</h1>
														<p className="pt-1 mb-1 empty">
															Start adding your
															documents
														</p>
														<Button
															className="mr-1 mb-1 bg-gradient-primary"
															onClick={() =>
																history.push(
																	"/uploads"
																)
															}
														>
															Upload
														</Button>
													</div>
												</Col>
											</Row>
										) : (
											<Row>
												<Col sm="12">
													<div className="d-flex flex-wrap ">
														<Button
															className="exp"
															color="primary"
															onClick={
																this.toggleModal
															}
														>
															Export
														</Button>
														<div className="ml-auto">
															<Button
																className="mr-1 mb-1 refresh-icon"
																onClick={
																	this
																		.requestData
																}
																color="primary"
															>
																<RefreshCw
																	size={15}
																	className={classnames(
																		{
																			"spin-anim":
																				this
																					.state
																					.isLoading,
																		}
																	)}
																/>
															</Button>
														</div>
														{/* <div
															className="customizer-toggle refresh-ico"
															
														>
															<RefreshCw className="open-icon" size={15} />
														</div> */}
														<div className="filter position-relative has-icon-left">
															<Input
																type="text"
																value={
																	this.state
																		.value
																}
																onChange={(e) =>
																	this.handleFilter(
																		e
																	)
																}
															/>
															<div className="form-control-position">
																<Search
																	size={15}
																/>
															</div>
														</div>
													</div>
												</Col>
												<Col sm="12">
													<Table
														innerRef={(el) =>
															(this.tableRef = el)
														}
														className="table-hover-animation mt-2"
														responsive
													>
														<thead>
															<tr>
																<th>SNo.</th>
																<th>
																	File Name
																</th>
																<th>
																	Date Added
																</th>
																<th>Status</th>
																<th>Actions</th>
															</tr>
														</thead>
														<tbody>
															{renderTableData}
														</tbody>
													</Table>
													<Pagination className="d-flex justify-content-center mt-2">
														{renderPageNumbers}
													</Pagination>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>
							</Col>
						</Row>
						{/* Export Modal */}
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
											this.setState({
												fileName: e.target.value,
											})
										}
										placeholder="Enter File Name"
									/>
								</FormGroup>
								<FormGroup>
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
										<option>csv</option>
										<option>txt</option>
									</CustomInput>
								</FormGroup>
							</ModalBody>
							<ModalFooter>
								<Button
									color="primary"
									onClick={this.handleExport}
								>
									Export
								</Button>
								<Button
									color="flat-danger"
									onClick={this.toggleModal}
								>
									Cancel
								</Button>
							</ModalFooter>
						</Modal>
						{/* Preview Modal */}
						{this.state.previewImage !== undefined && (
							<Modal
								isOpen={this.state.previewModal}
								toggle={this.togglePreviewModal}
								className="modal-dialog-centered modal-lg "
							>
								<ModalHeader toggle={this.togglePreviewModal}>
									Preview for{" "}
									{this.state.previewImage.filename}
								</ModalHeader>
								<ModalBody className="d-flex justify-content-center">
									{this.state.fileExt === "pdf" ? (
										<PdfView
											preview={
												this.state.previewImage.image
											}
										/>
									) : (
										<img
											className="img-fluid" //rounded-circle
											src={this.state.previewImage.image}
											alt={
												this.state.previewImage.filename
											}
										/>
									)}
								</ModalBody>
							</Modal>
						)}

						{/* alerts */}
						<SweetAlert
							title="Are you sure?"
							warning
							show={this.state.defaultAlert}
							showCancel
							reverseButtons
							cancelBtnBsStyle="danger"
							confirmBtnText="Yes, delete it!"
							cancelBtnText="Cancel"
							onConfirm={() => {
								this.handleDelete();
								this.handleAlert("basicAlert", false);
								this.handleAlert("confirmAlert", true);
							}}
							onCancel={() => {
								this.handleAlert("basicAlert", false);
								this.handleAlert("cancelAlert", true);
							}}
						>
							<p
								className="sweet-alert-text"
								style={{ color: "black" }}
							>
								You won't be able to revert this!
							</p>
						</SweetAlert>

						<SweetAlert
							success
							title="Deleted!"
							confirmBtnBsStyle="success"
							show={this.state.confirmAlert}
							onConfirm={() => {
								this.handleAlert("defaultAlert", false);
								this.handleAlert("confirmAlert", false);
							}}
						>
							<p
								className="sweet-alert-text"
								style={{ color: "black" }}
							>
								Your file has been deleted.
							</p>
						</SweetAlert>

						<SweetAlert
							error
							title="Cancelled"
							confirmBtnBsStyle="error"
							show={this.state.cancelAlert}
							onConfirm={() => {
								this.handleAlert("defaultAlert", false);
								this.handleAlert("cancelAlert", false);
							}}
						>
							<p
								className="sweet-alert-text"
								style={{ color: "black" }}
							>
								Your file is safe :)
							</p>
						</SweetAlert>
					</>
				)}
			</React.Fragment>
		);
	}
}

export default connect(null, { resetPageNumber })(MyInvoices);
