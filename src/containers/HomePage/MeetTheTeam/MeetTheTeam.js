import React from "react";
import { FormattedMessage } from "react-intl";
import { Card, Row, Col } from "antd";
import styles from "./MeetTheTeam.module.scss";

const staffs = [
	{
		key: 1,
		image: "/images/team-1.jpeg",
		name: "Violet Krasinski",
		position: <FormattedMessage id='homepage.physiotherapist' />,
	},
	{
		key: 2,
		image: "/images/team-2.jpeg",
		name: "Bella Almost",
		position: <FormattedMessage id='homepage.chief-masseuse' />,
	},
	{
		key: 3,
		image: "/images/team-3.jpeg",
		name: "Rita Parker",
		position: <FormattedMessage id='homepage.manager' />,
	},
	{
		key: 4,
		image: "/images/team-4.jpeg",
		name: "Esme Shield",
		position: <FormattedMessage id='homepage.cosmetologist' />,
	},
];

function MeetTheTeam() {
	const { Meta } = Card;
	return (
		<section className='container'>
			<div className={styles.teamWrap}>
				<h4 className={styles.teamTitle}>
					<FormattedMessage id='homepage.meet-the-team' />
				</h4>
				<Row gutter={[16, 16]} className={styles.teamList}>
					{staffs.map((staff) => {
						return (
							<Col
								key={staff.key}
								xs={24}
								sm={12}
								lg={6}
								className={styles.teamItem}>
								<Card
									cover={<img alt='staff' src={staff.image} />}
									className={styles.staff}>
									<Meta title={staff.name} description={staff.position} />
								</Card>
							</Col>
						);
					})}
				</Row>
			</div>
		</section>
	);
}

export default MeetTheTeam;
