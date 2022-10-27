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
	const [description, setDescription] = useState(null);
	const [priceId, setPriceId] = useState(null);
	const [provinceId, setProvinceId] = useState(null);
	const [paymentId, setPaymentId] = useState(null);
	const [addressClinic, setAddressClinic] = useState(null);
	const [nameClinic, setNameClinic] = useState(null);
	const [note, setNote] = useState(null);
	const [currentDoctorId, setCurrentDoctorId] = useState(null);
	const [doctors, setDoctors] = useState(null);
	const [loading, setLoading] = useState(false);
	const [specialties, setSpecialties] = useState(null);
	const [currentSpecialty, setCurrentSpecialty] = useState(null);
	const [clinics, setClinics] = useState(null);
	const [currentClinic, setCurrentClinic] = useState(null);

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

		const resultSpecialty = await userService.getSpecialties();
		if (resultSpecialty.errorCode === 0) {
			setSpecialties(resultSpecialty.data);
		}

		// const resultClinic = await userService.getClinics();
		// if (resultClinic.errorCode === 0) {
		// 	setClinics(resultClinic.data);
		// }
		setLoading(false);
	};

	const loadInfoDoctor = async () => {
		if (currentDoctorId) {
			setLoading(true);
			const result = await markdownService.getInfoDoctor(currentDoctorId);

			if (result?.errorCode === 0) {
				setContentMarkdown(result?.data?.contentMarkdown ?? "");
				setContentHtml(result?.data?.contentHTML ?? "");
				setDescription(result?.data?.description ?? null);
				setPriceId(result?.data?.priceId ?? null);
				setProvinceId(result?.data?.provinceId ?? null);
				setPaymentId(result?.data?.paymentId ?? null);
				setAddressClinic(result?.data?.addressClinic ?? null);
				setNameClinic(result?.data?.nameClinic ?? null);
				setNote(result?.data?.note ?? null);
				setCurrentSpecialty(result?.data?.specialtyId ?? null);
				setCurrentClinic(result?.data?.clinicId ?? null);
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
			priceId: priceId,
			provinceId: provinceId,
			paymentId: paymentId,
			addressClinic: addressClinic,
			nameClinic: nameClinic,
			note: note,
			specialtyId: currentSpecialty,
			clinicId: currentClinic,
		};

		if (
			!body.contentHTML ||
			!body.contentMarkdown ||
			!body.doctorId ||
			!body.priceId ||
			!body.provinceId ||
			!body.paymentId ||
			!body.addressClinic ||
			!body.nameClinic
		) {
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

	const handleChangeSpecialty = (id) => {
		setCurrentSpecialty(id);
	};

	const handleChangeClinic = (id) => {
		setCurrentClinic(id);
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
											setDescription(e.target.value);
										}}
									/>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>
										<FormattedMessage id='system.doctor-manage.price' />
									</label>
									<Select
										size='large'
										loading={isLoadingPrice}
										value={priceId}
										onChange={(id) => {
											setPriceId(id);
										}}>
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
									<label>
										<FormattedMessage id='system.doctor-manage.payment' />
									</label>
									<Select
										size='large'
										loading={isLoadingPayment}
										value={paymentId}
										onChange={(id) => {
											setPaymentId(id);
										}}>
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
									<label>
										<FormattedMessage id='system.doctor-manage.province' />
									</label>
									<Select
										size='large'
										loading={isLoadingProvince}
										value={provinceId}
										onChange={(id) => {
											setProvinceId(id);
										}}>
										{provinces?.length &&
											provinces.map((province) => (
												<Option value={province.keyMap} key={province.keyMap}>
													{language === languages.VI
														? province.valueVi
														: province.valueEn}
												</Option>
											))}
									</Select>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>
										<FormattedMessage id='system.doctor-manage.branch-name' />
									</label>
									<Input
										size='large'
										value={nameClinic}
										onChange={(e) => {
											setNameClinic(e.target.value);
										}}
									/>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>
										<FormattedMessage id='system.doctor-manage.branch-address' />
									</label>
									<Input
										size='large'
										value={addressClinic}
										onChange={(e) => {
											setAddressClinic(e.target.value);
										}}
									/>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.introInfo}>
									<label>
										<FormattedMessage id='system.doctor-manage.note' />
									</label>
									<Input
										size='large'
										value={note}
										onChange={(e) => {
											setNote(e.target.value);
										}}
									/>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.chooseDoctor}>
									<label>
										<FormattedMessage id='system.doctor-manage.specialty' />
									</label>
									<Select
										size='large'
										value={currentSpecialty}
										onChange={handleChangeSpecialty}>
										{specialties?.length &&
											specialties.map((specialty) => (
												<Option value={specialty.id} key={specialty.id}>
													{specialty.name}
												</Option>
											))}
									</Select>
								</div>
							</Col>
							<Col xs={24} md={8}>
								<div className={styles.chooseDoctor}>
									<label>
										<FormattedMessage id='system.doctor-manage.clinic' />
									</label>
									<Select
										size='large'
										value={currentClinic}
										onChange={handleChangeClinic}>
										{clinics?.length &&
											clinics.map((clinic) => (
												<Option value={clinic.id} key={clinic.id}>
													{clinic.name}
												</Option>
											))}
									</Select>
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
