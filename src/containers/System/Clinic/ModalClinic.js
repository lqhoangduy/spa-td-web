import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, Row, Col, Button, message, Spin } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { LanguageUtils } from "../../../utils";
import { uploadService } from "../../../services";
import styles from "./ModalClinic.module.scss";
import "react-image-lightbox/style.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalClinic = ({
	isShow,
	isEdit,
	onClose,
	language,
	onCreate,
	clinicEdit,
	onEdit,
}) => {
	const [openLightBox, setOpenLightBox] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingImg, setLoadingImg] = useState(false);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [image, setImage] = useState(null);
	const [descriptionHTML, setDescriptionHTML] = useState("");
	const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
	const fileRef = useRef();

	useEffect(() => {
		if (isEdit && clinicEdit) {
			if (clinicEdit.image) {
				setImage(clinicEdit.image);
			}
			setDescriptionMarkdown(clinicEdit.descriptionMarkdown);
			setDescriptionHTML(clinicEdit.descriptionHTML);
			setName(clinicEdit.name);
			setAddress(clinicEdit.address);
		}
	}, [isEdit, clinicEdit]);

	const handleCancel = () => {
		setImage(null);
		setName("");
		setAddress("");
		setDescriptionHTML("");
		setDescriptionMarkdown("");
		clearInputFile();
		onClose();
	};

	const handleSubmit = async () => {
		if (!name || !descriptionHTML || !descriptionMarkdown) {
			message.error(
				LanguageUtils.getMessageByKey("system.clinic-manage.missing-field")
			);
			return;
		}

		const data = {
			id: clinicEdit?.id,
			name,
			address,
			descriptionHTML,
			descriptionMarkdown,
			image,
		};

		let result = false;
		setLoading(true);
		if (isEdit) {
			result = await onEdit(data);
		} else {
			result = await onCreate(data);
		}
		setLoading(false);

		if (result) {
			handleCancel();
		}
	};

	const handleChangeImage = async (e) => {
		e.preventDefault();
		try {
			const file = e.target.files[0];

			if (!file)
				return message.error(
					LanguageUtils.getMessageByKey("error.image-not-exist", language)
				);

			if (file.size > 1024 * 1024)
				//1mb
				return message.error(
					LanguageUtils.getMessageByKey("error.size-too-large", language)
				);

			if (file.type !== "image/jpeg" && file.type !== "image/png")
				return message.error(
					LanguageUtils.getMessageByKey("error.image-format", language)
				);

			setLoadingImg(true);
			const res = await uploadService.upload(file);
			setImage(res.data);
			setLoadingImg(false);
		} catch (err) {
			message.error(err.response.data.msg);
		}
	};

	const handleDestroy = async (e) => {
		e.stopPropagation();
		clearInputFile();
		try {
			setLoadingImg(true);
			const res = await uploadService.destroy(image.public_id);
			if (res?.errorCode === 0) {
				setImage(null);
			} else {
				message.error(res?.message);
			}
			setLoadingImg(false);
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	const handleEditorChange = ({ html, text }) => {
		setDescriptionMarkdown(text);
		setDescriptionHTML(html);
	};

	const clearInputFile = () => {
		const f = fileRef.current;

		if (f?.value) {
			try {
				f.value = ""; //for IE11, latest Chrome/Firefox/Opera...
			} catch (err) {}
			if (f?.value) {
				//for IE5 ~ IE10
				var form = document.createElement("form"),
					parentNode = f.parentNode,
					ref = f.nextSibling;
				form.appendChild(f);
				form.reset();
				parentNode.insertBefore(f, ref);
			}
		}
	};

	return (
		<>
			<Modal
				title={
					isEdit ? (
						<FormattedMessage id='system.clinic-manage.edit-clinic' />
					) : (
						<FormattedMessage id='system.clinic-manage.add-clinic' />
					)
				}
				visible={isShow}
				onOk={handleSubmit}
				onCancel={handleCancel}
				className={styles.modalClinic}
				footer={[
					<Button key='back' onClick={handleCancel}>
						<FormattedMessage id='common.close' />
					</Button>,
					<Button
						key='submit'
						type='primary'
						loading={loading}
						onClick={handleSubmit}>
						{isEdit ? (
							<FormattedMessage id='common.edit' />
						) : (
							<FormattedMessage id='common.add' />
						)}
					</Button>,
				]}>
				<div className={styles.modalClinicInfo}>
					<Row gutter={[16, 16]} justify='center'>
						<Col xs={24}>
							<Spin spinning={loadingImg}>
								<div className={styles.uploadImage}>
									<label>
										<FormattedMessage id='system.clinic-manage.image' />
									</label>
									<div className={styles.uploadImageContainer}>
										<div
											className={styles.previewImage}
											style={{
												backgroundImage: `url(${image?.url})`,
											}}
											onClick={() => {
												if (image?.url) {
													setOpenLightBox(true);
												}
											}}>
											{image?.url && !isEdit && (
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
											ref={fileRef}
											type='file'
											hidden
											id='previewImg'
											onChange={(e) => handleChangeImage(e)}
										/>
									</div>
								</div>
							</Spin>
						</Col>
						<Col xs={24} md={12}>
							<div className={styles.name}>
								<label>
									<FormattedMessage id='system.clinic-manage.name' />
								</label>
								<Input
									size='large'
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>
						</Col>
						<Col xs={24} md={12}>
							<div className={styles.address}>
								<label>
									<FormattedMessage id='system.clinic-manage.address' />
								</label>
								<Input
									size='large'
									value={address}
									onChange={(e) => {
										setAddress(e.target.value);
									}}
								/>
							</div>
						</Col>
						<Col xs={24}>
							<div className={styles.clinicManageEditor}>
								<label>
									<FormattedMessage id='system.clinic-manage.info' />
								</label>
								<MdEditor
									value={descriptionMarkdown}
									style={{ height: "500px" }}
									renderHTML={(text) => mdParser.render(text)}
									onChange={handleEditorChange}
								/>
							</div>
						</Col>
					</Row>
				</div>
			</Modal>
			{openLightBox && (
				<Lightbox
					mainSrc={image?.url}
					onCloseRequest={() => setOpenLightBox(false)}
				/>
			)}
		</>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalClinic);
