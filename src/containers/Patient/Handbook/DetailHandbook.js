import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, message, Breadcrumb, Card } from "antd";
import { BulbOutlined, HomeOutlined } from "@ant-design/icons";
import { userService } from "../../../services";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";
import { LanguageUtils } from "../../../utils";

import styles from "./DetailHandbook.module.scss";
import { FormattedMessage } from "react-intl";
import NotFound from "../../../components/NotFound/NotFound";
import FreeText from "../../../components/FreeText/FreeText";

function DetailHandbook({ language }) {
	const { id } = useParams();
	const [handbook, setHandbook] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (window) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, []);
	useEffect(() => {
		loadHandbook();
	}, [id]);

	const loadHandbook = async () => {
		if (id) {
			setLoading(true);
			const result = await userService.getHandbook(id);

			if (result?.errorCode === 0) {
				setHandbook(result.data);
			} else {
				message.error(
					LanguageUtils.getMessageByKey("common.error-get-info-fail", language)
				);
			}
			setLoading(false);
		}
	};

	if (!handbook && !loading) {
		return <NotFound />;
	}

	return (
		<Spin spinning={loading}>
			<section className={styles.detailHandbook}>
				<Header />
				<div className='container'>
					<div className={styles.handbookWrap}>
						<Breadcrumb>
							<Breadcrumb.Item href='/home'>
								<HomeOutlined />
								<span>
									<FormattedMessage id='common.home' />
								</span>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								<BulbOutlined />
								<span>
									<FormattedMessage id='handbook.title' />
								</span>
							</Breadcrumb.Item>
						</Breadcrumb>
						<div className='mb-4'>
							<Card className={styles.infoSpecial}>
								<h1 className={styles.title}>{handbook?.title}</h1>
								<div
									className={styles.infoSpecialBackground}
									style={{
										backgroundImage: `url(${handbook?.image?.url})`,
									}}
								/>
								<h1>{handbook?.name}</h1>
								<FreeText html={handbook?.descriptionHTML} />
							</Card>
						</div>
					</div>
				</div>
				<Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
