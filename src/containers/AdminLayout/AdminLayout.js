import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import { Layout, Menu } from "antd";
import { menuAdmin, menuDoctor, menuPatient } from "./menuLayout";
import { USER_ROLE } from "../../utils/constant";
import styles from "./AdminLayout.module.scss";
import _ from "lodash";

const { Sider } = Layout;

class AdminLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			menu: null,
		};
	}

	handleClickMenu = (e) => {
		if (e.key === "logout") {
			this.props.processLogout();
		}
	};

	componentDidMount() {
		const { userInfo } = this.props;
		if (userInfo && !_.isEmpty(userInfo)) {
			const role = userInfo.roleId;
			switch (role) {
				case USER_ROLE.ADMIN:
					this.setState({
						menu: menuAdmin,
					});
					break;
				case USER_ROLE.DOCTOR:
					this.setState({
						menu: menuDoctor,
					});
					break;
				case USER_ROLE.PATIENT:
				default:
					this.setState({
						menu: menuPatient,
					});
					break;
			}
		}
	}

	render() {
		const { userInfo } = this.props;
		return (
			<Layout
				style={{
					minHeight: "100vh",
				}}
				className={styles.adminLayout}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={(value) => this.setState({ collapsed: value })}
					breakpoint='lg'>
					<div className={styles.logo}>
						<span>{userInfo?.firstName ? userInfo.firstName : ""}</span>
					</div>
					{this.state.menu && (
						<Menu
							onClick={this.handleClickMenu}
							theme='dark'
							mode='inline'
							items={this.state.menu}
						/>
					)}
				</Sider>
				<Layout className='site-layout'>{this.props.children}</Layout>
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		processLogout: () => dispatch(actions.processLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
