import actionTypes from "./actionTypes";
import { userService } from "../../services";

// GENDER
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

// ROLE
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

// POSITION
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

// TIME
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

// PRICE
export const fetchPriceStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_PRICE_START,
			});
			let response = await userService.getAllCode("PRICE");
			if (response && response.errorCode === 0) {
				dispatch(fetchPriceSuccess(response.data));
			} else {
				dispatch(fetchPriceFailed());
			}
		} catch (error) {
			dispatch(fetchPriceFailed());
			console.error("fetch PRICE fail", error);
		}
	};
};

export const fetchPriceSuccess = (data) => ({
	type: actionTypes.FETCH_PRICE_SUCCESS,
	data: data,
});

export const fetchPriceFailed = () => ({
	type: actionTypes.FETCH_PRICE_FAILED,
});

// PAYMENT
export const fetchPaymentStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_PAYMENT_START,
			});
			let response = await userService.getAllCode("PAYMENT");
			if (response && response.errorCode === 0) {
				dispatch(fetchPaymentSuccess(response.data));
			} else {
				dispatch(fetchPaymentFailed());
			}
		} catch (error) {
			dispatch(fetchPaymentFailed());
			console.error("fetch PAYMENT fail", error);
		}
	};
};

export const fetchPaymentSuccess = (data) => ({
	type: actionTypes.FETCH_PAYMENT_SUCCESS,
	data: data,
});

export const fetchPaymentFailed = () => ({
	type: actionTypes.FETCH_PAYMENT_FAILED,
});

// PROVINCE
export const fetchProvinceStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_PROVINCE_START,
			});
			let response = await userService.getAllCode("PROVINCE");
			if (response && response.errorCode === 0) {
				dispatch(fetchProvinceSuccess(response.data));
			} else {
				dispatch(fetchProvinceFailed());
			}
		} catch (error) {
			dispatch(fetchProvinceFailed());
			console.error("fetch PROVINCE fail", error);
		}
	};
};

export const fetchProvinceSuccess = (data) => ({
	type: actionTypes.FETCH_PROVINCE_SUCCESS,
	data: data,
});

export const fetchProvinceFailed = () => ({
	type: actionTypes.FETCH_PROVINCE_FAILED,
});
