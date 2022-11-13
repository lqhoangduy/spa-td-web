import { FileSearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Empty, Image, List, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FreeText from "../../../components/FreeText/FreeText";
import { userService } from "../../../services";
import { Format } from "../../../utils";
import Header from "../../HomePage/Header/Header";
import styles from "./ListHandbook.module.scss";

function ListHandbook() {
	const [loading, setLoading] = useState(false);
	const [handbooks, setHandbooks] = useState([]);

	useEffect(() => {
		getClinics();
	}, []);

	const getClinics = async () => {
		setLoading(true);
		const response = await userService.getHandbooks();
		if (response?.errorCode === 0) {
			setHandbooks(response.data);
		}
		setLoading(false);
	};

	return (
		<section className={styles.listHandbook}>
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
							<FileSearchOutlined />
							<span>
								<FormattedMessage id='handbook.list' />
							</span>
						</Breadcrumb.Item>
					</Breadcrumb>
					<div className={styles.listWrap}>
						<List
							loading={loading}
							itemLayout='vertical'
							size='large'
							pagination={{
								pageSize: 10,
							}}
							dataSource={handbooks}
							locale={{
								emptyText: (
									<Empty
										image={Empty.PRESENTED_IMAGE_SIMPLE}
										description={<FormattedMessage id='handbook.empty' />}
									/>
								),
							}}
							renderItem={(item) => (
								<List.Item key={item.id} className={styles.newsItem}>
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
												<p className='date'>{Format.Date(item?.createdAt)}</p>
												<Link className='read-more' to={`/handbook/${item.id}`}>
													<h5 className='title'>{item?.title}</h5>
												</Link>
												<FreeText
													className='description'
													html={item?.descriptionHTML}
												/>
											</Col>
										</Row>
									</Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListHandbook);
