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
import ModalHandbook from "./ModalHandbook";
import styles from "./HandbookManage.module.scss";
import "react-markdown-editor-lite/lib/index.css";

function HandbookManage({ language }) {
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isModeEdit, setIsModeEdit] = useState(false);
	const [dataTable, setDataTable] = useState([]);
	const [handbooks, setHandbooks] = useState([]);
	const [handbookEdit, setHandbookEdit] = useState([]);

	useEffect(() => {
		getHandbooks();
	}, []);

	const handleCloseModal = () => {
		setModalVisible(false);
		setIsModeEdit(false);
	};

	const handleCreateHandbook = async (data) => {
		try {
			const response = await userService.createHandbook(data);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.handbook-manage.create-success",
						language
					)
				);
				getHandbooks();
				handleCloseModal();
				return true;
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.handbook-manage.create-fail",
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

	const getHandbooks = async () => {
		setLoading(true);
		const response = await userService.getHandbooks();
		if (response?.errorCode === 0) {
			const dataTable = (response.data || []).map((handbook) => {
				return {
					key: handbook.id,
					title: handbook.title,
					image: handbook.image?.url,
					info: handbook.descriptionHTML,
				};
			});
			setHandbooks(response.data);
			setDataTable(dataTable);
		}
		setLoading(false);
	};

	const handleOpenModalEdit = (id) => {
		const handbook = handbooks.find((handbook) => handbook.id === id);
		setHandbookEdit(handbook);
		setIsModeEdit(true);
		setModalVisible(true);
	};

	const handleEditHandbook = async (data) => {
		try {
			const response = await userService.editHandbook(data);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.handbook-manage.update-success",
						language
					)
				);
				getHandbooks();
				handleCloseModal();
				setIsModeEdit(false);
				return true;
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.handbook-manage.update-fail",
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

	const handleDeleteHandbook = async (id) => {
		try {
			const response = await userService.deleteHandbook(id);
			if (response?.errorCode === 0) {
				message.success(
					LanguageUtils.getMessageByKey(
						"system.handbook-manage.delete-success",
						language
					)
				);
				getHandbooks();
			} else {
				message.error(
					LanguageUtils.getMessageByKey(
						"system.handbook-manage.delete-fail",
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
			title: <FormattedMessage id='system.handbook-manage.name' />,
			dataIndex: "title",
		},
		{
			title: <FormattedMessage id='system.handbook-manage.image' />,
			dataIndex: "image",
			render: (_, record) => {
				if (record.image) {
					return <Image width={80} src={record.image} />;
				} else return null;
			},
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
							<FormattedMessage id='system.handbook-manage.sure-delete-handbook' />
						}
						onConfirm={() => handleDeleteHandbook(record.key)}
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
				<section className={styles.handbookManage}>
					<h1 className={clsx("text-center", styles.handbookManageTitle)}>
						<FormattedMessage id='system.handbook-manage.title' />
					</h1>
					<Button
						size='large'
						onClick={() => {
							setModalVisible(true);
						}}
						type='primary'
						icon={<PlusOutlined />}
						className={styles.btnAdd}>
						<FormattedMessage id='system.handbook-manage.add-handbook' />
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
			<ModalHandbook
				isShow={isModalVisible}
				isEdit={isModeEdit}
				onClose={handleCloseModal}
				onCreate={handleCreateHandbook}
				onEdit={handleEditHandbook}
				handbookEdit={handbookEdit}
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

export default connect(mapStateToProps, mapDispatchToProps)(HandbookManage);
