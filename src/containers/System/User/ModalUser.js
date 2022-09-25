import React, { useState, useEffect } from "react";
import {
	Modal,
	Form,
	Input,
	Row,
	Col,
	Select,
	Button,
	message,
	Spin,
} from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import styles from "./ModalUser.module.scss";
import CommonUtils from "./../../../utils/CommonUtils";
import { languages } from "../../../utils/constant";
import { uploadService } from "../../../services";
import "react-image-lightbox/style.css";

const { Option } = Select;

const ModalUser = ({
	isShow,
	isEdit,
	userEdit,
	onClose,
	onCreateUser,
	onEditUser,
	language,
	genders,
	roles,
	positions,
}) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingImg, setIsLoadingImg] = useState(false);
	const [openLightBox, setOpenLightBox] = useState(false);
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		if (isEdit && userEdit) {
			setValuesForm(userEdit);
			if (userEdit.image) {
				setAvatar(userEdit.image);
			}
		}
	}, [isEdit, userEdit]);

	const setValuesForm = (user) => {
		form.setFieldsValue(user);
	};

	const handleSubmitUser = async () => {
		setIsLoading(true);
		form.validateFields().then((values) => {
			let result = false;
			const body = {
				...values,
				avatar: avatar,
			};
			if (isEdit) {
				result = onEditUser(body);
			} else {
				result = onCreateUser(body);
			}
			if (result) {
				setAvatar(null);
				form.resetFields();
			}
		});
		setIsLoading(false);
	};

	const handleCancel = () => {
		setAvatar(null);
		form.resetFields();
		onClose();
	};

	const handleChangeImage = async (e) => {
		e.preventDefault();
		try {
			const file = e.target.files[0];

			if (!file) return message.error("Image does not exist!");

			if (file.size > 1024 * 1024)
				//1mb
				return message.error("Size to large!");

			if (file.type !== "image/jpeg" && file.type !== "image/png")
				return message.error("Image format is not suitable!");

			setIsLoadingImg(true);
			const res = await uploadService.upload(file);
			setAvatar(res.data);
			setIsLoadingImg(false);
		} catch (err) {
			message.error(err.response.data.msg);
		}
	};

	const handleDestroy = async (e) => {
		e.stopPropagation();
		try {
			setIsLoadingImg(true);
			const res = await uploadService.destroy(avatar.public_id);
			if (res?.errorCode === 0) {
				setAvatar(null);
			} else {
				message.error(res?.message);
			}
			setIsLoadingImg(false);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	return (
		<>
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
											<Option value={gender.keyMap} key={gender.keyMap}>
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
									}>
									{roles?.length &&
										roles.map((role) => (
											<Option value={role.keyMap} key={role.keyMap}>
												{language === languages.VI
													? role.valueVi
													: role.valueEn}
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
									}>
									{positions?.length &&
										positions.map((position) => (
											<Option value={position.keyMap} key={position.keyMap}>
												{language === languages.VI
													? position.valueVi
													: position.valueEn}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={24}>
							<Spin spinning={isLoadingImg}>
								<div className={styles.uploadImage}>
									<label>
										<FormattedMessage id='system.user-manage.image' />
									</label>
									<div className={styles.uploadImageContainer}>
										<div
											className={styles.previewImage}
											style={{
												backgroundImage: `url(${avatar?.url})`,
											}}
											onClick={() => {
												if (avatar?.url) {
													setOpenLightBox(true);
												}
											}}>
											{avatar?.url && !isEdit && (
												<div
													className={styles.destroyImage}
													onClick={(e) => handleDestroy(e)}>
													<CloseOutlined />
												</div>
											)}
										</div>
										<label htmlFor='previewImg' className={styles.upload}>
											<UploadOutlined />
											<span>
												<FormattedMessage id='common.upload-image' />
											</span>
										</label>
										<input
											type='file'
											hidden
											id='previewImg'
											onChange={(e) => handleChangeImage(e)}
										/>
									</div>
								</div>
							</Spin>
						</Col>
					</Row>
				</Form>
			</Modal>
			{openLightBox && (
				<Lightbox
					mainSrc={avatar?.url}
					onCloseRequest={() => setOpenLightBox(false)}
				/>
			)}
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		genders: state.admin.genders,
		roles: state.admin.roles,
		positions: state.admin.positions,
		isLoadingGender: state.admin.isLoadingGender,
		isLoadingRole: state.admin.isLoadingRole,
		isLoadingPosition: state.admin.isLoadingPosition,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
