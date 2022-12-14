import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import HomePage from "../containers/HomePage/HomePage";
import NotFound from "../components/NotFound/NotFound";

import {
	userIsAuthenticated,
	userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import AdminLayout from "./AdminLayout/AdminLayout";

import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import VerifyBooking from "../components/VerifyBooking/VerifyBooking";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import ListClinic from "./Patient/Clinic/ListClinic";
import ListSpecialty from "./Patient/Specialty/ListSpecialty";
import ListDoctor from "./Patient/Doctor/ListDoctor";
import ListHandbook from "./Patient/Handbook/ListHandbook";
import DetailHandbook from "./Patient/Handbook/DetailHandbook";

const MapLayout = ({ isLoggedIn, children }) => {
	return isLoggedIn ? <AdminLayout>{children}</AdminLayout> : <>{children}</>;
};

class App extends Component {
	handlePersistorState = () => {
		const { persistor } = this.props;
		let { bootstrapped } = persistor.getState();
		if (bootstrapped) {
			if (this.props.onBeforeLift) {
				Promise.resolve(this.props.onBeforeLift())
					.then(() => this.setState({ bootstrapped: true }))
					.catch(() => this.setState({ bootstrapped: true }));
			} else {
				this.setState({ bootstrapped: true });
			}
		}
	};

	componentDidMount() {
		this.handlePersistorState();
	}

	render() {
		return (
			<Fragment>
				<Router history={history}>
					<div className='main-container'>
						<MapLayout isLoggedIn={this.props.isLoggedIn}>
							<div className='content-container'>
								<Switch>
									<Route path={path.HOME} exact component={Home} />
									<Route
										path={path.LOGIN}
										component={userIsNotAuthenticated(Login)}
									/>
									<Route
										path={path.SYSTEM}
										component={userIsAuthenticated(System)}
									/>
									<Route path={path.HOMEPAGE} component={HomePage} />
									<Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
									<Route path={path.DOCTOR} component={ListDoctor} />
									<Route
										path={path.DETAIL_SPECIALTY}
										component={DetailSpecialty}
									/>
									<Route path={path.SPECIALTY} component={ListSpecialty} />
									<Route path={path.DETAIL_CLINIC} component={DetailClinic} />
									<Route path={path.CLINIC} component={ListClinic} />
									<Route
										path={path.HANDBOOK_DETAIL}
										component={DetailHandbook}
									/>
									<Route path={path.HANDBOOK} component={ListHandbook} />
									<Route path={path.VERIFY_BOOKING} component={VerifyBooking} />
									<Route path='*' component={NotFound} />
								</Switch>
							</div>
						</MapLayout>
					</div>
				</Router>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		started: state.app.started,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
