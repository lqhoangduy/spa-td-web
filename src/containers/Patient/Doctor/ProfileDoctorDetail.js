import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React, { useMemo } from "react";
import { connect } from "react-redux";
import LikeAndShare from "../../../components/SocialPlugin/LikeAndShare";
import { languages } from "../../../utils";
import styles from "./ProfileDoctor.module.scss";

function ProfileDoctorDetail({ language, doctor, isSecondStyle = false }) {
	const nameVi = useMemo(() => {
		if (!doctor) return "";
		return `${doctor?.positionData?.valueVi} - ${doctor?.lastName} ${doctor?.firstName}`;
	}, [doctor]);

	const nameEn = useMemo(() => {
		if (!doctor) return "";
		return `${doctor?.positionData?.valueEn} - ${doctor?.firstName} ${doctor?.lastName}`;
	}, [doctor]);

	const currentURL =
		+process.env.REACT_APP_IS_LOCALHOST === 1
			? "https://rejuvenate.vercel.app/"
			: window.location.href;

	return (
		<section className={styles.profileDoctor}>
			<Card bordered={!isSecondStyle}>
				<div className={styles.introDoctor}>
					<div className={styles.avatar}>
						<Avatar
							size={{
								xs: 80,
								sm: 100,
								md: 120,
								lg: 140,
								xl: 160,
								xxl: 180,
							}}
							src={doctor?.image?.url}
							icon={<UserOutlined />}
						/>
					</div>
					<div className={styles.introInformation}>
						<h4 className={styles.doctorName}>
							{language === languages.EN ? nameEn : nameVi}
						</h4>
						<span className={styles.doctorDescription}>
							{doctor?.Markdown?.description ?? ""}
						</span>
						<div className={styles.pluginLike}>
							<LikeAndShare dataHref={currentURL} />
						</div>
					</div>
				</div>
			</Card>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileDoctorDetail);
