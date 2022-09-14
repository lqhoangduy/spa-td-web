import {
	FileSearchOutlined,
	UserOutlined,
	TeamOutlined,
	HomeOutlined,
	LogoutOutlined,
	CustomerServiceOutlined,
	BulbOutlined,
	SolutionOutlined,
	EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

export const itemsMenuLayout = [
	getItem(<FormattedMessage id='menu.admin.user' />, "user", <TeamOutlined />, [
		getItem(
			<Link to='/system/user-manage'>
				<FormattedMessage id='menu.admin.user-manage' />
			</Link>,
			"user-manage",
			<UserOutlined />
		),
		getItem(
			<Link to='/system/user-manage'>
				<FormattedMessage id='menu.admin.doctor-manage' />
			</Link>,
			"doctor-manage",
			<CustomerServiceOutlined />
		),
		getItem(
			<Link to='/system/admin-manage'>
				<FormattedMessage id='menu.admin.admin-manage' />
			</Link>,
			"admin-manage",
			<UserOutlined />
		),
		getItem(
			<Link to='/system/edit-user'>
				<FormattedMessage id='menu.admin.crud-user' />
			</Link>,
			"crud-user",
			<SolutionOutlined />
		),
		getItem(
			<Link to='/system/edit-redux'>
				<FormattedMessage id='menu.admin.crud-redux' />
			</Link>,
			"crud-redux",
			<EditOutlined />
		),
	]),
	getItem(
		<FormattedMessage id='menu.admin.clinic' />,
		"clinic",
		<HomeOutlined />,
		[
			getItem(
				<Link to='/system/clinic-manage'>
					<FormattedMessage id='menu.admin.clinic-manage' />
				</Link>,
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
				<Link to='/system/specialty-manage'>
					<FormattedMessage id='menu.admin.specialty-manage' />
				</Link>,
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
				<Link to='/system/handbook-manage'>
					<FormattedMessage id='menu.admin.handbook-manage' />
				</Link>,
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
