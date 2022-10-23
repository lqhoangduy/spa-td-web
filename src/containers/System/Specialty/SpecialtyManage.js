import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Button,
	Image,
	message,
	Popconfirm,
	Space,
	Spin,
	Table,
	Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import styles from "./SpecialtyManage.module.scss";
import "react-markdown-editor-lite/lib/index.css";
import clsx from "clsx";

import { userService } from "../../../services";
import ModalSpecialty from "./ModalSpecialty";
import { LanguageUtils } from "../../../utils";

function SpecialtyManage({ language }) {
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isModeEdit, setIsModeEdit] = useState(false);
	const [dataTable, setDataTable] = useState([]);
	const [specialties, setSpecialties] = useState([]);
	const [specialtyEdit, setSpecialtyEdit] = useState([]);

	useEffect(() => {
		getSpecialties();
	}, []);

	const handleCloseModal = () => {
		setModalVisible(false);
		setIsModeEdit(false);
	};

	const handleCreateSpecialty = async (data) => {
		try {
			const response = await userService.createSpecialty(data);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.specialty-manage.create-success",
						language
					)
				);
				getSpecialties();
				handleCloseModal();
				return true;
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.specialty-manage.create-fail",
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

	const getSpecialties = async () => {
		setLoading(true);
		const response = await userService.getSpecialties();
		if (response?.errorCode === 0) {
			const dataTable = (response.data || []).map((specialty) => {
				return {
					key: specialty.id,
					name: specialty.name,
					image: specialty.image?.url,
					info: specialty.descriptionHTML,
				};
			});
			setSpecialties(response.data);
			setDataTable(dataTable);
		}
		setLoading(false);
	};

	const handleOpenModalEdit = (id) => {
		const specialty = specialties.find((specialty) => specialty.id === id);
		setSpecialtyEdit(specialty);
		setIsModeEdit(true);
		setModalVisible(true);
	};

	const handleEditSpecialty = async (data) => {
		try {
			const response = await userService.editSpecialty(data);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.specialty-manage.update-success",
						language
					)
				);
				getSpecialties();
				handleCloseModal();
				setIsModeEdit(false);
				return true;
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.specialty-manage.update-fail",
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

	const handleDeleteSpecialty = async (id) => {
		try {
			const response = await userService.deleteSpecialty(id);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.specialty-manage.delete-success",
						language
					)
				);
				getSpecialties();
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.specialty-manage.delete-fail",
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
			title: <FormattedMessage id='system.specialty-manage.name' />,
			dataIndex: "name",
		},
		{
			title: <FormattedMessage id='system.specialty-manage.image' />,
			dataIndex: "image",
			render: (_, record) => {
				if (record.image) {
					return <Image width={80} src={record.image} />;
				} else return null;
			},
		},
		{
			title: <FormattedMessage id='system.specialty-manage.info' />,
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
							<FormattedMessage id='system.specialty-manage.sure-delete-specialty' />
						}
						onConfirm={() => handleDeleteSpecialty(record.key)}
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
				<section className={styles.specialtyManage}>
					<h1 className={clsx("text-center", styles.specialtyManageTitle)}>
						<FormattedMessage id='system.specialty-manage.title' />
					</h1>
					<Button
						size='large'
						onClick={() => {
							setModalVisible(true);
						}}
						type='primary'
						icon={<PlusOutlined />}
						className={styles.btnAddSpecialty}>
						<FormattedMessage id='system.specialty-manage.add-specialty' />
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
			<ModalSpecialty
				isShow={isModalVisible}
				isEdit={isModeEdit}
				onClose={handleCloseModal}
				onCreate={handleCreateSpecialty}
				onEdit={handleEditSpecialty}
				specialtyEdit={specialtyEdit}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
