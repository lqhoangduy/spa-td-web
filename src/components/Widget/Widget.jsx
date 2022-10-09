import "./Widget.scss";
import {
	UserOutlined,
	ShoppingCartOutlined,
	DollarCircleOutlined,
	WalletOutlined,
	UpOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const Widget = ({ type }) => {
	let data;

	// temporary amount of money
	const money = Math.floor(Math.random() * 1000000);
	const amount = Math.floor(Math.random() * 1000);
	const diff = Math.floor(Math.random() * 100);

	switch (type) {
		case "users":
			data = {
				title: <FormattedMessage id="dashboard.user-title"/>,
				isMoney: false,
				link:  <FormattedMessage id="dashboard.btn-user"/>,
				icon: (
					<div
						className='icon-wrap'
						style={{
							color: "crimson",
							backgroundColor: "rgba(255, 0, 0, 0.2)",
						}}>
						<UserOutlined />
					</div>
				),
			};
			break;
		case "orders":
			data = {
				title: <FormattedMessage id="dashboard.order-title"/>,
				isMoney: false,
				link: <FormattedMessage id="dashboard.btn-order"/>,
				icon: (
					<div
						className='icon-wrap'
						style={{
							color: "goldenrod",
							backgroundColor: "rgba(218, 65, 32, 0.2)",
						}}>
						<ShoppingCartOutlined />
					</div>
				),
			};
			break;
		case "earnings":
			data = {
				title: <FormattedMessage id="dashboard.earning-title"/>,
				isMoney: true,
				link: <FormattedMessage id="dashboard.btn-earning"/>,
				icon: (
					<div
						className='icon-wrap'
						style={{
							color: "green",
							backgroundColor: "rgba(0, 128, 0, 0.2)",
						}}>
						<DollarCircleOutlined />
					</div>
				),
			};
			break;
		case "balance":
			data = {
				title: <FormattedMessage id="dashboard.ballance-title"/>,
				isMoney: true,
				link: <FormattedMessage id="dashboard.btn-ballance"/>,
				icon: (
					<div
						className='icon-wrap'
						style={{
							color: "purple",
							backgroundColor: "rgba(128, 0, 128, 0.2)",
						}}>
						<WalletOutlined />
					</div>
				),
			};
			break;
		default:
			break;
	}

	return (
		<div className='widget'>
			<div className='left'>
				<span className='title'>{data.title}</span>
				<span className='counter'>
					{data.isMoney && "$"} {data.isMoney ? money: amount}
				</span>
				<span className='link'>{data.link}</span>
			</div>
			<div className='right'>
				<div className='percentage positive'>
					<UpOutlined className='icon-percentage' />
					{diff}%
				</div>
				{data.icon}
			</div>
		</div>
	);
};

export default Widget;
