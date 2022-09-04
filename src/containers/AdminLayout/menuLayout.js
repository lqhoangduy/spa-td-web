import {
	DesktopOutlined,
	UserOutlined,
	TeamOutlined,
	FileOutlined,
	LogoutOutlined,
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
	getItem(
		<FormattedMessage id='menu.system.system-administrator.header' />,
		"1",
		<DesktopOutlined />,
		[
			getItem(
				<Link to='/system/user-manage'>
					<FormattedMessage id='menu.system.system-administrator.user-manage' />
				</Link>,
				"user-manage",
				<UserOutlined />
			),
			getItem(
				<Link to='/system/product-manage'>
					<FormattedMessage id='menu.system.system-administrator.product-manage' />
				</Link>,
				"product-manage",
				<TeamOutlined />
			),
			getItem(
				<Link to='/system/register-package-group-or-account'>
					<FormattedMessage id='menu.system.system-administrator.register-package-group-or-account' />
				</Link>,
				"register-package-group-or-account",
				<FileOutlined />
			),
		]
	),
	getItem(
		<FormattedMessage id='common.logout' />,
		"logout",
		<LogoutOutlined />
	),
];
