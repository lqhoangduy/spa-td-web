import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Button, Divider } from "antd";
import { FormattedMessage } from "react-intl";
import { QuestionCircleOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import { languages } from "../../../utils/constant";
import * as actions from "../../../store/actions";

const Section = () => {
	return <section></section>;
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
