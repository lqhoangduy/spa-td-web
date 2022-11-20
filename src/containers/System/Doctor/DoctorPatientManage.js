import {
	Button,
	Card,
	ConfigProvider,
	DatePicker,
	message,
	Popconfirm,
	Table,
	Tag,
	Tooltip,
} from "antd";
import moment from "moment";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import styles from "./DoctorPatientManage.module.scss";
import { languages, LanguageUtils, STATUS } from "../../../utils";
import en_US from "antd/lib/locale/en_US";
import vi_VN from "antd/lib/locale/vi_VN";
import { userService } from "../../../services";
import { useCallback } from "react";
import RemedyModal from "./RemedyModal";
import { useMemo } from "react";
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	SyncOutlined,
} from "@ant-design/icons";
import _ from "lodash";

function MapTagStatus({ status, language }) {
	const statusTag = useMemo(() => {
		const data = {};

		switch (status) {
			case STATUS.NEW:
				data.color = "default";
				data.title = LanguageUtils.getMessageByKey(
					"common.statusNew",
					language
				);
				data.icon = <ClockCircleOutlined spin />;
				break;
			case STATUS.CONFIRMED:
				data.color = "processing";
				data.title = LanguageUtils.getMessageByKey(
					"common.statusConfirmed",
					language
				);
				data.icon = <SyncOutlined spin />;
				break;
			case STATUS.DONE:
				data.color = "success";
				data.title = LanguageUtils.getMessageByKey(
					"common.statusDone",
					language
				);
				data.icon = <CheckCircleOutlined />;
				break;
			case STATUS.CANCEL:
				data.color = "error";
				data.title = LanguageUtils.getMessageByKey(
					"common.statusCancel",
					language
				);
				data.icon = <CloseCircleOutlined />;
				break;
			default:
				break;
		}

		return data;
	}, [status, language]);

	return _.isEmpty(statusTag) ? null : (
		<Tag icon={statusTag.icon} color={statusTag.color}>
			{statusTag.title}
		</Tag>
	);
}

function DoctorPatientManage({ currentUser, language }) {
	const [currentDate, setCurrentDate] = useState(
		moment().startOf("day").toDate()
	);
	const [dataTable, setDataTable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [patientBooking, setPatientBooking] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [currentPatient, setCurrentPatient] = useState(null);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);

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
				key: index,
				id: booking?.patientData?.id,
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
				timeType: booking?.timeType,
				date: booking?.date,
				status: booking?.statusId,
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
			sorter: (a, b) => a.stt - b.stt,
			sortDirections: ["descend"],
		},
		{
			title: <FormattedMessage id='common.name' />,
			key: "name",
			dataIndex: "name",
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ["descend"],
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
			sorter: (a, b) => {
				const timeASplit = a.timeType.split("");
				const timeBSplit = b.timeType.split("");

				return Number(timeASplit[1]) - Number(timeBSplit[1]);
			},
		},
		{
			title: <FormattedMessage id='common.status' />,
			key: "status",
			filters: [
				{
					text: LanguageUtils.getMessageByKey("common.statusNew", language),
					value: STATUS.NEW,
				},
				{
					text: LanguageUtils.getMessageByKey(
						"common.statusConfirmed",
						language
					),
					value: STATUS.CONFIRMED,
				},
				{
					text: LanguageUtils.getMessageByKey("common.statusDone", language),
					value: STATUS.DONE,
				},
				{
					text: LanguageUtils.getMessageByKey("common.statusCancel", language),
					value: STATUS.CANCEL,
				},
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
			render: (_, record) => (
				<MapTagStatus status={record.status} language={language} />
			),
		},
		{
			title: <FormattedMessage id='common.gender' />,
			key: "gender",
			dataIndex: "gender",
			sorter: (a, b) => a.gender.length - b.gender.length,
		},
		{
			title: <FormattedMessage id='common.action' />,
			key: "action",
			fixed: "right",
			width: 240,
			render: (_, record) => {
				if (record.status === STATUS.DONE || record.status === STATUS.CANCEL) {
					return (
						<Tag color='default'>
							<FormattedMessage id='common.done' />
						</Tag>
					);
				}

				return (
					<div>
						{record.status === STATUS.CONFIRMED && (
							<Button
								type='primary'
								className={styles.btnConfirm}
								onClick={() => handleOpenModal(record)}>
								<FormattedMessage id='common.sendResult' />
							</Button>
						)}
						<Popconfirm
							title={
								<FormattedMessage id='system.patient-manage.cancelConfirm' />
							}
							open={openConfirm}
							onConfirm={() => handleCancelBook(record)}
							okText={<FormattedMessage id='common.yes' />}
							cancelText={<FormattedMessage id='common.no' />}
							okButtonProps={{ loading: confirmLoading }}
							onCancel={() => setOpenConfirm(false)}>
							<Tooltip
								placement='bottom'
								title={<FormattedMessage id='common.delete' />}>
								<Button
									danger
									className={styles.btnCancel}
									onClick={() => setOpenConfirm(true)}>
									<FormattedMessage id='common.cancel' />
								</Button>
							</Tooltip>
						</Popconfirm>
					</div>
				);
			},
		},
	];

	const handleCancelModal = () => {
		setOpenModal(false);
		setCurrentPatient(null);
	};

	const handleOpenModal = (record) => {
		setCurrentPatient(record);
		setOpenModal(true);
	};

	const handleCancelBook = async (record) => {
		setConfirmLoading(true);
		const data = {
			doctorId: currentUser?.id,
			patientId: record?.id,
			timeType: record?.timeType,
			date: record?.date,
			status: record?.status,
		};
		const result = await userService.cancelPatientBooking(data);
		setConfirmLoading(false);
		if (result?.errorCode === 0) {
			loadData();
			setOpenConfirm(false);
			message.success(
				LanguageUtils.getMessageByKey(
					"system.patient-manage.cancelSuccess",
					language
				)
			);
		} else {
			message.error(
				LanguageUtils.getMessageByKey(
					"system.patient-manage.cancelFail",
					language
				)
			);
		}
	};

	const handleSubmitModal = async (data) => {
		const body = {
			...data,
			doctorId: currentUser?.id,
			patientId: currentPatient?.id,
			timeType: currentPatient?.timeType,
			date: currentPatient?.date,
			language: language,
			patientName: currentPatient?.name,
			doctorName:
				language === languages.EN
					? `${currentUser?.firstName} ${currentUser?.lastName}`
					: `${currentUser?.lastName} ${currentUser?.firstName}`,
			time: `${currentPatient?.time}, ${moment(
				new Date(currentPatient?.date)
			).format("DD/MM/YYYY")}`,
		};
		const result = await userService.sendRemedy(body);
		if (result.errorCode === 0) {
			loadData();
			message.success(
				LanguageUtils.getMessageByKey(
					"system.patient-manage.sendDone",
					language
				)
			);
			return true;
		} else {
			message.error(
				LanguageUtils.getMessageByKey("common.unknown-error", language)
			);
			return false;
		}
	};

	return (
		<>
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
							<ConfigProvider
								locale={language === languages.EN ? en_US : vi_VN}>
								<DatePicker
									allowClear={false}
									value={moment(currentDate)}
									size='large'
									onChange={onChangeDate}
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
			{openModal && (
				<RemedyModal
					onCancel={handleCancelModal}
					onSubmit={handleSubmitModal}
					email={currentPatient?.email}
				/>
			)}
		</>
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
