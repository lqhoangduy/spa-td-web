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
	Popconfirm,
	Tooltip,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../store/actions";
import { userService } from "../../../services";
import styles from "./ScheduleManage.module.scss";
import en_US from "antd/lib/locale/en_US";
import vi_VN from "antd/lib/locale/vi_VN";
import { createImportSpecifier } from "typescript";

const { Option } = Select;

function ScheduleManage({ language, isLoadingTime, times, getTimeStart }) {
	const [loading, setLoading] = useState(false);
	const [currentDoctorId, setCurrentDoctorId] = useState(null);
	const [doctors, setDoctors] = useState(null);
	const [listCurrentTime, setListCurrentTime] = useState([]);
	const [currentDate, setCurrentDate] = useState(null);

	useEffect(() => {
		loadData();

		return () => {};
	}, []);

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
		setCurrentDate(dateString);
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
			return item.time === timeKey && item.date === currentDate;
		});
		if (existed) {
			setListCurrentTime(
				listCurrentTime.filter((item) => {
					return item.time !== timeKey || item.date !== currentDate;
				})
			);
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
				return item.time === timeKey && item.date === currentDate;
			});
			return !!existed;
		},
		[listCurrentTime, currentDate]
	);

	const handleDeleteTime = (record) => {
		if (!record) return;
		const keyMap = record.key.split("-")[0];
		setListCurrentTime(
			listCurrentTime.filter((item) => {
				return item.time !== keyMap || item.date !== record.date;
			})
		);
	};

	console.log(listCurrentTime);

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
				<Popconfirm
					title={<FormattedMessage id='system.user-manage.sure-delete-user' />}
					onConfirm={() => handleDeleteTime(record)}
					okText={<FormattedMessage id='common.yes' />}
					cancelText={<FormattedMessage id='common.no' />}>
					<Tooltip
						placement='bottom'
						title={<FormattedMessage id='common.delete' />}>
						<Button
							type='link'
							icon={<DeleteOutlined />}
							className='btn-delete'
						/>
					</Tooltip>
				</Popconfirm>
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
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
	}, [currentDoctorId, doctors, language, listCurrentTime, times]);

	const handleSave = useCallback(() => {
		if (!currentDoctorId || !currentDate || !listCurrentTime?.length) {
			message.error("Missing params");
		}
		const list = listCurrentTime.map((item) => {
			return {
				...item,
				doctorId: currentDoctorId,
			};
		});

		console.log(list);
	}, [currentDate, currentDoctorId, listCurrentTime]);

	const enableSubmit = useMemo(() => {
		return currentDoctorId && currentDate && listCurrentTime?.length;
	}, [currentDate, currentDoctorId, listCurrentTime?.length]);

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
