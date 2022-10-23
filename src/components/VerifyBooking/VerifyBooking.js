import { Button, Result, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import { userService } from "../../services";
import { LanguageUtils } from "../../utils";
import styles from "./VerifyBooking.module.scss";

const verifyBookingStatus = {
	loading: "loading",
	success: "success",
	warning: "warning",
	error: "error",
};

function VerifyBooking({ language }) {
	const history = useHistory();
	const query = useQuery();

	const id = query.get("id");
	const token = query.get("token");

	const [status, setStatus] = useState(verifyBookingStatus.loading);
	const [title, setTitle] = useState("");

	useEffect(() => {
		verifyBookingAppointment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (status === verifyBookingStatus.success) {
			setTitle(
				LanguageUtils.getMessageByKey("doctor.confirm-success", language)
			);
		} else if (status === verifyBookingStatus.error) {
			setTitle(
				LanguageUtils.getMessageByKey("doctor.confirm-out-of-date", language)
			);
		} else if (status === verifyBookingStatus.warning) {
			setTitle(
				LanguageUtils.getMessageByKey("doctor.confirm-not-found", language)
			);
		}
	}, [language, status]);

	const verifyBookingAppointment = async () => {
		if (id && token) {
			setStatus(verifyBookingStatus.loading);

			const data = {
				doctorId: id,
				token: token,
			};

			const result = await userService.verifyBookingAppointment(data);

			if (result?.errorCode === 0) {
				setStatus(verifyBookingStatus.success);
			} else {
				if (result?.message === "out_of_date") {
					setStatus(verifyBookingStatus.error);
				} else {
					setStatus(verifyBookingStatus.warning);
				}
			}
		}
	};

	return (
		<div className='container'>
			<section className={styles.verifyBooking}>
				{status === verifyBookingStatus.loading ? (
					<Spin />
				) : (
					<Result
						status={status}
						title={title}
						extra={[
							<Button
								onClick={() => history.push("/home")}
								size='large'
								className={styles.button}>
								<FormattedMessage id='common.backHome' />
							</Button>,
						]}
					/>
				)}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
