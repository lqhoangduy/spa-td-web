import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, message, Breadcrumb, Card, Row, Col, Empty } from "antd";
import { BulbOutlined, HomeOutlined } from "@ant-design/icons";
import { userService } from "../../../services";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import { LanguageUtils } from "../../../utils";

import styles from "./DetailClinic.module.scss";
import { FormattedMessage } from "react-intl";
import NotFound from "../../../components/NotFound/NotFound";
import ScheduleDoctor from "../Doctor/ScheduleDoctor";
import ExtraDoctorInfo from "../Doctor/ExtraDoctorInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import * as actions from "../../../store/actions";

function DetailClinic({ language }) {
	const { id } = useParams();
	const [clinic, setClinic] = useState(null);
	const [loading, setLoading] = useState(false);
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		if (window) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, []);
	useEffect(() => {
		loadClinic();
	}, [id]);

	useEffect(() => {
		loadDoctors();
	}, [id]);

	const loadClinic = async () => {
		if (id) {
			setLoading(true);
			const result = await userService.getClinic(id);

			if (result?.errorCode === 0) {
				setClinic(result.data);
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
			const result = await userService.getDoctorClinic(id);

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

	if (!clinic && !loading) {
		return <NotFound />;
	}

	return (
		<Spin spinning={loading}>
			<section className={styles.detailClinic}>
				<Header />
				<div className='container'>
					<div className={styles.clinicWrap}>
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
									<FormattedMessage id='clinic.title' />
								</span>
							</Breadcrumb.Item>
						</Breadcrumb>
						<div className='mb-4'>
							<Card className={styles.infoClinic}>
								<div
									className={styles.infoClinicBackground}
									style={{
										backgroundImage: `url(${clinic?.image?.url})`,
									}}
								/>
								<h1>{clinic?.name}</h1>
								<div
									dangerouslySetInnerHTML={{
										__html: clinic?.descriptionHTML ?? "",
									}}
								/>
							</Card>
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
								description={<FormattedMessage id='clinic.empty-doctor' />}
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
