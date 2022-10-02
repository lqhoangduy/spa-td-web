import actionTypes from "./actionTypes";
import { userService } from "../../services";

export const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_GENDER_START,
			});
			let response = await userService.getAllCode("GENDER");
			if (response && response.errorCode === 0) {
				dispatch(fetchGenderSuccess(response.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (error) {
			dispatch(fetchGenderFailed());
			console.error("fetch gender fail", error);
		}
	};
};

export const fetchGenderSuccess = (genderData) => ({
	type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData,
});

export const fetchGenderFailed = () => ({
	type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_ROLE_START,
			});
			let response = await userService.getAllCode("ROLE");
			if (response && response.errorCode === 0) {
				dispatch(fetchRoleSuccess(response.data));
			} else {
				dispatch(fetchRoleFailed());
			}
		} catch (error) {
			dispatch(fetchRoleFailed());
			console.error("fetch role fail", error);
		}
	};
};

export const fetchRoleSuccess = (roleData) => ({
	type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData,
});

export const fetchRoleFailed = () => ({
	type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_POSITION_START,
			});
			let response = await userService.getAllCode("POSITION");
			if (response && response.errorCode === 0) {
				dispatch(fetchPositionSuccess(response.data));
			} else {
				dispatch(fetchPositionFailed());
			}
		} catch (error) {
			dispatch(fetchPositionFailed());
			console.error("fetch position fail", error);
		}
	};
};

export const fetchPositionSuccess = (roleData) => ({
	type: actionTypes.FETCH_POSITION_SUCCESS,
	data: roleData,
});

export const fetchPositionFailed = () => ({
	type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchTimeStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_TIME_START,
			});
			let response = await userService.getAllCode("TIME");
			if (response && response.errorCode === 0) {
				dispatch(fetchTimeSuccess(response.data));
			} else {
				dispatch(fetchTimeFailed());
			}
		} catch (error) {
			dispatch(fetchTimeFailed());
			console.error("fetch time fail", error);
		}
	};
};

export const fetchTimeSuccess = (timeData) => ({
	type: actionTypes.FETCH_TIME_SUCCESS,
	data: timeData,
});

export const fetchTimeFailed = () => ({
	type: actionTypes.FETCH_TIME_FAILED,
});
