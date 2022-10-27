import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, message, Breadcrumb, Card, Row, Col, Empty, Select } from "antd";
import { BulbOutlined, HomeOutlined } from "@ant-design/icons";
import { userService } from "../../../services";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import { languages, LanguageUtils } from "../../../utils";

import styles from "./DetailSpecialty.module.scss";
import { FormattedMessage } from "react-intl";
import NotFound from "../../../components/NotFound/NotFound";
import ScheduleDoctor from "../Doctor/ScheduleDoctor";
import ExtraDoctorInfo from "../Doctor/ExtraDoctorInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import * as actions from "../../../store/actions";

const { Option } = Select;

function DetailSpecialty({
	language,
	provinces,
	isLoadingProvince,
	getProvinceStart,
}) {
	const { id } = useParams();
	const [specialty, setSpecialty] = useState(null);
	const [loading, setLoading] = useState(false);
	const [doctors, setDoctors] = useState([]);
	const [currentProvince, setCurrentProvince] = useState("ALL");

	useEffect(() => {
		getProvinceStart();
		if (window) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, []);
	useEffect(() => {
		loadSpecialty();
	}, [id]);

	useEffect(() => {
		loadDoctors();
	}, [currentProvince, id]);

	const loadSpecialty = async () => {
		if (id) {
			setLoading(true);
			const result = await userService.getSpecialty(id);

			if (result?.errorCode === 0) {
				setSpecialty(result.data);
			} else {
				message.error(
					LanguageUtils.getMessageByKey("common.error-get-info-fail", language)
				);
			}
			setLoading(false);
		}
	};

	const loadDoctors = async () => {
		if (id) {
			setLoading(true);
			const result = await userService.getDoctorSpecialty(id, currentProvince);

			if (result?.errorCode === 0) {
				setDoctors(result.data);
			} else {
				message.error(
					LanguageUtils.getMessageByKey("common.error-get-info-fail", language)
				);
			}
			setLoading(false);
		}
	};

	if (!specialty && !loading) {
		return <NotFound />;
	}

	console.log("specialty", specialty);

	return (
		<Spin spinning={loading}>
			<section className={styles.detailSpecialty}>
				<Header />
				<div className='container'>
					<div className={styles.specialtyWrap}>
						<Breadcrumb>
							<Breadcrumb.Item href='/home'>
								<HomeOutlined />
								<span>
									<FormattedMessage id='common.home' />
								</span>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								<BulbOutlined />
								<span>
									<FormattedMessage id='specialty.title' />
								</span>
							</Breadcrumb.Item>
						</Breadcrumb>
						<div className='mb-4'>
							<Card
								className={{}}
								style={{
									background: `linear-gradient(to bottom, rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.4) 100%), url(${specialty?.image?.url}) no-repeat 0 0`,
									backgroundSize: "cover",
								}}>
								<h1>{specialty?.name}</h1>
								<div
									dangerouslySetInnerHTML={{
										__html: specialty?.descriptionHTML ?? "",
									}}
								/>
							</Card>
						</div>
						<div className='my-2'>
							<Select
								loading={isLoadingProvince}
								defaultValue='ALL'
								value={currentProvince}
								onChange={setCurrentProvince}
								style={{ width: 140 }}>
								<Option value='ALL' key='all'>
									<FormattedMessage id='common.all' />
								</Option>
								{provinces?.length &&
									provinces.map((province) => (
										<Option value={province.keyMap} key={province.keyMap}>
											{language === languages.VI
												? province.valueVi
												: province.valueEn}
										</Option>
									))}
							</Select>
						</div>
						{doctors?.length !== 0 ? (
							doctors.map((doctor) => (
								<Card key={doctor} className='my-4'>
									<Row gutter={[16, 16]}>
										<Col xs={24}>
											<Link to={`/doctor/${doctor.id}`} className={styles.link}>
												<ProfileDoctor doctor={doctor} isSecondStyle={true} />
											</Link>
										</Col>
										<Col xs={24} md={12}>
											<ScheduleDoctor doctor={doctor} />
										</Col>
										<Col xs={24} md={12}>
											<ExtraDoctorInfo id={doctor.id} />
										</Col>
									</Row>
								</Card>
							))
						) : (
							<Empty
								description={<FormattedMessage id='specialty.empty-doctor' />}
								image={Empty.PRESENTED_IMAGE_SIMPLE}
								className='my-6'
							/>
						)}
					</div>
				</div>
				<Footer />
			</section>
		</Spin>
	);
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		provinces: state.admin.provinces,
		isLoadingProvince: state.admin.isLoadingProvince,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
