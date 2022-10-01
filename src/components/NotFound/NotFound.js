import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import styles from "./NotFound.module.scss";
import { FormattedMessage } from "react-intl";

function NotFound() {
	const history = useHistory();

	return (
		<section className={styles.notFound}>
			<img src='/images/404.png' alt='404' />
			<span className={styles.description}>
				<FormattedMessage id='common.404' />
			</span>
			<Button
				onClick={() => history.push("/home")}
				size='large'
				className={styles.button}>
				<FormattedMessage id='common.backHome' />
			</Button>
		</section>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
