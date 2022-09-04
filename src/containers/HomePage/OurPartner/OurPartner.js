import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./OurPartner.module.scss";
import Slider from "react-slick";

const partners = [
	{
		key: 1,
		image: "/images/partner-1.png",
	},
	{
		key: 2,
		image: "/images/partner-2.png",
	},
	{
		key: 3,
		image: "/images/partner-3.png",
	},
	{
		key: 4,
		image: "/images/partner-4.png",
	},
	{
		key: 5,
		image: "/images/partner-2.png",
	},
];

function OurPartner() {
	const settings = {
		dots: false,
		infinite: true,
		autoplay: true,
		arrows: false,
		variableWidth: true,
		speed: 500,
		slidesToScroll: 1,
	};

	return (
		<section style={{ backgroundImage: `url('/images/bg-our-partner.jpeg')` }}>
			<div className={`${styles.ourPartnerWrap} container`}>
				<div>
					<div className={styles.ourPartner}>
						<Slider {...settings}>
							{partners.map((partner) => (
								<div key={partner.key} className={styles.ourPartnerItem}>
									<img src={partner.image} alt='partner' />
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OurPartner;
