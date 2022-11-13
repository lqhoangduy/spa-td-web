import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../../HomePage/Header/Header";
import * as actions from "../../../store/actions";

import styles from "./ListDoctor.module.scss";
import { Breadcrumb, Card, Col, Empty, message, Row, Select, Spin } from "antd";
import { CustomerServiceOutlined, HomeOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { languages, LanguageUtils } from "../../../utils";
import { Link } from "react-router-dom";
import ProfileDoctor from "./ProfileDoctor";
import ScheduleDoctor from "./ScheduleDoctor";
import ExtraDoctorInfo from "./ExtraDoctorInfo";
import { userService } from "../../../services";

const { Option } = Select;

function ListDoctor({
	language,
	provinces,
	isLoadingProvince,
	getProvinceStart,
}) {
	const [loading, setLoading] = useState(false);
	const [doctors, setDoctors] = useState([]);
	const [currentProvince, setCurrentProvince] = useState("ALL");

	useEffect(() => {
		getProvinceStart();
		loadDoctors();
	}, [currentProvince]);

	const loadDoctors = async () => {
		setLoading(true);
		const result = await userService.getListDoctor(currentProvince);

		if (result?.errorCode === 0) {
			setDoctors(result.data);
		} else {
			message.error(
				LanguageUtils.getMessageByKey("common.error-get-info-fail", language)
			);
		}
		setLoading(false);
	};

	return (
		<section className={styles.listDoctor}>
			<Header />
			<div className='container'>
				<div className={styles.listDoctorWrap}>
					<Breadcrumb>
						<Breadcrumb.Item href='/home'>
							<HomeOutlined />
							<span>
								<FormattedMessage id='common.home' />
							</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<CustomerServiceOutlined />
							<span>
								<FormattedMessage id='doctor.list' />
							</span>
						</Breadcrumb.Item>
					</Breadcrumb>
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
								provinces.map((province, index) => (
									<Option value={province.keyMap} key={index}>
										{language === languages.VI
											? province.valueVi
											: province.valueEn}
									</Option>
								))}
						</Select>
					</div>
					<Spin spinning={loading}>
						{doctors?.length !== 0 ? (
							doctors.map((doctor, index) => (
								<Card key={index} className='my-4'>
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
								image={Empty.PRESENTED_IMAGE_SIMPLE}
								description={<FormattedMessage id='specialty.empty-doctor' />}
								className='my-6'
							/>
						)}
					</Spin>
				</div>
			</div>
		</section>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctor);
