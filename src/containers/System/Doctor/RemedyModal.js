import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col, Input, message, Spin } from "antd";
import { FormattedMessage } from "react-intl";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import Lightbox from "react-image-lightbox";
import { LanguageUtils } from "../../../utils";
import { uploadService } from "../../../services";
import styles from "./RemedyModal.module.scss";
import "react-image-lightbox/style.css";

const { TextArea } = Input;

function RemedyModal({ language, onCancel, onSubmit, email }) {
	const [loading, setLoading] = useState(false);
	const [emailInput, setEmailInput] = useState(email);
	const [openLightBox, setOpenLightBox] = useState(false);
	const [image, setImage] = useState(null);
	const [note, setNote] = useState(null);
	const fileRef = useRef();

	const handleCancel = async () => {
		if (image?.url) {
			await handleDestroy();
		}
		onCancel();
	};

	const handleSubmit = async () => {
		if (emailInput && image && note) {
			const data = {
				email: emailInput,
				image: image,
				note: note,
			};
			setLoading(true);
			const result = await onSubmit(data);
			if (result) {
				onCancel();
			}
			setLoading(false);
		} else {
			message.error(
				LanguageUtils.getMessageByKey("common.error-missing-param", language)
			);
		}
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

			setLoading(true);
			const res = await uploadService.upload(file);
			setImage(res.data);
			setLoading(false);
		} catch (err) {
			message.error(err.response.data.msg);
		}
	};

	const handleDestroy = async (e) => {
		e?.stopPropagation();
		clearInputFile();
		try {
			setLoading(true);
			const res = await uploadService.destroy(image.public_id);
			if (res?.errorCode === 0) {
				setImage(null);
			} else {
				message.error(res?.message);
			}
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Modal
				visible={true}
				title={<FormattedMessage id='system.patient-manage.title-modal' />}
				onOk={handleSubmit}
				onCancel={handleCancel}
				className={styles.modalRemedy}
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
				<Spin spinning={loading}>
					<Row className={styles.remedyBody} gutter={[16, 16]} justify='center'>
						<Col xs={24}>
							<label className={styles.emailLabel}>
								<FormattedMessage id='system.patient-manage.email' />
							</label>
							<Input
								className={styles.emailInput}
								value={emailInput}
								onChange={(e) => setEmailInput(e.target.value)}
								size='large'
							/>
						</Col>
						<Col xs={24}>
							<label className={styles.label}>
								<FormattedMessage id='system.patient-manage.note' />
							</label>
							<TextArea
								rows={6}
								className={styles.noteInput}
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
						</Col>
						<Col xs={24}>
							<label className={styles.fileLabel}>
								<FormattedMessage id='system.patient-manage.file' />
							</label>
							<div className={styles.uploadImageContainer}>
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
						</Col>
						<Col xs={24}>
							{image?.url && (
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
									<div
										className={styles.destroyImage}
										onClick={(e) => handleDestroy(e)}>
										<CloseOutlined />
									</div>
								</div>
							)}
						</Col>
					</Row>
				</Spin>
			</Modal>
			{openLightBox && (
				<Lightbox
					mainSrc={image?.url}
					onCloseRequest={() => setOpenLightBox(false)}
				/>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
