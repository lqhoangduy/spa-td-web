import "./Chart.scss";
import {
	AreaChart,
	Area,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LanguageUtils } from "../../utils";



const Chart = ({ language }) => {
  const data = [
    { name: LanguageUtils.getMessageByKey("dashboard.january", language), total: 1200 },
    { name: LanguageUtils.getMessageByKey("dashboard.february", language), total: 3000 },
    { name: LanguageUtils.getMessageByKey("dashboard.march", language), total: 1002 },
    { name: LanguageUtils.getMessageByKey("dashboard.april", language), total: 900 },
    { name: LanguageUtils.getMessageByKey("dashboard.may", language), total: 500 },
    { name: LanguageUtils.getMessageByKey("dashboard.june", language), total: 3200 },
    { name: LanguageUtils.getMessageByKey("dashboard.july", language), total: 1200 },
  ];

	return (
		<div className='chart'>
			<div className='title'><FormattedMessage id="dashboard.chart-title"/></div>
			<ResponsiveContainer width='100%' aspect={2 / 1}>
				<AreaChart
					width={"100%"}
					height={250}
					data={data}
					margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey='name' />
					<CartesianGrid strokeDasharray='3 3' className='chartGrid' />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='total'
						stroke='#8884d8'
						fillOpacity={1}
						fill='url(#total)'
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
