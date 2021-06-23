import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import TableSelection from "./TableSelection";
import Swiper from "react-id-swiper";

import "swiper/css/swiper.css";
import "../../../../assets/scss/plugins/extensions/swiper.scss";

const CropPage = (props) => {
	const [gallerySwiper, getGallerySwiper] = useState(null);
	const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

	const thumbnailSwiperParams = {
		getSwiper: getThumbnailSwiper,
		spaceBetween: 10,
		centeredSlides: true,
		slidesPerView: "auto",
		touchRatio: 0.2,
		slideToClickedSlide: true,
		observer: true,
		observeParents: true,
		// coverflowEffect
		effect: "coverflow",
		grabCursor: true,
		allowTouchMove: false,
		coverflowEffect: {
			rotate: 50,
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
	};

	useEffect(() => {
		if (
			gallerySwiper !== null &&
			gallerySwiper.controller &&
			thumbnailSwiper !== null &&
			thumbnailSwiper.controller
		) {
			gallerySwiper.controller.control = thumbnailSwiper;
			thumbnailSwiper.controller.control = gallerySwiper;
		}
	}, [gallerySwiper, thumbnailSwiper]);

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
								<TableSelection img={item.preview} />
							</div>
						))}
					</Swiper>
				</div>
			</CardBody>
		</Card>
	);
};

export default CropPage;
