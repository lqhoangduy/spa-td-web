import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./OurPartner.module.scss";
import Slider from "react-slick";
import { Row, Col } from "antd";

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

const offers = [
	{
		key: 1,
		image: "/images/image-1.jpeg",
	},
	{
		key: 2,
		image: "/images/image-2.jpeg",
	},
	{
		key: 3,
		image: "/images/image-3.jpeg",
	},
];

const offersBottom = [
	{
		key: 1,
		title: <FormattedMessage id='homepage.offer-1' />,
		des: <FormattedMessage id='homepage.offer-1-description' />,
	},
	{
		key: 2,
		title: <FormattedMessage id='homepage.offer-2' />,
		des: <FormattedMessage id='homepage.offer-2-description' />,
	},
	{
		key: 3,
		title: <FormattedMessage id='homepage.offer-3' />,
		des: <FormattedMessage id='homepage.offer-3-description' />,
	},
	{
		key: 4,
		title: <FormattedMessage id='homepage.offer-4' />,
		des: <FormattedMessage id='homepage.offer-4-description' />,
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

	const settingsSlider = {
		dots: false,
		infinite: true,
		arrows: true,
		autoplay: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<>
			<section
				style={{ backgroundImage: `url('/images/bg-our-partner.jpeg')` }}>
				<div className={`${styles.ourPartnerWrap} container`}>
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
			</section>
			<section
				className={styles.offerTop}
				style={{ backgroundImage: `url('/images/bg-2.png')` }}>
				<div className='container'>
					<Row
						gutter={[
							{ xs: 8, sm: 16, md: 24 },
							{ xs: 8, sm: 16, md: 24 },
						]}>
						<Col xs={24} lg={12}>
							<div className={styles.offerSlider}>
								<Slider {...settingsSlider}>
									{offers.map((offer) => (
										<div key={offer.key} className={styles.ourPartnerItem}>
											<img src={offer.image} alt='offer' />
										</div>
									))}
								</Slider>
							</div>
						</Col>
						<Col xs={24} lg={12}>
							<div className={styles.offerContent}>
								<h4 className={styles.offerTitle}>
									<FormattedMessage id='homepage.offer-title' />
								</h4>
								<p>
									<FormattedMessage id='homepage.offer-description' />
								</p>
							</div>
						</Col>
					</Row>
				</div>
			</section>
			<section className={styles.offerBottom}>
				<div className='container'>
					<Row gutter={[24, 24]}>
						{offersBottom.map((item) => {
							return (
								<Col key={item.key} xs={24} sm={12} lg={6}>
									<div className={styles.offerBottomContent}>
										<h4 className={styles.offerTitle}>{item.title}</h4>
										<p>{item.des}</p>
									</div>
								</Col>
							);
						})}
					</Row>
				</div>
			</section>
			<section className={styles.gallery}>
				<div className='container'>
					<Row gutter={[24, 24]} className={styles.galleryRow}>
						<Col xs={24} sm={12} md={6}>
							<div className={styles.galleryImage}>
								<img src='/images/gallery-1.jpeg' alt='gallery' />
							</div>
						</Col>
						<Col xs={24} sm={12} md={6}>
							<div className={styles.galleryImage}>
								<img src='/images/gallery-2.jpeg' alt='gallery' />
							</div>
						</Col>
						<Col xs={24} md={12}>
							<div className={styles.galleryImage}>
								<img src='/images/gallery-3.jpeg' alt='gallery' />
							</div>
						</Col>
					</Row>
					<Row gutter={[24, 24]}>
						<Col xs={24} md={12}>
							<div className={styles.galleryImage}>
								<img src='/images/gallery-4.jpeg' alt='gallery' />
							</div>
						</Col>
						<Col xs={24} sm={12} md={6}>
							<div className={styles.galleryImage}>
								<img src='/images/gallery-5.jpeg' alt='gallery' />
							</div>
						</Col>
						<Col xs={24} sm={12} md={6}>
							<div className={styles.galleryImage}>
								<img src='/images/gallery-6.jpeg' alt='gallery' />
							</div>
						</Col>
					</Row>
				</div>
			</section>
			<section className={styles.appointment}>
				<div
					className='container'
					style={{ backgroundImage: `url('/images/bg-3.png')` }}>
					<div className={styles.appointmentContent}>
						<h4 className={styles.appointmentTitle}>
							<FormattedMessage id='homepage.appointment-title' />
						</h4>
						<span className={styles.appointmentDescription}>
							<FormattedMessage id='homepage.appointment-description' />
						</span>
						<span className={styles.appointmentDivider}></span>
					</div>
				</div>
			</section>
		</>
	);
}

export default OurPartner;
