import {
	Button,
	Card,
	Col,
	ConfigProvider,
	DatePicker,
	message,
	Row,
	Table,
} from "antd";
import moment from "moment";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import styles from "./DoctorPatientManage.module.scss";
import { languages, LanguageUtils } from "../../../utils";
import en_US from "antd/lib/locale/en_US";
import vi_VN from "antd/lib/locale/vi_VN";
import { userService } from "../../../services";
import { useCallback } from "react";

function DoctorPatientManage({ currentUser, language }) {
	const [currentDate, setCurrentDate] = useState(
		moment().startOf("day").toDate()
	);
	const [dataTable, setDataTable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [patientBooking, setPatientBooking] = useState(null);

	useEffect(() => {
		loadData();
	}, [currentDate, currentUser?.id]);

	useEffect(() => {
		buildDataTable();
	}, [patientBooking, language, currentDate]);

	const loadData = async () => {
		if (currentDate && currentUser?.id) {
			setLoading(true);
			const result = await userService.getPatientBooking(
				currentUser?.id,
				currentDate
			);
			setLoading(false);

			if (result.errorCode === 0) {
				setPatientBooking(result.data);
			} else {
				message.error(
					LanguageUtils.getMessageByKey("common.error-get-info-fail", language)
				);
			}
		}
	};

	const buildDataTable = useCallback(() => {
		const data = (patientBooking || []).map((booking, index) => {
			return {
				key: booking.id,
				stt: index + 1,
				name: booking?.patientData?.firstName,
				email: booking?.patientData?.email,
				phone: booking?.patientData?.phoneNumber,
				time:
					language === languages.EN
						? booking?.timeBookingData?.valueEn
						: booking?.timeBookingData?.valueVi,
				address: booking?.patientData?.address,
				gender:
					language === languages.EN
						? booking?.patientData?.genderData?.valueEn
						: booking?.patientData?.genderData?.valueVi,
			};
		});
		setDataTable(data);
	}, [patientBooking, language]);

	const onChangeDate = (date, dateString) => {
		const formatDate = moment(date).startOf("day").toDate();
		setCurrentDate(formatDate);
	};

	const columns = [
		{
			title: <FormattedMessage id='common.stt' />,
			key: "stt",
			dataIndex: "stt",
			fixed: "left",
			width: 60,
		},
		{
			title: <FormattedMessage id='common.name' />,
			key: "name",
			dataIndex: "name",
		},
		{
			title: <FormattedMessage id='common.email' />,
			key: "email",
			dataIndex: "email",
		},
		{
			title: <FormattedMessage id='common.phone' />,
			key: "phone",
			dataIndex: "phone",
		},
		{
			title: <FormattedMessage id='common.time' />,
			key: "time",
			dataIndex: "time",
		},
		{
			title: <FormattedMessage id='common.address' />,
			key: "address",
			dataIndex: "address",
		},
		{
			title: <FormattedMessage id='common.gender' />,
			key: "gender",
			dataIndex: "gender",
		},
		{
			title: <FormattedMessage id='common.action' />,
			key: "action",
			fixed: "right",
			width: 120,
			render: (_, record) => (
				<Button className={styles.btnConfirm}>
					<FormattedMessage id='common.confirm' />
				</Button>
			),
		},
	];

	return (
		<div className='container'>
			<section className={styles.patientManage}>
				<h1 className={clsx("text-center", styles.manageTitle)}>
					<FormattedMessage id='system.patient-manage.title' />
				</h1>
				<div className='my-4'>
					<div className={styles.dateInfo}>
						<label>
							<FormattedMessage id='system.schedule-manage.choose-date' />
						</label>
						<ConfigProvider locale={language === languages.EN ? en_US : vi_VN}>
							<DatePicker
								value={moment(currentDate)}
								size='large'
								onChange={onChangeDate}
								disabledDate={(current) =>
									current &&
									current < moment(new Date()).subtract(1, "days").endOf("day")
								}
								format='DD/MM/YYYY'
							/>
						</ConfigProvider>
					</div>
				</div>
				<div className={styles.tableData}>
					<Card>
						<Table
							loading={loading}
							columns={columns}
							dataSource={dataTable}
							scroll={{ x: 960, y: 300 }}
						/>
					</Card>
				</div>
			</section>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.userInfo,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DoctorPatientManage);
