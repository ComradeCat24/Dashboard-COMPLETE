import React, { useState, useEffect } from "react";
import OcrForm from "../pdf/OcrForm";
import { Card, CardBody, Row, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swiper from "react-id-swiper";

import "swiper/css/swiper.css";
import "../../../assets/scss/plugins/extensions/swiper.scss";

const Gallery = (props) => {
	const [gallerySwiper, getGallerySwiper] = useState(null);
	const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

	const thumbnailSwiperParams = {
		getSwiper: getThumbnailSwiper,
		spaceBetween: 15,
		centeredSlides: true,
		slidesPerView: "auto",
		touchRatio: 0.1,
		slideToClickedSlide: true,

		observer: true,
		observeParents: true,
		// coverflowEffect
		effect: "coverflow",
		allowTouchMove: false,
		coverflowEffect: {
			rotate: 40,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},

		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			dynamicBullets: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
			slideToClickedSlide: true,
		},
	};

	const gallerySwiperParams = {
		getSwiper: getGallerySwiper,
		spaceBetween: 10,
		observer: true,
		observeParents: true,
		allowTouchMove: false,
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },
	};

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		props.data.forEach((item) => URL.revokeObjectURL(item.preview));

		if (
			gallerySwiper !== null &&
			gallerySwiper.controller &&
			thumbnailSwiper !== null &&
			thumbnailSwiper.controller
		) {
			gallerySwiper.controller.control = thumbnailSwiper;
			thumbnailSwiper.controller.control = gallerySwiper;
		}
	}, [gallerySwiper, thumbnailSwiper, props.data]);

	return (
		<Card>
			<CardBody className="pb-0">
				<div className="swiper-gallery">
					<Swiper {...thumbnailSwiperParams}>
						{props.data.map((item) => (
							<div key={item.name}>
								<img
									src={item.preview}
									alt={`swiper ${item.name}`}
									className="img-fluid img-fluid2"
								/>
							</div>
						))}
					</Swiper>
					<br />
					<Swiper {...gallerySwiperParams}>
						{props.data.map((item) => (
							<div key={item.name}>
								<Row>
									<Col sm="6" md="7">
										<PerfectScrollbar
											className="scroll-area-2"
											options={{
												wheelPropagation: false,
											}}
										>
											<img
												src={item.preview}
												alt={`swiper ${item.name}`}
												className="img-fluid img-fluid2"
											/>
										</PerfectScrollbar>
									</Col>
									<Col>
										<OcrForm fileID={item.fileID} />
									</Col>
								</Row>
							</div>
						))}
					</Swiper>
				</div>
			</CardBody>
		</Card>
	);
};

// const mapStateToProps = (state) => {
// 	return { imgdata: state.imgReducer };
// };

export default Gallery;
