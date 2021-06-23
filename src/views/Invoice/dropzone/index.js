import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "react-feather";
import { toast } from "react-toastify";
import axiosAPI from "../../../components/axiosApi";
import FormData from "form-data";
import { history } from "../../../history";
import Spinner from "../../../components/spinner/Loading-spinner";
import "../../../assets/scss/plugins/extensions/invoicedropzone.scss";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

function InvoiceDropzone(props) {
	const [loading, setLoading] = useState(false);

	const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
		useDropzone({
			accept: "image/jpeg, image/png, application/pdf",
			maxFiles: 10,
			// maxSize: 100000, // 1 mb
			noClick: false,
			noKeyboard: true,
			onDropAccepted(files) {
				setLoading(true);

				let formData = new FormData();
				for (const file of files) {
					formData.append("type", 1);
					formData.append("fileUploaded", file);
				}

				axiosAPI
					.post("/optix/upload/", formData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
						},
					})
					.then(() => {
						toast.success("Upload successful", {
							position: toast.POSITION.BOTTOM_RIGHT,
						});
						history.push("/my-docs");
					})
					.catch(() => {
						toast.error("Uploads failed", {
							position: toast.POSITION.BOTTOM_RIGHT,
						});
					})
					.finally(() => {
						setLoading(false);
					});
			},
			onDropRejected(files) {
				toast.error(files[0].errors[0].message, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
			},
		});

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Dropzone</CardTitle>
				</CardHeader>
				<CardBody>
					{loading ? (
						<div className="dropzone py-3 flex-column">
							<Spinner />
						</div>
					) : (
						<div
							{...getRootProps({
								className: "dropzone py-3 flex-column",
							})}
						>
							<input {...getInputProps()} />
							<UploadCloud className="upload-icon" size={100} />
							{isDragActive ? (
								!isDragReject ? (
									<h4 className="mt-2">
										Drop it like it's hot!
									</h4>
								) : (
									<h4 className="mt-2">
										File type not accepted, sorry!
									</h4>
								)
							) : (
								<h4 className="mt-2">
									Drop Your Image / PDF File
								</h4>
							)}
							<div className="divider divider-dashed">
								<div className="divider-text">OR</div>
							</div>
							<Button.Ripple
								color="primary"
								outline
								onClick={open}
							>
								Browse Files
							</Button.Ripple>
						</div>
					)}
				</CardBody>
			</Card>
		</>
	);
}

export default InvoiceDropzone;
