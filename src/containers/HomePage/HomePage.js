import React from "react";
import { connect } from "react-redux";
import Header from "./Header/Header";
import Slider from "./Slider/Slider";
import Category from "./Category/Category";
import Section from "./Section/Section";
import MeetTheTeam from "./MeetTheTeam/MeetTheTeam";
import OurPartner from "./OurPartner/OurPartner";
import Footer from "./Footer/Footer";
import styles from "./HomePage.module.scss";

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<Header />
			<Slider />
			<Category />
			<Section />
			<MeetTheTeam />
			<OurPartner />
			<Footer />
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
