import React, { Component } from "react";
import {
	Row,
	Col,
	Input,
	Label,
	FormGroup,
	Button,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	CardBody,
} from "reactstrap";
import classnames from "classnames";
import TableView from "./TableView";
import { Delete, Plus, Download } from "react-feather";
import axiosAPI from "../../../components/axiosApi";
import { toast } from "react-toastify";

toast.configure();

class OcrForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//newly created
			value: "",
			label: "",
			newItems: [],

			//created/edited
			companyNames: [],
			emails: [],
			faxNums: [],
			invoiceNos: [],
			jsonData: [],
			ocrData: "",
			phoneNos: [],

			//deleted
			deletedItem: {
				companyNames: [],
				emails: [],
				faxNums: [],
				invoiceNos: [],
				phoneNos: [],
			},

			//ui related
			activeTab: "1",
			active: "1",
		};
	}

	componentDidMount() {
		const { fileID } = this.props;
		axiosAPI
			.post("/optix/review", { id: fileID })
			.then((response) => {
				this.setState({
					companyNames: response.data.CompanyNames,
					emails: response.data.Emails,
					faxNums: response.data.FaxNums,
					invoiceNos: response.data.InvoiceNos,
					jsonData: response.data.JsonData,
					ocrData: response.data.OcrData,
					phoneNos: response.data.PhoneNos,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	toggleTab = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({ activeTab: tab });
		}
	};

	toggle = (tab) => {
		if (this.state.active !== tab) {
			this.setState({ active: tab });
		}
	};

	updatevalue(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleClick() {
		var newItems = this.state.newItems;

		newItems.push({ label: this.state.label, value: this.state.value });

		this.setState({
			newItems: newItems,
			value: "",
			label: "",
		});
	}

	handleItemChanged(i, event) {
		var newItems = this.state.newItems;
		newItems[i].value = event.target.value;

		this.setState({
			newItems: newItems,
		});
	}

	handleItemDeleted(i) {
		var newItems = this.state.newItems;

		newItems.splice(i, 1);

		this.setState({
			newItems: newItems,
		});
	}

	renderRows() {
		var context = this;

		return this.state.newItems.map(function (o, i) {
			return (
				<div key={"item-" + i}>
					<Label>{o.label}</Label>
					<FormGroup className="has-icon-right position-relative">
						<Input
							type="text"
							value={o.value}
							onChange={context.handleItemChanged.bind(
								context,
								i
							)}
						/>
						<div className="form-control-position delete-icon">
							<Delete
								size={15}
								onClick={context.handleItemDeleted.bind(
									context,
									i
								)}
							/>
						</div>
					</FormGroup>
				</div>
			);
		});
	}

	handleChange = (event, pageNumber, tableNumber, row, column) => {
		let updatedItem = event.target.value;

		let newItems = this.state.jsonData;

		let ultranewItems = newItems[pageNumber][tableNumber][row];
		ultranewItems.splice([column], 1, updatedItem);

		this.setState({
			jsonData: newItems,
		});
	};

	handleFinish = () => {
		const finalSentOff = {
			id: this.props.fileID,
			data: {
				newItems: this.state.newItems,
				editedItems: {
					companyNames: this.state.companyNames,
					emails: this.state.emails,
					faxNums: this.state.faxNums,
					invoiceNos: this.state.invoiceNos,
					jsonData: this.state.jsonData,
					ocrData: this.state.ocrData,
					phoneNos: this.state.phoneNos,
				},
				deletedItem: this.state.deletedItem,
			},
		};

		axiosAPI
			.post("/optix/review/edit", finalSentOff)
			.then(() => {
				toast.success("Successfully Edited", {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
			})
			.catch((error) => {
				console.log(error);
				toast.error("Failed to Submit", {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
			});
	};

	downloadTxtFile = () => {
		const element = document.createElement("a");
		const file = new Blob([document.getElementById("myInput").value], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "ocrData.txt";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	render() {
		let tableprops = {
			handleChange: this.handleChange,
			tableData: this.state.jsonData,
		};

		return (
			<>
				<Card>
					<CardBody>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<Nav tabs className="justify-content-end">
									{this.state.jsonData[0] &&
										this.state.jsonData[0][0] &&
										this.state.jsonData[0][0] !==
											"None" && (
											<>
												<NavItem>
													<NavLink
														className={classnames({
															active:
																this.state
																	.active ===
																"1",
														})}
														onClick={() => {
															this.toggle("1");
														}}
													>
														Form Fields
													</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({
															active:
																this.state
																	.active ===
																"2",
														})}
														onClick={() => {
															this.toggle("2");
														}}
													>
														Table
													</NavLink>
												</NavItem>
											</>
										)}
								</Nav>
								<TabContent
									className="py-50"
									activeTab={this.state.active}
								>
									<TabPane tabId="1">
										<Row>
											{this.state.emails.map(
												(email, key) => {
													return (
														<Col
															lg="4"
															md="6"
															sm="12"
														>
															<Label>
																Email ({key + 1}
																)
															</Label>
															<FormGroup className="has-icon-right position-relative">
																<Input
																	type="email"
																	placeholder="Email"
																	value={
																		email
																	}
																	onChange={(
																		event
																	) => {
																		let a =
																			this.state.emails.slice();
																		a[key] =
																			event.target.value;
																		this.setState(
																			{
																				emails: a,
																			}
																		);
																	}}
																/>
																<div className="form-control-position delete-icon">
																	<Delete
																		size={
																			15
																		}
																		onClick={() => {
																			const a1 =
																				this.state.emails.slice();
																			const b1 =
																				a1.splice(
																					key,
																					1
																				);

																			//moves the deleted item to this.state.deletedItem Object
																			const a2 =
																				JSON.parse(
																					JSON.stringify(
																						this
																							.state
																							.deletedItem
																					)
																				);
																			const b2 =
																				a2.emails.slice();
																			b2.push(
																				b1[0]
																			);

																			// updates the state
																			this.setState(
																				{
																					emails: a1,
																					deletedItem:
																						{
																							...this
																								.state
																								.deletedItem,
																							emails: b2,
																						},
																				}
																			);
																		}}
																	/>
																</div>
															</FormGroup>
														</Col>
													);
												}
											)}
										</Row>
										<Row>
											{this.state.companyNames.map(
												(companyName, key) => {
													return (
														<Col
															lg="4"
															md="6"
															sm="12"
														>
															<Label>
																Company Name (
																{key + 1})
															</Label>
															<FormGroup className="has-icon-right position-relative">
																<Input
																	type="text"
																	placeholder="Company Name"
																	value={
																		companyName
																	}
																	onChange={(
																		event
																	) => {
																		let a =
																			this.state.companyNames.slice();
																		a[key] =
																			event.target.value;
																		this.setState(
																			{
																				companyNames:
																					a,
																			}
																		);
																	}}
																/>
																<div className="form-control-position delete-icon">
																	<Delete
																		size={
																			15
																		}
																		onClick={() => {
																			const a1 =
																				this.state.companyNames.slice();
																			const b1 =
																				a1.splice(
																					key,
																					1
																				);

																			//moves the deleted item to this.state.deletedItem Object
																			const a2 =
																				JSON.parse(
																					JSON.stringify(
																						this
																							.state
																							.deletedItem
																					)
																				);
																			const b2 =
																				a2.companyNames.slice();
																			b2.push(
																				b1[0]
																			);

																			// updates the state
																			this.setState(
																				{
																					companyNames:
																						a1,
																					deletedItem:
																						{
																							...this
																								.state
																								.deletedItem,
																							companyNames:
																								b2,
																						},
																				}
																			);
																		}}
																	/>
																</div>
															</FormGroup>
														</Col>
													);
												}
											)}
										</Row>
										<Row>
											{this.state.faxNums.map(
												(faxNum, key) => {
													return (
														<Col
															lg="4"
															md="6"
															sm="12"
														>
															<Label>
																fax Number (
																{key + 1})
															</Label>
															<FormGroup className="has-icon-right position-relative">
																<Input
																	type="text"
																	placeholder="fax Number"
																	value={
																		faxNum
																	}
																	onChange={(
																		event
																	) => {
																		let a =
																			this.state.faxNums.slice();
																		a[key] =
																			event.target.value;
																		this.setState(
																			{
																				faxNums:
																					a,
																			}
																		);
																	}}
																/>
																<div className="form-control-position delete-icon">
																	<Delete
																		size={
																			15
																		}
																		onClick={() => {
																			const a1 =
																				this.state.faxNums.slice();
																			const b1 =
																				a1.splice(
																					key,
																					1
																				);

																			//moves the deleted item to this.state.deletedItem Object
																			const a2 =
																				JSON.parse(
																					JSON.stringify(
																						this
																							.state
																							.deletedItem
																					)
																				);

																			const b2 =
																				a2.faxNums.slice();
																			b2.push(
																				b1[0]
																			);

																			// updates the state
																			this.setState(
																				{
																					faxNums:
																						a1,
																					deletedItem:
																						{
																							...this
																								.state
																								.deletedItem,
																							faxNums:
																								b2,
																						},
																				}
																			);
																		}}
																	/>
																</div>
															</FormGroup>
														</Col>
													);
												}
											)}
										</Row>
										<Row>
											{this.state.invoiceNos.map(
												(invoiceNo, key) => {
													return (
														<Col
															lg="4"
															md="6"
															sm="12"
														>
															<Label>
																invoice Number (
																{key + 1})
															</Label>
															<FormGroup className="has-icon-right position-relative">
																<Input
																	type="text"
																	placeholder="Invoice Number"
																	value={
																		invoiceNo
																	}
																	onChange={(
																		event
																	) => {
																		let a =
																			this.state.invoiceNos.slice();
																		a[key] =
																			event.target.value;
																		this.setState(
																			{
																				invoiceNos:
																					a,
																			}
																		);
																	}}
																/>
																<div className="form-control-position delete-icon">
																	<Delete
																		size={
																			15
																		}
																		onClick={() => {
																			const a1 =
																				this.state.invoiceNos.slice();
																			const b1 =
																				a1.splice(
																					key,
																					1
																				);

																			//moves the deleted item to this.state.deletedItem Object
																			const a2 =
																				JSON.parse(
																					JSON.stringify(
																						this
																							.state
																							.deletedItem
																					)
																				);

																			const b2 =
																				a2.invoiceNos.slice();
																			b2.push(
																				b1[0]
																			);

																			// updates the state
																			this.setState(
																				{
																					invoiceNos:
																						a1,
																					deletedItem:
																						{
																							...this
																								.state
																								.deletedItem,
																							invoiceNos:
																								b2,
																						},
																				}
																			);
																		}}
																	/>
																</div>
															</FormGroup>
														</Col>
													);
												}
											)}
										</Row>
										<Row>
											{this.state.phoneNos.map(
												(phoneNo, key) => {
													return (
														<Col
															lg="4"
															md="6"
															sm="12"
														>
															<Label>
																phone Number (
																{key + 1})
															</Label>
															<FormGroup className="has-icon-right position-relative">
																<Input
																	type="text"
																	placeholder="Phone Number"
																	value={
																		phoneNo
																	}
																	onChange={(
																		event
																	) => {
																		let a =
																			this.state.phoneNos.slice();
																		a[key] =
																			event.target.value;
																		this.setState(
																			{
																				phoneNos:
																					a,
																			}
																		);
																	}}
																/>
																<div className="form-control-position delete-icon">
																	<Delete
																		size={
																			15
																		}
																		onClick={() => {
																			const a1 =
																				this.state.phoneNos.slice();
																			const b1 =
																				a1.splice(
																					key,
																					1
																				);

																			//moves the deleted item to this.state.deletedItem Object
																			const a2 =
																				JSON.parse(
																					JSON.stringify(
																						this
																							.state
																							.deletedItem
																					)
																				);

																			const b2 =
																				a2.phoneNos.slice();
																			b2.push(
																				b1[0]
																			);

																			// updates the state
																			this.setState(
																				{
																					phoneNos:
																						a1,
																					deletedItem:
																						{
																							...this
																								.state
																								.deletedItem,
																							phoneNos:
																								b2,
																						},
																				}
																			);
																		}}
																	/>
																</div>
															</FormGroup>
														</Col>
													);
												}
											)}
										</Row>

										<div>
											<div>{this.renderRows()}</div>
											<div className="add-attributes">
												<Label className="extra-data-label">
													Add Extra Data
												</Label>
												<Row>
													<Col>
														<FormGroup>
															<Input
																className="extra-data-input"
																type="text"
																name="label"
																placeholder="label"
																value={
																	this.state
																		.label
																}
																onChange={this.updatevalue.bind(
																	this
																)}
															/>
														</FormGroup>
													</Col>
													<span className="colon">
														:
													</span>
													<Col>
														<FormGroup>
															<Input
																className="extra-data-input"
																type="text"
																name="value"
																placeholder="value"
																value={
																	this.state
																		.value
																}
																onChange={this.updatevalue.bind(
																	this
																)}
															/>
														</FormGroup>
													</Col>
													{"  "}
													{this.state.label !==
														"" && (
														<Plus
															size={23}
															color="#7367F0"
															className="success"
															onClick={this.handleClick.bind(
																this
															)}
														/>
													)}
												</Row>
											</div>
										</div>
										{this.state.ocrData && (
											<>
												<div className="form-label-group mt-2 mb-0">
													<Label>OCR Data</Label>
													<Input
														id="myInput"
														type="textarea"
														rows="26"
														placeholder="OCR Data"
														value={
															this.state.ocrData
														}
														onChange={(event) => {
															const ocrData =
																event.target
																	.value;
															this.setState({
																ocrData,
															});
														}}
													/>
												</div>
												<small
													onClick={
														this.downloadTxtFile
													}
													className="counter-value float-right"
												>
													<Download size="13"></Download>
												</small>
											</>
										)}
									</TabPane>
									{this.state.jsonData[0] &&
										this.state.jsonData[0][0] &&
										this.state.jsonData[0][0] !==
											"None" && (
											<TabPane tabId="2">
												{this.state.jsonData.length >=
													0 &&
												this.state.jsonData[0] ===
													undefined ? null : (
													<TableView
														{...tableprops}
													/>
												)}
											</TabPane>
										)}
								</TabContent>
							</TabPane>
						</TabContent>
						<Button
							className="mr-1 mb-1 bg-gradient-primary"
							onClick={this.handleFinish}
						>
							Submit
						</Button>
					</CardBody>
				</Card>
			</>
		);
	}
}

export default OcrForm;
