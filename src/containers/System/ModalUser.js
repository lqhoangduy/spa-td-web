import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { FormattedMessage } from "react-intl";
import styles from "./ModalUser.module.scss";
import CommonUtils from "./../../utils/CommonUtils";

const { Option } = Select;

const ModalUser = ({
	isShow,
	isEdit,
	userEdit,
	onClose,
	onCreateUser,
	onEditUser,
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	console.log(isEdit, userEdit);

	useEffect(() => {
		if (isEdit && userEdit) {
			setValuesForm(userEdit);
		}
	}, [isEdit, userEdit]);

	const setValuesForm = (user) => {
		form.setFieldsValue(user);
	};

	const handleSubmitUser = async () => {
		setIsLoading(true);
		form.validateFields().then((values) => {
			if (isEdit) {
				onEditUser(values);
			} else {
				onCreateUser(values);
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
				initialValues={{ remember: true }}
				autoComplete='off'>
				<Row gutter={[16, 16]}>
					<Col xs={isEdit ? 24 : 12}>
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
						<Col xs={12}>
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
					<Col xs={12}>
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
					<Col xs={12}>
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
					<Col xs={24}>
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
					<Col xs={12}>
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
					<Col xs={6}>
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
								<Option value='1'>
									<FormattedMessage id='common.male' />
								</Option>
								<Option value='2'>
									<FormattedMessage id='common.female' />
								</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col xs={6}>
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
								<Option value='1'>
									<FormattedMessage id='common.admin' />
								</Option>
								<Option value='2'>
									<FormattedMessage id='common.doctor' />
								</Option>
								<Option value='3'>
									<FormattedMessage id='common.patient' />
								</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default ModalUser;
