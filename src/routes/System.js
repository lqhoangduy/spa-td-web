import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/User/UserManage";
import ScheduleManage from "../containers/System/Doctor/ScheduleManage";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import { userIsAdmin, userIsAdminOrDoctor } from "../hoc/authentication";
import { USER_ROLE } from "../utils";
import Dashboard from "../containers/System/Admin/Dashboard";
import SpecialtyManage from "../containers/System/Specialty/SpecialtyManage";
import ClinicManage from "../containers/System/Clinic/ClinicManage";

function System({ currentUser }) {
	const systemPath = useMemo(() => {
		switch (currentUser?.roleId) {
			case USER_ROLE.ADMIN: {
				return "/system/user-manage";
			}
			case USER_ROLE.DOCTOR: {
				return "/system/schedule-manage";
			}
			case USER_ROLE.PATIENT:
			default:
				return "/home";
		}
	}, [currentUser]);

	return (
		<div className='system-container'>
			<div className='system-list'>
				<Switch>
					<Route path='/system/dashboard' component={userIsAdmin(Dashboard)} />
					<Route
						path='/system/user-manage'
						component={userIsAdmin(UserManage)}
					/>
					<Route
						path='/system/doctor-manage'
						component={userIsAdminOrDoctor(DoctorManage)}
					/>
					<Route
						path='/system/schedule-manage'
						component={userIsAdminOrDoctor(ScheduleManage)}
					/>
					<Route
						path='/system/specialty-manage'
						component={userIsAdminOrDoctor(SpecialtyManage)}
					/>
					<Route
						path='/system/clinic-manage'
						component={userIsAdminOrDoctor(ClinicManage)}
					/>

					{systemPath && (
						<Route
							component={() => {
								return <Redirect to={systemPath} />;
							}}
						/>
					)}
				</Switch>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
