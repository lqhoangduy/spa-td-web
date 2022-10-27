import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Select, Spin, Row, Col, Button, Empty, message } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import localization from "moment/locale/vi";
import { languages } from "../../../utils/constant";
import { userService } from "../../../services";

import styles from "./ScheduleDoctor.module.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import CommonUtils from "../../../utils/CommonUtils";
import { LanguageUtils } from "../../../utils";
import BookingModal from "./BookingModal";
import clsx from "clsx";

const { Option } = Select;

function ScheduleDoctor({ language, getGenderStart, doctor }) {
	const { id } = useParams();
	const [allDays, setAllDays] = useState([]);
	const [currentDate, setCurrentDate] = useState(null);
	const [loadingSchedule, setLoadingSchedule] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const [openBookingModal, setOpenBookingModal] = useState(false);
	const [currentTime, setCurrentTime] = useState({});

	useEffect(() => {
		getGenderStart();
	}, []);

	useEffect(() => {
		handleChangeLangDate();
	}, [language]);

	useEffect(() => {
		loadSchedules();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentDate, doctor]);

	const handleChangeLangDate = () => {
		const arrayDate = [];
		for (let i = 0; i < 7; i++) {
			const dayOfWeek = {
				label:
					language === languages.VI
						? moment().add(i, "days").format("dddd - DD/MM/YYYY")
						: moment().locale("en").add(i, "days").format("dddd - DD/MM/YYYY"),
				value: moment().add(i, "days").startOf("day").valueOf(),
			};

			if (i === 0) {
				// Today
				const newDate = moment().format("DD/MM/YYYY");
				const label = `${LanguageUtils.getMessageByKey(
					"common.today",
					language
				)} - ${newDate}`;
				dayOfWeek.label = label;
			} else {
				if (language === languages.VI) {
					// Language VI
					dayOfWeek.label = moment().add(i, "days").format("dddd - DD/MM/YYYY");
				} else {
					// Language EN
					dayOfWeek.label = moment()
						.locale("en")
						.add(i, "days")
						.format("dddd - DD/MM/YYYY");
				}
			}

			dayOfWeek.value = moment().add(i, "days").startOf("day").valueOf();

			arrayDate.push(dayOfWeek);
		}
		setAllDays(arrayDate);
		setCurrentDate(arrayDate[0].value);
	};

	const loadSchedules = async () => {
		if (id && currentDate) {
			setLoadingSchedule(true);
			const formatDate = moment(currentDate).toDate();
			const result = await userService.getSchedulesByDate(
				doctor?.id,
				formatDate
			);
			if (result.errorCode === 0) {
				setSchedules(result.data);
			}
			setLoadingSchedule(false);
		}
	};

	const handleChangeDate = (value) => {
		setCurrentDate(value);
	};

	const handleChangeChooseTime = (timeType, timeTypeData) => {
		setCurrentTime({
			timeType: timeType,
			timeTypeData: timeTypeData,
		});
		setOpenBookingModal(true);
	};

	const handleSubmitBooking = async (data) => {
		console.log(data);
		const result = await userService.bookingAppointment(data);
		if (result?.errorCode === 0) {
			message.success(
				LanguageUtils.getMessageByKey("doctor.booking-success", language)
			);
			return true;
		} else {
			message.error(
				LanguageUtils.getMessageByKey("doctor.booking-error", language)
			);
			return false;
		}
	};

	const handleCancelBooking = () => {
		setCurrentTime({});
		setOpenBookingModal(false);
	};

	const currentDateData = useMemo(() => {
		return allDays?.find((item) => item.value === currentDate);
	}, [allDays, currentDate]);

	return (
		<>
			<section className={styles.doctorSchedule}>
				<div className={styles.allSchedule}>
					<Select
						onChange={handleChangeDate}
						className={styles.selectSchedule}
						placeholder={<FormattedMessage id='doctor.select-date' />}
						bordered={false}
						value={currentDate}>
						{allDays?.length &&
							allDays.map((day) => (
								<Option value={day.value} key={day.value}>
									{CommonUtils.capitalize(day.label)}
								</Option>
							))}
					</Select>
				</div>
				<div className={styles.allAvailableTime}>
					<div className={styles.timeTitleWrap}>
						<CalendarOutlined className={styles.timeTitleIcon} />
						<h3 className={styles.timeTitle}>
							<FormattedMessage id='doctor.examination-schedule' />
						</h3>
					</div>
					{!!schedules?.length ? (
						<Spin spinning={loadingSchedule}>
							<Row gutter={[16, 16]} className={styles.listTime}>
								{schedules.map((schedule) => (
									<Col key={schedule.id} xs={24} md={12} lg={6}>
										<Button
											onClick={() =>
												handleChangeChooseTime(
													schedule.timeType,
													schedule.timeTypeData
												)
											}
											size='large'
											className={clsx(styles.btnTime, {
												[styles.active]:
													currentTime?.timeType === schedule.timeType,
											})}>
											{language === languages.EN
												? schedule.timeTypeData?.valueEn
												: schedule.timeTypeData?.valueVi}
										</Button>
									</Col>
								))}
							</Row>
							<span className={styles.noteTime}>
								<FormattedMessage id='doctor.choose-and-book' />
							</span>
						</Spin>
					) : (
						<Empty
							description={<FormattedMessage id='doctor.empty-schedule' />}
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							className={styles.emptySchedule}
						/>
					)}
				</div>
			</section>
			{openBookingModal && (
				<BookingModal
					timeData={currentTime}
					onCancel={handleCancelBooking}
					onSubmit={handleSubmitBooking}
					doctor={doctor}
					dateData={currentDateData}
				/>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		times: state.admin.times,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTimeStart: () => dispatch(actions.fetchTimeStart()),
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
