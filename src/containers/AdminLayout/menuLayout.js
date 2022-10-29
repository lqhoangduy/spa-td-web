import {
	FileSearchOutlined,
	UserOutlined,
	TeamOutlined,
	HomeOutlined,
	LogoutOutlined,
	CustomerServiceOutlined,
	BulbOutlined,
	SolutionOutlined,
	CalendarOutlined,
	AreaChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

export const menuAdmin = [
	getItem(
		<Link to='/system/dashboard'>
			<FormattedMessage id='common.dashboard' />
		</Link>,
		"dashboard",
		<AreaChartOutlined />
	),
	getItem(
		<Link to='/home'>
			<FormattedMessage id='common.home' />
		</Link>,
		"home",
		<HomeOutlined />
	),
	getItem(<FormattedMessage id='menu.admin.user' />, "user", <TeamOutlined />, [
		getItem(
			<Tooltip
				placement='right'
				title={<FormattedMessage id='menu.admin.user-manage' />}>
				<Link to='/system/user-manage'>
					<FormattedMessage id='menu.admin.user-manage' />
				</Link>
			</Tooltip>,
			"user-manage",
			<SolutionOutlined />
		),
		getItem(
			<Tooltip
				placement='right'
				title={<FormattedMessage id='menu.admin.doctor-manage' />}>
				<Link to='/system/doctor-manage'>
					<FormattedMessage id='menu.admin.doctor-manage' />
				</Link>
			</Tooltip>,
			"doctor-manage",
			<CustomerServiceOutlined />
		),
		getItem(
			<Tooltip
				placement='right'
				title={<FormattedMessage id='menu.admin.admin-manage' />}>
				<Link to='/system/admin-manage'>
					<FormattedMessage id='menu.admin.admin-manage' />
				</Link>
			</Tooltip>,
			"admin-manage",
			<UserOutlined />
		),
		getItem(
			<Tooltip
				placement='right'
				title={<FormattedMessage id='menu.doctor.schedule-manage' />}>
				<Link to='/system/schedule-manage'>
					<FormattedMessage id='menu.doctor.schedule-manage' />
				</Link>
			</Tooltip>,
			"schedule-manage",
			<CalendarOutlined />
		),
	]),
	getItem(
		<FormattedMessage id='menu.admin.clinic' />,
		"clinic",
		<HomeOutlined />,
		[
			getItem(
				<Tooltip
					placement='right'
					title={<FormattedMessage id='menu.admin.clinic-manage' />}>
					<Link to='/system/clinic-manage'>
						<FormattedMessage id='menu.admin.clinic-manage' />
					</Link>
				</Tooltip>,
				"clinic-manage",
				<HomeOutlined />
			),
		]
	),
	getItem(
		<FormattedMessage id='menu.admin.specialty' />,
		"specialty",
		<BulbOutlined />,
		[
			getItem(
				<Tooltip
					placement='right'
					title={<FormattedMessage id='menu.admin.specialty-manage' />}>
					<Link to='/system/specialty-manage'>
						<FormattedMessage id='menu.admin.specialty-manage' />
					</Link>
				</Tooltip>,
				"specialty-manage",
				<BulbOutlined />
			),
		]
	),
	getItem(
		<FormattedMessage id='menu.admin.handbook' />,
		"handbook",
		<FileSearchOutlined />,
		[
			getItem(
				<Tooltip
					placement='right'
					title={<FormattedMessage id='menu.admin.handbook-manage' />}>
					<Link to='/system/handbook-manage'>
						<FormattedMessage id='menu.admin.handbook-manage' />
					</Link>
				</Tooltip>,
				"handbook-manage",
				<FileSearchOutlined />
			),
		]
	),
	getItem(
		<FormattedMessage id='common.logout' />,
		"logout",
		<LogoutOutlined />
	),
];

export const menuDoctor = [
	getItem(
		<Link to='/home'>
			<FormattedMessage id='common.home' />
		</Link>,
		"home",
		<HomeOutlined />
	),
	getItem(
		<Tooltip
			placement='right'
			title={<FormattedMessage id='menu.doctor.schedule-manage' />}>
			<Link to='/system/doctor/schedule-manage'>
				<FormattedMessage id='menu.doctor.schedule-manage' />
			</Link>
		</Tooltip>,
		"schedule-manage",
		<CalendarOutlined />
	),
	getItem(
		<Tooltip
			placement='right'
			title={<FormattedMessage id='menu.doctor.patient-manage' />}>
			<Link to='/system/doctor/patient-manage'>
				<FormattedMessage id='menu.doctor.patient-manage' />
			</Link>
		</Tooltip>,
		"patient-manage",
		<CalendarOutlined />
	),
	getItem(
		<FormattedMessage id='common.logout' />,
		"logout",
		<LogoutOutlined />
	),
];

export const menuPatient = [
	getItem(
		<FormattedMessage id='common.logout' />,
		"logout",
		<LogoutOutlined />
	),
];
