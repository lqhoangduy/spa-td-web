import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Button, Divider } from "antd";
import { FormattedMessage } from "react-intl";
import { QuestionCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import styles from "./Header.module.scss";
import { languages } from "../../../utils/constant";
import * as actions from "../../../store/actions";

const navbars = [
	{
		key: "specialist",
		title: <FormattedMessage id='header.specialist' />,
		note: <FormattedMessage id='header.specialist-note' />,
	},
	{
		key: "branch",
		title: <FormattedMessage id='header.branch' />,
		note: <FormattedMessage id='header.branch-note' />,
	},
	{
		key: "doctor",
		title: <FormattedMessage id='header.doctor' />,
		note: <FormattedMessage id='header.doctor-note' />,
	},
	{
		key: "package",
		title: <FormattedMessage id='header.package' />,
		note: <FormattedMessage id='header.package-note' />,
	},
];

const Header = ({ language, changeLanguage }) => {
	const history = useHistory();
	const [showDrawer, setShowDrawer] = useState(false);

	const handleChangeLang = (lang) => {
		changeLanguage(lang);
	};

	return (
		<>
			<section className={`${styles.header} shadow-primary`}>
				<div className={`container ${styles.headerWrap}`}>
					<div className={styles.leftContainer}>
						<div className={styles.logo} onClick={() => history.push("/home")}>
							Rejuvenate
						</div>
						<div className={styles.nav}>
							{navbars.map((nav) => {
								return (
									<div className={styles.navItem} key={nav.key}>
										<h4>{nav.title}</h4>
										<span>{nav.note}</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className={styles.rightContainer}>
						<div className={styles.help}>
							<QuestionCircleOutlined className={styles.icon} />
							<span className={styles.helpNote}>
								<FormattedMessage id='header.help' />
							</span>
						</div>
						<div className={styles.languageWrap}>
							<Button
								type='link'
								className={`${styles.langBtn} ${
									language === "vi" ? styles.active : ""
								}`}
								onClick={() => handleChangeLang(languages.VI)}>
								VI
							</Button>
							<Divider type='vertical' />
							<Button
								type='link'
								className={`${styles.langBtn} ${
									language === "en" ? styles.active : ""
								}`}
								onClick={() => handleChangeLang(languages.EN)}>
								EN
							</Button>
						</div>
						<Button
							type='link'
							onClick={() => setShowDrawer(true)}
							icon={<MenuOutlined />}
							className={styles.btnMenu}
						/>
					</div>
				</div>
			</section>
			<Drawer
				title='Basic Drawer'
				placement='right'
				onClose={() => setShowDrawer(false)}
				visible={showDrawer}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
