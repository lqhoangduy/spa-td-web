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
	Spin,
} from "antd";
import { FormattedMessage } from "react-intl";
import { CommonUtils, Format, languages, LanguageUtils } from "../../../utils";
import styles from "./BookingModal.module.scss";
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
				<Button key='back' onClick={handleCancel} loading={loading}>
					<FormattedMessage id='common.close' />
				</Button>,
				<Button
					key='submit'
					type='primary'
					loading={loading}
					onClick={handleSubmit}>
					<FormattedMessage id='common.confirm' />
				</Button>,
			]}>
			<ProfileDoctor doctor={doctor} />
			<div className={styles.infoBlock}>
				<div className={styles.timeBlock}>
					{language === languages.EN
						? timeData.timeTypeData?.valueEn
						: timeData.timeTypeData?.valueVi}
					, {dateData ? CommonUtils.capitalize(dateData.label) : "--"}
				</div>
				<div className={styles.priceBlock}>
					<FormattedMessage id='doctor.price' />
					{doctor?.DoctorInfo
						? language === languages.EN
							? Format.currencyEN(doctor?.DoctorInfo?.priceData?.valueEn)
							: Format.currencyVI(doctor?.DoctorInfo?.priceData?.valueVi)
						: "--"}
				</div>
			</div>
			<Spin spinning={loading}>
				<Form
					form={form}
					name='create-user-form'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					autoComplete='off'>
					<Row gutter={[16, 0]}>
						<Col xs={24} md={12}>
							<Form.Item
								label={<FormattedMessage id='doctor.name' />}
								name='name'
								rules={[
									{
										required: true,
										message: <FormattedMessage id='doctor.name-required' />,
									},
								]}>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label={<FormattedMessage id='system.user-manage.mobile' />}
								name='phoneNumber'
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='system.user-manage.mobile-required' />
										),
									},
									() => ({
										validator(_, value) {
											if (
												!value ||
												CommonUtils.validatePhoneNumber(value) ||
												!(value.length > 0)
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												<FormattedMessage id='system.user-manage.mobile-valid' />
											);
										},
									}),
								]}>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label={<FormattedMessage id='system.user-manage.email' />}
								name='email'
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='system.user-manage.email-required' />
										),
									},
									{
										type: "email",
										message: (
											<FormattedMessage id='system.user-manage.email-valid' />
										),
									},
								]}>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label={<FormattedMessage id='doctor.address-contact' />}
								name='address'
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='doctor.address-contact-required' />
										),
									},
								]}>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={24}>
							<Form.Item
								label={<FormattedMessage id='doctor.reason' />}
								name='reason'
								rules={[
									{
										required: true,
										message: <FormattedMessage id='doctor.reason-required' />,
									},
								]}>
								<TextArea rows={4} />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<ConfigProvider
								locale={language === languages.EN ? en_US : vi_VN}>
								<Form.Item
									label={<FormattedMessage id='doctor.birthday' />}
									name='birthday'
									rules={[
										{
											required: true,
											message: (
												<FormattedMessage id='doctor.birthday-required' />
											),
										},
									]}>
									<DatePicker
										placeholder={LanguageUtils.getMessageByKey(
											"doctor.birthday",
											language
										)}
										format='DD/MM/YYYY'
									/>
								</Form.Item>
							</ConfigProvider>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label={<FormattedMessage id='system.user-manage.gender' />}
								name='gender'
								hasFeedback
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='system.user-manage.gender-required' />
										),
									},
								]}>
								<Select
									placeholder={
										<FormattedMessage id='system.user-manage.gender-placeholder' />
									}>
									{genders?.length &&
										genders.map((gender) => (
											<Option value={gender.keyMap} key={gender.keyMap}>
												{language === languages.VI
													? gender.valueVi
													: gender.valueEn}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Spin>
		</Modal>
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
