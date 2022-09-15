import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import styles from "./ModalUser.module.scss";
import CommonUtils from "./../../../utils/CommonUtils";
import { userService } from "../../../services";
import { languages } from "../../../utils/constant";

const { Option } = Select;

const ModalUser = ({
	isShow,
	isEdit,
	userEdit,
	onClose,
	onCreateUser,
	onEditUser,
	language,
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [genders, setGenders] = useState(null);
	const [roles, setRoles] = useState(null);
	const [positions, setPositions] = useState(null);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (isEdit && userEdit) {
			setValuesForm(userEdit);
		}
	}, [isEdit, userEdit]);

	const loadData = async () => {
		const resultGender = await userService.getAllCode("GENDER");
		if (resultGender.errorCode === 0) {
			setGenders(resultGender.data);
		}
		const resultRole = await userService.getAllCode("ROLE");
		if (resultRole.errorCode === 0) {
			setRoles(resultRole.data);
		}
		const resultPosition = await userService.getAllCode("POSITION");
		if (resultPosition.errorCode === 0) {
			setPositions(resultPosition.data);
		}
	};

	const setValuesForm = (user) => {
		form.setFieldsValue(user);
	};

	const handleSubmitUser = async () => {
		setIsLoading(true);
		form.validateFields().then((values) => {
			let result = false;
			if (isEdit) {
				result = onEditUser(values);
			} else {
				result = onCreateUser(values);
			}
			if (result) {
				form.resetFields();
			}
		});
		setIsLoading(false);
	};

	const handleCancel = () => {
		form.resetFields();
		onClose();
	};

	return (
		<Modal
			title={
				isEdit ? (
					<FormattedMessage id='system.user-manage.edit-user' />
				) : (
					<FormattedMessage id='system.user-manage.add-user' />
				)
			}
			visible={isShow}
			onOk={handleSubmitUser}
			onCancel={handleCancel}
			className={styles.modalUser}
			footer={[
				<Button key='back' onClick={handleCancel}>
					<FormattedMessage id='common.close' />
				</Button>,
				<Button
					key='submit'
					type='primary'
					loading={isLoading}
					onClick={handleSubmitUser}>
					{isEdit ? (
						<FormattedMessage id='common.edit' />
					) : (
						<FormattedMessage id='common.add' />
					)}
				</Button>,
			]}>
			<Form
				form={form}
				name='create-user-form'
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				autoComplete='off'>
				<Row gutter={[16, 16]}>
					<Col xs={24} md={isEdit ? 24 : 12}>
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
							<Input disabled={isEdit} />
						</Form.Item>
					</Col>
					{!isEdit && (
						<Col xs={24} md={12}>
							<Form.Item
								label={<FormattedMessage id='system.user-manage.password' />}
								name='password'
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='system.user-manage.password-required' />
										),
									},
								]}>
								<Input.Password />
							</Form.Item>
						</Col>
					)}
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24} md={12}>
						<Form.Item
							label={<FormattedMessage id='system.user-manage.first-name' />}
							name='firstName'
							rules={[
								{
									required: true,
									message: (
										<FormattedMessage id='system.user-manage.firstname-required' />
									),
								},
							]}>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item
							label={<FormattedMessage id='system.user-manage.last-name' />}
							name='lastName'
							rules={[
								{
									required: true,
									message: (
										<FormattedMessage id='system.user-manage.lastname-required' />
									),
								},
							]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
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
							label={<FormattedMessage id='system.user-manage.address' />}
							name='address'
							rules={[
								{
									required: true,
									message: (
										<FormattedMessage id='system.user-manage.address-required' />
									),
								},
							]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24} md={8}>
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
										<Option value={gender.key} key={gender.key}>
											{language === languages.VI
												? gender.valueVi
												: gender.valueEn}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} md={8}>
						<Form.Item
							label={<FormattedMessage id='system.user-manage.role' />}
							name='roleId'
							hasFeedback
							rules={[
								{
									required: true,
									message: (
										<FormattedMessage id='system.user-manage.role-required' />
									),
								},
							]}>
							<Select
								placeholder={
									<FormattedMessage id='system.user-manage.role-placeholder' />
								}
								disabled={isEdit}>
								{roles?.length &&
									roles.map((role) => (
										<Option value={role.key} key={role.key}>
											{language === languages.VI ? role.valueVi : role.valueEn}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col xs={24} md={8}>
						<Form.Item
							label={<FormattedMessage id='system.user-manage.position' />}
							name='positionId'
							hasFeedback
							rules={[
								{
									required: true,
									message: (
										<FormattedMessage id='system.user-manage.position-required' />
									),
								},
							]}>
							<Select
								placeholder={
									<FormattedMessage id='system.user-manage.position-placeholder' />
								}
								disabled={isEdit}>
								{positions?.length &&
									positions.map((position) => (
										<Option value={position.key} key={position.key}>
											{language === languages.VI
												? position.valueVi
												: position.valueEn}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
