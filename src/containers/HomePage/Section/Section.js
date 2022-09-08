import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import styles from "./Section.module.scss";

const Section = () => {
	return (
		<>
			<section className={styles.sectionSpecialty}></section>
		</>
	);
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
