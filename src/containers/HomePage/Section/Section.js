import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import styles from "./Section.module.scss";

const specialties = [
	{
		key: 1,
		url: "/images/banner-slider-1.jpeg",
		title: "Reflexology",
	},
	{
		key: 2,
		url: "/images/banner-slider-2.jpeg",
		title: "RejuvenateSpa",
	},
	{
		key: 3,
		url: "/images/banner-slider-3.jpeg",
		title: "SaunaRoom",
	},
	{
		key: 4,
		url: "/images/banner-slider-4.jpeg",
		title: "HydroTherapy",
	},
];

const Section = () => {
	const setting1 = {
		dots: false,
		infinite: true,
		autoplay: true,
		arrows: false,
		variableWidth: true,
		centerMode: true,
		speed: 500,
		slidesToScroll: 1,
	};

	const setting2 = {
		...setting1,
		rtl: true,
	};
	return (
		<section className='container'>
			<div className={styles.sectionWrap}>
				<h3 className={styles.sectionTitle}>
					<FormattedMessage id='section.specialist' />
				</h3>
				<Slider {...setting1}>
					{specialties.map((specialty) => (
						<div key={specialty.key} className={styles.sectionItem}>
							<img src={specialty.url} alt='partner' />
							<span>{specialty.title}</span>
						</div>
					))}
				</Slider>
			</div>
			<div className={styles.sectionWrap}>
				<h3 className={styles.sectionTitle}>
					<FormattedMessage id='section.branches' />
				</h3>
				<Slider {...setting2}>
					{specialties.map((specialty) => (
						<div key={specialty.key} className={styles.sectionItem}>
							<img src={specialty.url} alt='partner' />
							<span>{specialty.title}</span>
						</div>
					))}
				</Slider>
			</div>
			<div className={styles.sectionWrap}>
				<h3 className={styles.sectionTitle}>
					<FormattedMessage id='section.doctors' />
				</h3>
				<Slider {...setting1}>
					{specialties.map((specialty) => (
						<div key={specialty.key} className={styles.sectionItem}>
							<img src={specialty.url} alt='partner' />
							<span>{specialty.title}</span>
						</div>
					))}
				</Slider>
			</div>
			<div className={styles.sectionWrap}>
				<h3 className={styles.sectionTitle}>
					<FormattedMessage id='section.handbooks' />
				</h3>
				<Slider {...setting2}>
					{specialties.map((specialty) => (
						<div key={specialty.key} className={styles.sectionItem}>
							<img src={specialty.url} alt='partner' />
							<span>{specialty.title}</span>
						</div>
					))}
				</Slider>
			</div>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
