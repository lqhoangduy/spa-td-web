import clsx from "clsx";
import moment from "moment";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import {
	Spin,
	Row,
	Col,
	Select,
	Button,
	DatePicker,
	ConfigProvider,
	Card,
	Table,
	message,
	Modal,
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../store/actions";
import { userService } from "../../../services";
import styles from "./ScheduleManage.module.scss";
import en_US from "antd/lib/locale/en_US";
import vi_VN from "antd/lib/locale/vi_VN";

const { Option } = Select;
const { confirm } = Modal;

function ScheduleManage({ language, isLoadingTime, times, getTimeStart }) {
	const [loading, setLoading] = useState(false);
	const [currentDoctorId, setCurrentDoctorId] = useState(null);
	const [doctors, setDoctors] = useState(null);
	const [listCurrentTime, setListCurrentTime] = useState([]);
	const [currentDate, setCurrentDate] = useState(null);

	useEffect(() => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		loadSchedules();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentDoctorId]);

	const loadSchedules = async () => {
		if (!currentDoctorId) return;
		setLoading(true);

		const result = await userService.getDoctorSchedules(currentDoctorId);

		if (result.errorCode === 0) {
			if (result.data?.length) {
				const listTime = result.data.map((item) => {
					return {
						time: item.timeType,
						date: moment(item.date).toDate(),
					};
				});

				setListCurrentTime(listTime);
			}
		} else {
			message.error("Get schedules fail!!!");
		}
		setLoading(false);
	};

	const loadData = async () => {
		setLoading(true);
		getTimeStart();
		const resultDoctor = await userService.getAllDoctors();
		if (resultDoctor.errorCode === 0) {
			setDoctors(resultDoctor.data);
		}
		setLoading(false);
	};

	const handleChangeDoctor = (id) => {
		setCurrentDoctorId(id);
		setListCurrentTime([]);
	};

	const onChangeDate = (date, dateString) => {
		const formatDate = moment(date).startOf("day").toDate();
		setCurrentDate(formatDate);
	};

	const handleChangeTime = (timeKey) => {
		if (!currentDoctorId) {
			message.error("Please select doctor!!!");
			return;
		}
		if (!currentDate) {
			message.error("Please select date!!!");
			return;
		}

		const existed = listCurrentTime.find((item) => {
			return (
				item.time === timeKey &&
				new Date(item.date).getTime() === new Date(currentDate).getTime()
			);
		});
		if (existed) {
			if (listCurrentTime.length === 1) {
				showDeleteConfirm();
			} else {
				setListCurrentTime(
					listCurrentTime.filter((item) => {
						return (
							item.time !== timeKey ||
							new Date(item.date).getTime() !== new Date(currentDate).getTime()
						);
					})
				);
			}
		} else {
			setListCurrentTime([
				...listCurrentTime,
				{
					time: timeKey,
					date: currentDate,
				},
			]);
		}
	};

	const checkEnableTime = useCallback(
		(timeKey) => {
			const existed = listCurrentTime.find((item) => {
				return (
					item.time === timeKey &&
					new Date(item.date).getTime() === new Date(currentDate).getTime()
				);
			});
			return !!existed;
		},
		[listCurrentTime, currentDate]
	);

	const handleDeleteTime = (record) => {
		if (!record) return;
		const keyMap = record.key.split("-")[0];
		if (listCurrentTime?.length === 1) {
			showDeleteConfirm();
		} else {
			setListCurrentTime(
				listCurrentTime.filter((item) => {
					return (
						item.time !== keyMap ||
						new Date(item.date).getTime() !== new Date(record.date).getTime()
					);
				})
			);
		}
	};

	const handleDeleteAllTime = async () => {
		if (!currentDoctorId) return;
		setLoading(true);
		const result = await userService.deleteDoctorSchedules(currentDoctorId);

		if (result.errorCode === 0) {
			message.success(result.message);
			setListCurrentTime([]);
		} else {
			message.error("Deleted schedules fail!!!");
		}
		setLoading(false);
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (_, record) => {
				return <span>{moment(record.date).format("DD/MM/YYYY")}</span>;
			},
		},
		{
			title: "Time",
			key: "time",
			dataIndex: "time",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button
					type='link'
					className={styles.btnDelete}
					onClick={() => handleDeleteTime(record)}>
					<FormattedMessage id='common.delete' />
				</Button>
			),
		},
	];

	const dataTable = useMemo(() => {
		if (!listCurrentTime?.length) return [];

		const currentDoctor = doctors.find(
			(doctor) => doctor.id === currentDoctorId
		);
		const currentDoctorName =
			language === "en"
				? `${currentDoctor?.firstName} ${currentDoctor?.lastName}`
				: `${currentDoctor?.lastName} ${currentDoctor?.firstName}`;

		const dateTable = listCurrentTime.map((item, index) => {
			const time = times.find((time) => time.keyMap === item.time);

			return {
				key: `${time.keyMap}-${index}`,
				name: currentDoctorName,
				date: item.date,
				time: language === "en" ? time.valueEn : time.valueVi,
			};
		});

		return dateTable.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	}, [currentDoctorId, doctors, language, listCurrentTime, times]);

	const handleSave = useCallback(async () => {
		setLoading(true);

		if (!currentDoctorId || !currentDate || !listCurrentTime?.length) {
			message.error("Missing params");
		}
		const list = listCurrentTime.map((item) => {
			return {
				doctorId: currentDoctorId,
				date: new Date(item.date).getTime(),
				timeType: item.time,
			};
		});

		const result = await userService.createDoctorSchedules(
			currentDoctorId,
			list
		);
		if (result?.errorCode === 0) {
			message.success(result?.message);
		} else {
			message.error(result?.message);
		}
		setLoading(false);
	}, [currentDate, currentDoctorId, listCurrentTime]);

	const enableSubmit = useMemo(() => {
		return currentDoctorId && currentDate && listCurrentTime?.length;
	}, [currentDate, currentDoctorId, listCurrentTime?.length]);

	const showDeleteConfirm = () => {
		confirm({
			title: "Are you sure to delete all doctor's schedule?",
			icon: <ExclamationCircleOutlined />,
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				handleDeleteAllTime();
			},
		});
	};

	return (
		<div className='container'>
			<Spin spinning={loading}>
				<section className={styles.doctorScheduleManage}>
					<h1 className={clsx("text-center", styles.doctorScheduleManageTitle)}>
						<FormattedMessage id='system.schedule-manage.title' />
					</h1>
					<div className={styles.blockTop}>
						<Row gutter={[16, 16]}>
							<Col xs={24} md={12}>
								<div className={styles.chooseDoctor}>
									<label>
										<FormattedMessage id='system.doctor-manage.choose-doctor' />
									</label>
									<Select
										size='large'
										showSearch
										style={{
											width: 200,
										}}
										placeholder={
											<FormattedMessage id='common.search_placeholder' />
										}
										optionFilterProp='children'
										filterOption={(input, option) =>
											option.children.includes(input)
										}
										filterSort={(optionA, optionB) =>
											optionA.children
												.toLowerCase()
												.localeCompare(optionB.children.toLowerCase())
										}
										value={currentDoctorId}
										onChange={handleChangeDoctor}>
										{doctors?.length &&
											doctors.map((doctor) => (
												<Option value={doctor.id} key={doctor.id}>
													{language === "vi"
														? doctor.firstName + " " + doctor.lastName
														: doctor.lastName + " " + doctor.firstName}
												</Option>
											))}
									</Select>
								</div>
							</Col>
							<Col xs={24} md={12}>
								<div className={styles.dateInfo}>
									<label>
										<FormattedMessage id='system.schedule-manage.choose-date' />
									</label>
									<ConfigProvider locale={language === "en" ? en_US : vi_VN}>
										<DatePicker
											size='large'
											onChange={onChangeDate}
											disabledDate={(current) =>
												current &&
												current <
													moment(new Date()).subtract(1, "days").endOf("day")
											}
											format='DD/MM/YYYY'
										/>
									</ConfigProvider>
								</div>
							</Col>
						</Row>
					</div>
					<div className={styles.listTime}>
						<label>
							<FormattedMessage id='system.schedule-manage.choose-time' />
						</label>
						{times?.length && (
							<Card>
								<Spin spinning={isLoadingTime}>
									<Row gutter={[16, 16]}>
										{times.map((time) => (
											<Col key={time.keyMap} xs={24} md={12} lg={6}>
												<Button
													type={checkEnableTime(time.keyMap) ? "primary" : ""}
													value={time.keyMap}
													size='large'
													className={styles.btnTime}
													onClick={() => handleChangeTime(time.keyMap)}>
													{language === "en" ? time.valueEn : time.valueVi}
												</Button>
											</Col>
										))}
									</Row>
								</Spin>
							</Card>
						)}
					</div>
					<div className={styles.tableData}>
						<Card>
							<Table columns={columns} dataSource={dataTable} />
						</Card>
					</div>
					<div className={styles.saveWrap}>
						<Button
							type='primary'
							icon={<PlusOutlined />}
							className={styles.saveBtn}
							size='large'
							onClick={handleSave}
							disabled={!enableSubmit}>
							<FormattedMessage id='common.save' />
						</Button>
					</div>
				</section>
			</Spin>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		isLoadingTime: state.admin.isLoadingTime,
		times: state.admin.times,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTimeStart: () => dispatch(actions.fetchTimeStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
