import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Button,
	Image,
	message,
	Popconfirm,
	Space,
	Table,
	Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import { userService } from "../../../services";
import { LanguageUtils } from "../../../utils";
import ModalClinic from "./ModalClinic";
import styles from "./ClinicManage.module.scss";
import "react-markdown-editor-lite/lib/index.css";

function ClinicManage({ language }) {
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isModeEdit, setIsModeEdit] = useState(false);
	const [dataTable, setDataTable] = useState([]);
	const [clinics, setClinics] = useState([]);
	const [clinicEdit, setClinicEdit] = useState([]);

	useEffect(() => {
		getClinics();
	}, []);

	const handleCloseModal = () => {
		setModalVisible(false);
		setIsModeEdit(false);
	};

	const handleCreateClinic = async (data) => {
		try {
			const response = await userService.createClinic(data);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.clinic-manage.create-success",
						language
					)
				);
				getClinics();
				handleCloseModal();
				return true;
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.clinic-manage.create-fail",
						language
					)
				);
				return false;
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	const getClinics = async () => {
		setLoading(true);
		const response = await userService.getClinics();
		if (response?.errorCode === 0) {
			const dataTable = (response.data || []).map((clinic) => {
				return {
					key: clinic.id,
					name: clinic.name,
					address: clinic.address,
					image: clinic.image?.url,
					info: clinic.descriptionHTML,
				};
			});
			setClinics(response.data);
			setDataTable(dataTable);
		}
		setLoading(false);
	};

	const handleOpenModalEdit = (id) => {
		const clinic = clinics.find((clinic) => clinic.id === id);
		setClinicEdit(clinic);
		setIsModeEdit(true);
		setModalVisible(true);
	};

	const handleEditClinic = async (data) => {
		try {
			const response = await userService.editClinic(data);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.clinic-manage.update-success",
						language
					)
				);
				getClinics();
				handleCloseModal();
				setIsModeEdit(false);
				return true;
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.clinic-manage.update-fail",
						language
					)
				);
				return false;
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	const handleDeleteClinic = async (id) => {
		try {
			const response = await userService.deleteClinic(id);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.clinic-manage.delete-success",
						language
					)
				);
				getClinics();
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.clinic-manage.delete-fail",
						language
					)
				);
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	const columns = [
		{
			title: <FormattedMessage id='system.clinic-manage.name' />,
			dataIndex: "name",
		},
		{
			title: <FormattedMessage id='system.clinic-manage.address' />,
			dataIndex: "address",
		},
		{
			title: <FormattedMessage id='system.clinic-manage.image' />,
			dataIndex: "image",
			render: (_, record) => {
				if (record.image) {
					return <Image width={80} src={record.image} />;
				} else return null;
			},
		},
		{
			title: <FormattedMessage id='system.clinic-manage.info' />,
			dataIndex: "info",
			render: (_, record) => (
				<div
					dangerouslySetInnerHTML={{ __html: record.info }}
					className={styles.tableInfo}
				/>
			),
		},
		{
			title: <FormattedMessage id='common.action' />,
			key: "action",
			render: (_, record) => (
				<Space size='small'>
					<Tooltip
						placement='bottom'
						title={<FormattedMessage id='common.edit' />}>
						<Button
							type='link'
							icon={<EditOutlined />}
							onClick={() => handleOpenModalEdit(record.key)}
						/>
					</Tooltip>
					<Popconfirm
						title={
							<FormattedMessage id='system.clinic-manage.sure-delete-clinic' />
						}
						onConfirm={() => handleDeleteClinic(record.key)}
						okText={<FormattedMessage id='common.yes' />}
						cancelText={<FormattedMessage id='common.no' />}>
						<Tooltip
							placement='bottom'
							title={<FormattedMessage id='common.delete' />}>
							<Button
								type='link'
								icon={<DeleteOutlined />}
								className={styles.btnDelete}
							/>
						</Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<div className='container'>
				<section className={styles.clinicManage}>
					<h1 className={clsx("text-center", styles.clinicManageTitle)}>
						<FormattedMessage id='system.clinic-manage.title' />
					</h1>
					<Button
						size='large'
						onClick={() => {
							setModalVisible(true);
						}}
						type='primary'
						icon={<PlusOutlined />}
						className={styles.btnAddClinic}>
						<FormattedMessage id='system.clinic-manage.add-clinic' />
					</Button>
					<div className='users-table mt-3'>
						<Table
							columns={columns}
							dataSource={dataTable}
							size='large'
							bordered
							loading={loading}
						/>
					</div>
				</section>
			</div>
			<ModalClinic
				isShow={isModalVisible}
				isEdit={isModeEdit}
				onClose={handleCloseModal}
				onCreate={handleCreateClinic}
				onEdit={handleEditClinic}
				clinicEdit={clinicEdit}
			/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
