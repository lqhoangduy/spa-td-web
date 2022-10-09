import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "antd";
import Widget from "../../../components/Widget/Widget";
import Feature from "../../../components/Feature/Feature";
import Chart from "../../../components/Chart/Chart";

import styles from "./Dashboard.module.scss";

function DashBoard({ language }) {
	return (
		<div className='container'>
			<section className={styles.dashboard}>
				<h1 className={clsx("text-center", styles.dashboardTitle)}>
					<FormattedMessage id='dashboard.title' />
				</h1>
				<div className={styles.widgets}>
					<Row gutter={[16, 16]}>
						<Col xs={24} md={12} lg={6}>
							<Widget type='users' />
						</Col>
						<Col xs={24} md={12} lg={6}>
							<Widget type='orders' />
						</Col>
						<Col xs={24} md={12} lg={6}>
							<Widget type='earnings' />
						</Col>
						<Col xs={24} md={12} lg={6}>
							<Widget type='balance' />
						</Col>
					</Row>
				</div>
				<div className={styles.charts}>
					<Row gutter={[16, 16]}>
						<Col xs={24} md={10}>
							<Feature />
						</Col>
						<Col xs={24} md={14}>
							<Chart />
						</Col>
					</Row>
				</div>
			</section>
		</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
