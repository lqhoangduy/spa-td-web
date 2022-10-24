import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, message, Breadcrumb, Card, Row, Col, Empty } from "antd";
import { BulbOutlined, HomeOutlined } from "@ant-design/icons";
import { userService } from "../../../services";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import { LanguageUtils } from "../../../utils";

import styles from "./DetailSpecialty.module.scss";
import { FormattedMessage } from "react-intl";
import NotFound from "../../../components/NotFound/NotFound";
import ScheduleDoctor from "../Doctor/ScheduleDoctor";
import ExtraDoctorInfo from "../Doctor/ExtraDoctorInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";

function DetailSpecialty({ language }) {
	const { id } = useParams();
	const [specialty, setSpecialty] = useState(null);
	const [loading, setLoading] = useState(false);
	const [doctorIds, setDoctorIds] = useState([13, 14]);
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		if (window) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, []);
	useEffect(() => {
		loadSpecialty();
	}, [id]);

	useEffect(() => {
		loadDoctors();
	}, [doctorIds]);

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
		if (doctorIds?.length) {
			setLoading(true);
			const result = await userService.getDoctorByIds(doctorIds);

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

	return (
		<Spin spinning={loading}>
			<section className={styles.detailSpecialty}>
				<Header />
				<div className='container'>
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
						<h1>{specialty?.name}</h1>
						<img src={specialty?.image?.url} alt='' />
						<div
							dangerouslySetInnerHTML={{
								__html: specialty?.descriptionHTML ?? "",
							}}
						/>
					</div>
					{doctors ? (
						doctors.map((doctor) => (
							<Card key={doctor} className='my-4'>
								<Row gutter={[16, 16]}>
									<Col xs={24}>
										<ProfileDoctor doctor={doctor} isSecondStyle={true} />
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
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
