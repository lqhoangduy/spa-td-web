import "./Feature.scss";
import { MoreOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { FormattedMessage } from "react-intl";

const Feature = () => {
	return (
		<div className='feature'>
			<div className='top'>
				<h1 className='title'><FormattedMessage id="dashboard.total-revenue"/></h1>
				<MoreOutlined />
			</div>
			<div className='bottom'>
				<div className='featureChart'>
					<Progress type='circle' percent={75} />
				</div>
				<p className='title'><FormattedMessage id="dashboard.total-sales"/></p>
				<p className='amount'>$1,000,000</p>
				<p className='desc'>
        <FormattedMessage id="dashboard.total-sales-des"/>
				</p>
				<p className='summary'>
					<div className='item'>
						<div className='itemTitle'><FormattedMessage id="dashboard.target"/></div>
						<div className='itemResult negative'>
							<DownOutlined />
							<div className='resultAmount'>$10.4k</div>
						</div>
					</div>
					<div className='item'>
						<div className='itemTitle'><FormattedMessage id="dashboard.last-week"/></div>
						<div className='itemResult negative'>
							<DownOutlined />
							<div className='resultAmount'>$12.4k</div>
						</div>
					</div>
					<div className='item'>
						<div className='itemTitle'><FormattedMessage id="dashboard.last-month"/></div>
						<div className='itemResult positive'>
							<UpOutlined />
							<div className='resultAmount'>$22.2k</div>
						</div>
					</div>
				</p>
			</div>
		</div>
	);
};

export default Feature;
