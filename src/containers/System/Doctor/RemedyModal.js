import React, { useState } from "react";
import { connect } from "react-redux";
import {
	Modal,
	Button,
	Form,
	Row,
	Col,
	Input,
	Select,
	DatePicker,
	ConfigProvider,
} from "antd";
import { FormattedMessage } from "react-intl";
import { CommonUtils, Format, languages, LanguageUtils } from "../../../utils";
import styles from "./RemedyModal.module.scss";
import ProfileDoctor from "./ProfileDoctor";
import en_US from "antd/lib/locale/en_US";
import vi_VN from "antd/lib/locale/vi_VN";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

function BookingModal({
	language,
	onCancel,
	onSubmit,
	genders,
	doctor,
	timeData,
	dateData,
}) {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleCancel = () => {
		onCancel();
	};

	const handleSubmit = async () => {
		form.validateFields().then(async (values) => {
			setLoading(true);
			const timeString =
				language === languages.EN
					? `${timeData.timeTypeData?.valueEn}, ${dateData.label}`
					: `${timeData.timeTypeData?.valueVi}, ${dateData.label}`;

			const doctorName =
				language === languages.EN
					? `${doctor?.firstName} ${doctor?.lastName}`
					: `${doctor?.lastName} ${doctor?.firstName}`;

			const data = {
				...values,
				birthday: moment(values.birthday).toDate(),
				doctorId: doctor.id,
				timeType: timeData.timeType,
				date: moment(new Date(dateData.value)).toDate(),
				language: language,
				timeString: timeString,
				doctorName: doctorName,
			};
			const result = await onSubmit(data);
			if (result) {
				onCancel();
			}
			setLoading(false);
		});
	};

	return (
		<Modal
			visible={true}
			title={<FormattedMessage id='doctor.booking-title' />}
			onOk={handleSubmit}
			onCancel={handleCancel}
			className={styles.modalBooking}
			footer={[
				<Button key='back' onClick={handleCancel}>
					<FormattedMessage id='common.close' />
				</Button>,
				<Button
					key='submit'
					type='primary'
					loading={loading}
					onClick={handleSubmit}>
					<FormattedMessage id='common.confirm' />
				</Button>,
			]}></Modal>
	);
}

const mapStateToProps = (state) => {
	return {
		genders: state.admin.genders,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
