import { Table, Space, Button, Tooltip, message, Popconfirm } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { userService } from "../../../services";
import ModalUser from "./ModalUser";
import { clsx } from "clsx";
import styles from "./UserManage.module.scss";
import * as actions from "../../../store/actions";
class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			usersTable: [],
			isModalVisible: false,
			isModeEdit: false,
			userEdit: null,
		};
	}

	async componentDidMount() {
		this.props.getGenderStart();
		this.props.getRoleStart();
		this.props.getPositionStart();
		await this.getAllUsers();
	}

	getAllUsers = async () => {
		const response = await userService.getAllUsers("ALL");
		if (response?.errorCode === 0) {
			const dataTable = (response.users || []).map((user) => {
				return {
					key: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					address: user.address,
				};
			});
			this.setState({
				users: response.users,
				usersTable: dataTable,
			});
		}
	};

	handleCreateUser = async (user) => {
		try {
			const response = await userService.createUser(user);
			if (response?.errorCode === 0) {
				message.success(response.message);
				this.getAllUsers();
				this.handleCloseModal();
				return true;
			} else {
				message.error(response.message);
				return false;
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	handleEditUser = async (user) => {
		try {
			user.id = this.state.userEdit.id;
			const response = await userService.editUser(user);
			if (response?.errorCode === 0) {
				message.success(response.message);
				this.getAllUsers();
				this.handleCloseModal();
				return true;
			} else {
				message.error(response.message);
				return false;
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	handleDeleteUser = async (id, email) => {
		if (email === this.props.currentUser.email) {
			message.error("Deleted user fail!");
			return;
		}
		try {
			const response = await userService.deleteUser(id);
			if (response?.errorCode === 0) {
				message.success(response.message);
				this.getAllUsers();
			} else {
				message.error(response.message);
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	handleOpenModalEdit = (id) => {
		const user = this.state.users.find((user) => user.id === id);
		this.setState({
			userEdit: user,
			isModeEdit: true,
			isModalVisible: true,
		});
	};

	handleCloseModal = () => {
		this.setState({
			isModalVisible: false,
			isModeEdit: false,
			userEdit: null,
		});
	};

	render() {
		const { currentUser } = this.props;

		const columns = [
			{
				title: <FormattedMessage id='system.user-manage.email' />,
				dataIndex: "email",
			},
			{
				title: <FormattedMessage id='system.user-manage.first-name' />,
				dataIndex: "firstName",
			},
			{
				title: <FormattedMessage id='system.user-manage.last-name' />,
				dataIndex: "lastName",
			},
			{
				title: <FormattedMessage id='system.user-manage.address' />,
				dataIndex: "address",
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
								onClick={() => this.handleOpenModalEdit(record.key)}
							/>
						</Tooltip>
						{record.email !== currentUser?.email ? (
							<Popconfirm
								title={
									<FormattedMessage id='system.user-manage.sure-delete-user' />
								}
								onConfirm={() =>
									this.handleDeleteUser(record.key, record.email)
								}
								okText={<FormattedMessage id='common.yes' />}
								cancelText={<FormattedMessage id='common.no' />}>
								<Tooltip
									placement='bottom'
									title={<FormattedMessage id='common.delete' />}>
									<Button
										type='link'
										icon={<DeleteOutlined />}
										className='btn-delete'
									/>
								</Tooltip>
							</Popconfirm>
						) : (
							<div className='current-user'>
								<SmileOutlined />
							</div>
						)}
					</Space>
				),
			},
		];

		return (
			<>
				<div className={clsx("container", styles.userContainer)}>
					<h1 className={clsx("title text-center", styles.userManageTitle)}>
						<FormattedMessage id='menu.system.system-administrator.user-manage' />
					</h1>
					<Button
						onClick={() => {
							this.setState({
								isModalVisible: true,
							});
						}}
						type='primary'
						icon={<PlusOutlined />}
						className='btn-add-user'>
						<FormattedMessage id='system.user-manage.add-user' />
					</Button>
					<div className='users-table mt-3'>
						<Table
							columns={columns}
							dataSource={this.state.usersTable}
							size='middle'
							bordered
						/>
					</div>
				</div>
				<ModalUser
					isShow={this.state.isModalVisible}
					isEdit={this.state.isModeEdit}
					userEdit={this.state.userEdit}
					onClose={this.handleCloseModal}
					onCreateUser={this.handleCreateUser}
					onEditUser={this.handleEditUser}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
		getRoleStart: () => dispatch(actions.fetchRoleStart()),
		getPositionStart: () => dispatch(actions.fetchPositionStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
