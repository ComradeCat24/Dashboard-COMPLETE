import React from "react";
import { Heart } from "react-feather";

const Footer = () => {
	return (
		<footer className="footer footer-light footer-static">
			<p className="mb-0 clearfix">
				<span className="float-md-left d-block d-md-inline-block mt-25">
					COPYRIGHT © {new Date().getFullYear()}
					<a
						href="https://www.bitfringe.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						BitFringe
					</a>
					, All rights reserved
				</span>
				<span className="float-md-right d-none d-md-block">
					<span className="align-middle">Made with</span>{" "}
					<Heart className="text-danger" size={15} />
				</span>
			</p>
		</footer>
	);
};

export default Footer;
