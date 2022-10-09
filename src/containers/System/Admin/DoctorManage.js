import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Button, Col, Input, message, Row, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import styles from "./DoctorManage.module.scss";
import "react-markdown-editor-lite/lib/index.css";
import clsx from "clsx";
import * as actions from "../../../store/actions";
import { languages, LanguageUtils } from "../../../utils";

import { userService, markdownService } from "../../../services";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const { TextArea } = Input;
const { Option } = Select;

function DoctorManage({
	language,
	prices,
	isLoadingPrice,
	payments,
	isLoadingPayment,
	provinces,
	isLoadingProvince,
	getPriceStart,
	getPaymentStart,
	getProvinceStart,
}) {
	const [contentMarkdown, setContentMarkdown] = useState("");
	const [contentHtml, setContentHtml] = useState("");
	const [description, setDescription] = useState("");
	const [currentDoctorId, setCurrentDoctorId] = useState(null);
	const [doctors, setDoctors] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadData();
		getPriceStart();
		getPaymentStart();
		getProvinceStart();

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
				message.error(
					LanguageUtils.getMessageByKey("common.error-get-info-fail", language)
				);
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
			message.error(
				LanguageUtils.getMessageByKey("common.error-missing-param", language)
			);
		} else {
			setLoading(true);
			const result = await markdownService.saveInfoDoctor(body);
			setLoading(false);
			if (result?.errorCode === 0) {
				message.success(result?.message);
			} else {
				message.error(
					result?.message ??
						LanguageUtils.getMessageByKey("common.error-update", language)
				);
			}
		}
	};

	const handleChangeDoctor = (id) => {
		setCurrentDoctorId(id);
	};

	const enableSubmit = useMemo(() => {
		return currentDoctorId && contentHtml && contentMarkdown;
	}, [contentHtml, contentMarkdown, currentDoctorId]);

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
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>Chọn giá</label>
									<Select size='large' loading={isLoadingPrice}>
										{prices?.length &&
											prices.map((gender) => (
												<Option value={gender.keyMap} key={gender.keyMap}>
													{language === languages.VI
														? gender.valueVi
														: gender.valueEn}
												</Option>
											))}
									</Select>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>Chọn phương thức thanh toán</label>
									<Select size='large' loading={isLoadingPayment}>
										{payments?.length &&
											payments.map((gender) => (
												<Option value={gender.keyMap} key={gender.keyMap}>
													{language === languages.VI
														? gender.valueVi
														: gender.valueEn}
												</Option>
											))}
									</Select>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>Chọn tỉnh thành</label>
									<Select size='large' loading={isLoadingProvince}>
										{provinces?.length &&
											provinces.map((gender) => (
												<Option value={gender.keyMap} key={gender.keyMap}>
													{language === languages.VI
														? gender.valueVi
														: gender.valueEn}
												</Option>
											))}
									</Select>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>Tên cơ sở</label>
									<Input size='large' />
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>Địa chỉ cơ sở</label>
									<Input size='large' />
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>Ghi chú</label>
									<Input size='large' />
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
							onClick={handleSaveMarkdown}
							disabled={!enableSubmit}>
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
		prices: state.admin.prices,
		isLoadingPrice: state.admin.isLoadingPrice,
		payments: state.admin.payments,
		isLoadingPayment: state.admin.isLoadingPayment,
		provinces: state.admin.provinces,
		isLoadingProvince: state.admin.isLoadingProvince,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPriceStart: () => dispatch(actions.fetchPriceStart()),
		getPaymentStart: () => dispatch(actions.fetchPaymentStart()),
		getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
