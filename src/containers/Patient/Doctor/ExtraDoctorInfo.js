import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Divider, Button, Spin } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { Format, languages } from "../../../utils";
import styles from "./ExtraDoctorInfo.module.scss";
import { userService } from "../../../services";

function ExtraDoctorInfo({ language, id }) {
	const [expandedPrice, setExpandedPrice] = useState(false);
	const [doctorInfo, setDoctorInfo] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadDoctor();
	}, [id]);

	const loadDoctor = useCallback(async () => {
		setLoading(true);
		const result = await userService.getExtraInfoDoctor(id);
		if (result?.errorCode === 0) {
			setDoctorInfo(result?.data);
		}
		setLoading(false);
	}, [id]);

	return (
		<Spin spinning={loading}>
			<section className={styles.extraDoctorInfo}>
				<h3 className={styles.addressTitle}>
					<FormattedMessage id='doctor.address' />
				</h3>
				<span className={styles.nameClinic}>
					{doctorInfo?.nameClinic || "--"}
				</span>
				<span className={styles.addressClinic}>
					{doctorInfo?.addressClinic || "--"}
				</span>
				<Divider />
				<div className={styles.priceBlock}>
					<h3 className={styles.priceTitle}>
						<FormattedMessage id='doctor.price' />
					</h3>
					{!expandedPrice && (
						<>
							<span className={styles.price}>
								{doctorInfo
									? language === languages.EN
										? Format.currencyEN(doctorInfo?.priceData?.valueEn)
										: Format.currencyVI(doctorInfo?.priceData?.valueVi)
									: "--"}
							</span>
							<Button
								type='link'
								className={styles.btnViewPrice}
								onClick={() => setExpandedPrice(true)}>
								<FormattedMessage id='common.view-detail' />
							</Button>
						</>
					)}
				</div>
				{expandedPrice && (
					<>
						<div className={styles.expandedPrice} bordered={false}>
							<div className={styles.priceWrap}>
								<span className={styles.priceTitle}>
									<FormattedMessage id='doctor.price' />
								</span>
								<span className={styles.price}>
									{doctorInfo
										? language === languages.EN
											? Format.currencyEN(doctorInfo?.priceData?.valueEn)
											: Format.currencyVI(doctorInfo?.priceData?.valueVi)
										: "--"}
								</span>
							</div>
							<div className={styles.priceContent}>
								<FormattedMessage id='doctor.note' />
								{doctorInfo?.note || "--"}
							</div>
							<div className={styles.priceContent}>
								<FormattedMessage id='doctor.payment-note' />{" "}
								{doctorInfo
									? language === languages.EN
										? doctorInfo?.paymentData?.valueEn
										: doctorInfo?.paymentData?.valueVi
									: "--"}
							</div>
						</div>
						<div className={styles.btnWrap}>
							<Button
								icon={<UpOutlined />}
								type='link'
								className={styles.btnCollapse}
								onClick={() => setExpandedPrice(false)}>
								<FormattedMessage id='common.collapse' />
							</Button>
						</div>
					</>
				)}
			</section>
		</Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtraDoctorInfo);
