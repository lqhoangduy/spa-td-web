import React from "react";
import { connect } from "react-redux";
import Header from "./Header/Header";
import Slider from "./Slider/Slider";
import Category from "./Category/Category";
import MeetTheTeam from "./MeetTheTeam/MeetTheTeam";
import OurPartner from "./OurPartner/OurPartner";
import styles from "./HomePage.module.scss";

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<Header />
			<Slider />
			<Category />
			<MeetTheTeam />
			<OurPartner />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
