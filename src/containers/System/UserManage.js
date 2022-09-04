import { Table, Space, Button, Tooltip, message, Popconfirm } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { userService } from "../../services";
import ModalUser from "./ModalUser";
import styles from "./UserManage.module.scss";
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
			} else {
				message.error(response.message);
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
			} else {
				message.error(response.message);
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	handleDeleteUser = async (id) => {
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
		console.log(user);
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
		const columns = [
			{
				title: "Email",
				dataIndex: "email",
			},
			{
				title: "First name",
				dataIndex: "firstName",
			},
			{
				title: "Last name",
				dataIndex: "lastName",
			},
			{
				title: "Address",
				dataIndex: "address",
			},
			{
				title: "Action",
				key: "action",
				render: (_, record) => (
					<Space size='small'>
						<Tooltip placement='bottom' title='Edit'>
							<Button
								type='link'
								icon={<EditOutlined />}
								onClick={() => this.handleOpenModalEdit(record.key)}
							/>
						</Tooltip>
						<Popconfirm
							title='Are you sure to delete this user?'
							onConfirm={() => this.handleDeleteUser(record.key)}
							okText='Yes'
							cancelText='No'>
							<Tooltip placement='bottom' title='Delete'>
								<Button
									type='link'
									icon={<DeleteOutlined />}
									className='btn-delete'
								/>
							</Tooltip>
						</Popconfirm>
					</Space>
				),
			},
		];

		return (
			<>
				<div className={`${styles.userContainer} container`}>
					<div className='title text-center'>Manage User</div>
					<Button
						onClick={() => {
							this.setState({
								isModalVisible: true,
							});
						}}
						type='primary'
						icon={<PlusOutlined />}
						className='btn-add-user'>
						Add a user
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
