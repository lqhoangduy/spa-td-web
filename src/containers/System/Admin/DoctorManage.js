import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Button, Col, Input, message, Row, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import styles from "./DoctorManage.module.scss";
import "react-markdown-editor-lite/lib/index.css";
import clsx from "clsx";

import { userService, markdownService } from "../../../services";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const { TextArea } = Input;
const { Option } = Select;

function DoctorManage({ language }) {
	const [contentMarkdown, setContentMarkdown] = useState("");
	const [contentHtml, setContentHtml] = useState("");
	const [description, setDescription] = useState("");
	const [currentDoctorId, setCurrentDoctorId] = useState(null);
	const [doctors, setDoctors] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadData();

		return () => {};
	}, []);

	useEffect(() => {
		loadInfoDoctor();

		return () => {};
	}, [currentDoctorId]);

	const loadData = async () => {
		setLoading(true);
		const resultDoctor = await userService.getAllDoctors();
		if (resultDoctor.errorCode === 0) {
			setDoctors(resultDoctor.data);
		}
		setLoading(false);
	};

	const loadInfoDoctor = async () => {
		if (currentDoctorId) {
			setLoading(true);
			const result = await markdownService.getInfoDoctor(currentDoctorId);

			if (result?.errorCode === 0) {
				setContentMarkdown(result?.data?.contentMarkdown ?? "");
				setContentHtml(result?.data?.contentHTML ?? "");
				setDescription(result?.data?.description ?? "");
			} else {
				message.error("Get info failed!");
			}
			setLoading(false);
		}
	};

	const handleEditorChange = ({ html, text }) => {
		setContentMarkdown(text);
		setContentHtml(html);
	};

	const handleSaveMarkdown = async () => {
		const body = {
			contentHTML: contentHtml,
			contentMarkdown: contentMarkdown,
			description: description,
			doctorId: currentDoctorId,
		};

		if (!body.contentHTML || !body.contentMarkdown || !body.doctorId) {
			message.error("Missing params!");
		} else {
			setLoading(true);
			const result = await markdownService.saveInfoDoctor(body);
			setLoading(false);
			if (result?.errorCode === 0) {
				message.success(result?.message);
			} else {
				message.error(result?.message ?? "Update info failed!");
			}
		}
	};

	const handleChangeDoctor = (id) => {
		setCurrentDoctorId(id);
	};

	return (
		<div className='container'>
			<Spin spinning={loading}>
				<section className={styles.doctorManage}>
					<h1 className={clsx("text-center", styles.doctorManageTitle)}>
						<FormattedMessage id='system.doctor-manage.title' />
					</h1>
					<div className={styles.moreInfo}>
						<Row gutter={[16, 16]}>
							<Col xs={24} md={8}>
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
										placeholder='Search to Select'
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
							<Col xs={24} md={16}>
								<div className={styles.introInfo}>
									<label>
										<FormattedMessage id='system.doctor-manage.description' />
									</label>
									<TextArea
										size='large'
										rows={4}
										value={description}
										onChange={(e) => {
											console.log(e.target.value);
											setDescription(e.target.value);
										}}
									/>
								</div>
							</Col>
						</Row>
					</div>
					<div className={styles.doctorManageEditor}>
						<label>
							<FormattedMessage id='system.doctor-manage.content' />
						</label>
						<MdEditor
							value={contentMarkdown}
							style={{ height: "500px" }}
							renderHTML={(text) => mdParser.render(text)}
							onChange={handleEditorChange}
						/>
					</div>
					<div className={styles.saveWrap}>
						<Button
							size='large'
							type='primary'
							icon={<PlusOutlined />}
							className={styles.doctorManageSaveBtn}
							onClick={handleSaveMarkdown}>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
