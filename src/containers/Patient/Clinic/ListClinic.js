import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./ListClinic.module.scss";
import Header from "../../HomePage/Header/Header";
import { Breadcrumb, Card, Col, Empty, Image, List, Row } from "antd";
import { BulbOutlined, HomeOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useState } from "react";
import { userService } from "../../../services";
import { Link } from "react-router-dom";
import FreeText from "../../../components/FreeText/FreeText";

function ListClinic() {
	const [loading, setLoading] = useState(false);
	const [clinics, setClinics] = useState([]);

	useEffect(() => {
		getClinics();
	}, []);

	const getClinics = async () => {
		setLoading(true);
		const response = await userService.getClinics();
		if (response?.errorCode === 0) {
			setClinics(response.data);
		}
		setLoading(false);
	};

	return (
		<section className={styles.listClinic}>
			<Header />
			<div className='container'>
				<div className={styles.listWrap}>
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
								<FormattedMessage id='clinic.list' />
							</span>
						</Breadcrumb.Item>
					</Breadcrumb>
					<div className='mb-4'>
						<List
							loading={loading}
							itemLayout='vertical'
							size='large'
							pagination={{
								pageSize: 10,
							}}
							dataSource={clinics}
							locale={{
								emptyText: (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description={<FormattedMessage id='clinic.empty-clinic' />}
									/>
								),
							}}
							renderItem={(item) => (
								<List.Item key={item.id} className={styles.newsItem}>
									<Link
										className={styles.link}
										key={item.id}
										to={`/clinic/${item.id}`}>
										<Card>
											<Row gutter={[16, 16]} align='start'>
												<Col xs={24} md={8} lg={6} xl={4}>
													<Image
														src={item?.image?.url}
														className={styles.image}
														preview={false}
													/>
												</Col>
												<Col xs={24} md={16} lg={18} xl={20}>
													<h2 className={styles.title}>{item.name}</h2>
													<FreeText
														className={styles.description}
														html={item?.descriptionHTML}
													/>
												</Col>
											</Row>
										</Card>
									</Link>
								</List.Item>
							)}
						/>
					</div>
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
