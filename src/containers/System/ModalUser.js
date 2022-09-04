import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
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
			title={isEdit ? "Edit user" : "Add user"}
			visible={isShow}
			onOk={handleSubmitUser}
			onCancel={handleCancel}
			className={styles.modalUser}
			footer={[
				<Button key='back' onClick={handleCancel}>
					Cancel
				</Button>,
				<Button
					key='submit'
					type='primary'
					loading={isLoading}
					onClick={handleSubmitUser}>
					Submit
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
							label='Email'
							name='email'
							rules={[
								{ required: true, message: "Please input your email!" },
								{
									type: "email",
									message: "Email is not a valid email!",
								},
							]}>
							<Input disabled={isEdit} />
						</Form.Item>
					</Col>
					{!isEdit && (
						<Col xs={12}>
							<Form.Item
								label='Password'
								name='password'
								rules={[
									{ required: true, message: "Please input your password!" },
								]}>
								<Input.Password />
							</Form.Item>
						</Col>
					)}
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={12}>
						<Form.Item
							label='Fist name'
							name='firstName'
							rules={[
								{ required: true, message: "Please input your firstName!" },
							]}>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={12}>
						<Form.Item
							label='Last name'
							name='lastName'
							rules={[
								{ required: true, message: "Please input your lastName!" },
							]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={24}>
						<Form.Item
							label='Address'
							name='address'
							rules={[
								{ required: true, message: "Please input your address!" },
							]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col xs={12}>
						<Form.Item
							label='Phone number'
							name='phoneNumber'
							rules={[
								{
									required: true,
									message: "Please input your phone number!",
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
										return Promise.reject("Number phone invalid!");
									},
								}),
							]}>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							label='Gender'
							name='gender'
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please select a gender!",
								},
							]}>
							<Select placeholder='Please select a gender'>
								<Option value='1'>Male</Option>
								<Option value='2'>Female</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col xs={6}>
						<Form.Item
							label='Role'
							name='roleId'
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please select a role!",
								},
							]}>
							<Select placeholder='Please select a role' disabled={isEdit}>
								<Option value='1'>Admin</Option>
								<Option value='2'>Doctor</Option>
								<Option value='3'>Patient</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default ModalUser;
