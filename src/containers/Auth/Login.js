import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Divider, Button, Form, Input, message } from "antd";
import { GooglePlusOutlined, FacebookOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import * as actions from "./../../store/actions";
import { userService } from "../../services";

import styles from "./Login.module.scss";

class Login extends Component {
	constructor(props) {
		super(props);
	}

	onLogin = async (values) => {
		try {
			const result = await userService.login(values);
			if (result?.errorCode !== 0) {
				message.error(result.message);
			}
			if (result?.errorCode === 0) {
				const { userLoginSuccess } = this.props;
				userLoginSuccess(result.user);
				message.success(result.message);
			}
		} catch (error) {
			if (error.response && error.response.data) {
				message.error(error.response.data.message);
			}
		}
	};

	render() {
		return (
			<div className={styles.loginWrapper}>
				<div className='login-container shadow-primary'>
					<div className='login-content row'>
						<div className='col-12 login-title'>
							<FormattedMessage id='login.login' />
						</div>
						<Form
							name='login'
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
							initialValues={this.state}
							onFinish={this.onLogin}>
							<label className='login-label'>
								<FormattedMessage id='login.email' />
							</label>
							<Form.Item
								name='email'
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='login.email_error_required' />
										),
									},
									{
										type: "email",
										message: <FormattedMessage id='login.email_error_valid' />,
									},
								]}>
								<Input size='large' />
							</Form.Item>

							<label className='login-label'>
								<FormattedMessage id='login.password' />
							</label>
							<Form.Item
								name='password'
								rules={[
									{
										required: true,
										message: (
											<FormattedMessage id='login.password_error_required' />
										),
									},
								]}>
								<Input.Password size='large' />
							</Form.Item>
							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									className='login-btn'
									size='large'>
									<FormattedMessage id='login.login' />
								</Button>
								<span className='forgot-password'>
									<FormattedMessage id='login.forgot_password' />
								</span>
							</Form.Item>
							<Divider>
								<FormattedMessage id='common.or' />
							</Divider>
							<div className='col-12 login-social'>
								<Button
									className='btn-social'
									shape='circle'
									size='large'
									icon={<GooglePlusOutlined />}
								/>
								<Button
									className='btn-social'
									shape='circle'
									size='large'
									icon={<FacebookOutlined />}
								/>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		// userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
