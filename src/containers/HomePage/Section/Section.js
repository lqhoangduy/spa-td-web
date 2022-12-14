import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { userService } from "../../../services";
import styles from "./Section.module.scss";

const specialtiesMock = [
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

const Section = ({ language }) => {
	const history = useHistory();
	const [topDoctors, setTopDoctors] = useState(null);
	const [specialties, setSpecialties] = useState(null);
	const [clinics, setClinics] = useState(null);
	const [handbooks, setHandbooks] = useState(null);

	const setting1 = {
		dots: false,
		infinite: true,
		autoplay: false,
		arrows: false,
		variableWidth: true,
		centerMode: true,
		speed: 500,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
					centerMode: true,
				},
			},
		],
	};

	const setting2 = {
		...setting1,
		rtl: true,
	};

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const resultDoctor = await userService.getTopDoctorHome(10);
		if (resultDoctor.errorCode === 0) {
			setTopDoctors(resultDoctor.data);
		}

		const resultSpecialty = await userService.getSpecialties();
		if (resultSpecialty.errorCode === 0) {
			setSpecialties(resultSpecialty.data);
		}

		const resultClinic = await userService.getClinics();
		if (resultClinic.errorCode === 0) {
			setClinics(resultClinic.data);
		}

		const resultHandbook = await userService.getHandbooks();
		if (resultHandbook.errorCode === 0) {
			setHandbooks(resultHandbook.data);
		}
	};

	const handleDetailDoctor = (id) => {
		history.push(`/doctor/${id}`);
	};

	const handleDetailSpecialty = (id) => {
		history.push(`/specialty/${id}`);
	};

	const handleDetailClinic = (id) => {
		history.push(`/clinic/${id}`);
	};

	const handleDetailHandbook = (id) => {
		history.push(`/handbook/${id}`);
	};

	return (
		<section className='container'>
			{!!specialties?.length && (
				<div className={styles.sectionWrap}>
					<h3 className={styles.sectionTitle}>
						<FormattedMessage id='section.specialist' />
					</h3>
					<Slider {...setting1}>
						{specialties.map((specialty, index) => (
							<div
								key={index}
								className={styles.sectionItem}
								onClick={() => handleDetailSpecialty(specialty.id)}>
								<img src={specialty.image?.url} alt='doctor' />
								<span>{specialty.name}</span>
							</div>
						))}
					</Slider>
				</div>
			)}
			{!!clinics?.length && (
				<div className={styles.sectionWrap}>
					<h3 className={styles.sectionTitle}>
						<FormattedMessage id='section.branches' />
					</h3>
					<Slider {...setting1}>
						{clinics.map((clinic, index) => (
							<div
								key={index}
								className={styles.sectionItem}
								onClick={() => handleDetailClinic(clinic.id)}>
								<img src={clinic.image?.url} alt='doctor' />
								<span>{clinic.name}</span>
							</div>
						))}
					</Slider>
				</div>
			)}
			{!!topDoctors?.length && (
				<div className={styles.sectionWrap}>
					<h3 className={styles.sectionTitle}>
						<FormattedMessage id='section.doctors' />
					</h3>
					<Slider {...setting1}>
						{topDoctors.map((doctor, index) => (
							<div
								key={index}
								className={styles.sectionItem}
								onClick={() => handleDetailDoctor(doctor.id)}>
								<img src={doctor.image?.url} alt='doctor' />
								<span>
									{language === "vi"
										? doctor.positionData?.valueVi
										: doctor.positionData?.valueEn}
									. {doctor.firstName} {doctor.lastName}
								</span>
							</div>
						))}
					</Slider>
				</div>
			)}
			{!!handbooks?.length && (
				<div className={styles.sectionWrap}>
					<h3 className={styles.sectionTitle}>
						<FormattedMessage id='section.handbooks' />
					</h3>
					<Slider {...setting2}>
						{/* {specialtiesMock.map((specialty) => (
							<div key={specialty.key} className={styles.sectionItem}>
								<img src={specialty.url} alt='partner' />
								<span>{specialty.title}</span>
							</div>
						))} */}
						{handbooks.map((handbook, index) => (
							<div
								key={index}
								className={styles.sectionItem}
								onClick={() => handleDetailHandbook(handbook.id)}>
								<img src={handbook.image?.url} alt='handbook' />
								<span>{handbook.title}</span>
							</div>
						))}
					</Slider>
				</div>
			)}
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
