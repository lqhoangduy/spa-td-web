import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
	Spin,
	Avatar,
	Divider,
	List,
	Comment,
	message,
	Breadcrumb,
	Card,
} from "antd";
import { UserOutlined, CheckOutlined, HomeOutlined } from "@ant-design/icons";
import { userService } from "../../../services";
import Header from "../../HomePage/Header/Header";
import Footer from "../../HomePage/Footer/Footer";

import styles from "./DetailDoctor.module.scss";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import NotFound from "../../../components/NotFound/NotFound";

const fakeListComment = [
	{
		id: 1,
		author: "Nguyễn Thị Kiều Lê",
		avatar: "https://i.pravatar.cc/100?img=29",
		content: "Dich vụ rất tốt.",
		datetime: "05/08/2022",
	},
	{
		id: 2,
		author: "Nguyễn Hải Nam An",
		avatar: "https://i.pravatar.cc/100?img=48",
		content: "Hiện tại rất tốt.",
		datetime: "03/09/2022",
	},
	{
		id: 3,
		author: "Đặng Minh Anh",
		avatar: "https://i.pravatar.cc/100?img=3",
		content: "Bác sĩ rất ân cần và tận tình.",
		datetime: "12/02/2022",
	},
	{
		id: 4,
		author: "Nguyễn Phạm Thành Nam",
		avatar: "https://i.pravatar.cc/100?img=12",
		content: "Ok.",
		datetime: "02/12/2022",
	},
	{
		id: 5,
		author: "Lại Hải Đăng",
		avatar: "https://i.pravatar.cc/100?img=8",
		content:
			"Mình thấy không cần cải thiện gì nhé. App đặt thì tiện lợi, biết trước khoảng thời gian nào để vào khám. Mình đến sớm hơn lịch hẹn khoảng 10p rồi ngồi chờ một lúc là được vào. Bác sĩ nói chuyện hỏi thăm rất nhẹ nhàng. Trước đó mình có tự đi mua thuốc nhưng mụn nó càng to và nhiều hơn, mình lo quá, đọc thông tin thấy Bác nên đi khám ở đây. Uống thuốc và bôi theo đơn của Bác 1 2 ngày mình thấy đỡ hẳn. Giờ được khoảng 4 ngày thì mình khỏi rồi, chắc mai mình sẽ đi tái khám lại.",
		datetime: "10/08/2022",
	},
	{
		id: 6,
		author: "Trương Thị Lưu Ly",
		avatar: "https://i.pravatar.cc/100?img=38",
		content:
			"Mình đã thấy là rất tiện lợi rồi, có thể chọn giờ và bác sĩ khám, rất tốt.",
		datetime: "22/09/2022",
	},
	{
		id: 7,
		author: "Nguyễn Quế Chi",
		avatar: "https://i.pravatar.cc/100?img=32",
		content: "Mọi thứ đều Tốt và chu đáo.",
		datetime: "29/03/2022",
	},
];

function DetailDoctor({ language }) {
	const { id } = useParams();
	const [doctor, setDoctor] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (window) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, []);
	useEffect(() => {
		loadDoctor();
	}, [id]);

	const loadDoctor = async () => {
		if (id) {
			setLoading(true);
			const result = await userService.getDetailDoctor(id);

			if (result?.errorCode === 0) {
				setDoctor(result.data);
			} else {
				message.error("Get info fail!");
			}
			setLoading(false);
		}
	};

	const nameVi = useMemo(() => {
		return `${doctor?.positionData?.valueVi} - ${doctor?.lastName} ${doctor?.firstName}`;
	}, [doctor]);

	const nameEn = useMemo(() => {
		return `${doctor?.positionData?.valueEn} - ${doctor?.firstName} ${doctor?.lastName}`;
	}, [doctor]);

	if (!doctor && !loading) {
		return <NotFound />;
	}

	return (
		<Spin spinning={loading}>
			<section className={styles.detailDoctor}>
				<Header />
				<div className='container'>
					<Breadcrumb>
						<Breadcrumb.Item href='/home'>
							<HomeOutlined />
							<span>
								<FormattedMessage id='common.home' />
							</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<UserOutlined />
							<span>
								<FormattedMessage id='doctor.doctor-info' />
							</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className='container'>
					<Card>
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
									{language === "en" ? nameEn : nameVi}
								</h4>
								<span className={styles.doctorDescription}>
									{doctor?.Markdown?.description ?? ""}
								</span>
							</div>
						</div>
					</Card>
				</div>

				<div className='container'>
					<Divider />
				</div>

				<div className='container'>
					<div className={styles.scheduleDoctor}>
						<h4 className={styles.sectionTitle}>
							<FormattedMessage id='doctor.book-appointment' />
						</h4>
						<Card></Card>
					</div>
				</div>
				<div className='container'>
					<Divider />
				</div>

				<div className='container'>
					<div className={styles.detailInfoDoctor}>
						<h4 className={styles.sectionTitle}>
							<FormattedMessage id='doctor.detail-information' />
						</h4>
						<Card>
							<div
								dangerouslySetInnerHTML={{
									__html: doctor?.Markdown?.contentHTML ?? "",
								}}
							/>
						</Card>
					</div>
				</div>

				<div className='container'>
					<Divider />
				</div>

				<div className='container'>
					<div className={styles.commentDoctor}>
						<h4 className={styles.sectionTitle}>
							<FormattedMessage id='doctor.patient-feedback' />
						</h4>
						<Card>
							<List
								className='comment-list'
								itemLayout='horizontal'
								dataSource={fakeListComment}
								renderItem={(item) => (
									<li>
										<Comment
											actions={item.actions}
											author={item.author}
											avatar={item.avatar}
											content={item.content}
											datetime={
												<div className={styles.dateComment}>
													<CheckOutlined />
													<span className={styles.date}>
														<FormattedMessage id='doctor.date-of-visit' />
														{item.datetime}
													</span>
												</div>
											}
										/>
									</li>
								)}
							/>
						</Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
