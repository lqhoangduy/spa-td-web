import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import { Layout, Menu } from "antd";
import { itemsMenuLayout } from "./menuLayout";
import styles from "./AdminLayout.module.scss";

const { Sider } = Layout;

class AdminLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	handleClickMenu = (e) => {
		if (e.key === "logout") {
			this.props.processLogout();
		}
	};

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
					<Menu
						onClick={this.handleClickMenu}
						theme='dark'
						defaultSelectedKeys={["manage-user"]}
						defaultOpenKeys={["manage-user"]}
						mode='inline'
						items={itemsMenuLayout}
					/>
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
