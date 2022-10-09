import actionTypes from "../actions/actionTypes";

const initialState = {
	isLoadingGender: false,
	genders: [],
	isLoadingRole: false,
	roles: [],
	isLoadingPosition: false,
	positions: [],
	isLoadingTime: false,
	times: [],
	isLoadingPrice: false,
	prices: [],
	isLoadingPayment: false,
	payments: [],
	isLoadingProvince: false,
	provinces: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		// GENDER
		case actionTypes.FETCH_GENDER_START:
			state.isLoadingGender = true;
			return {
				...state,
			};
		case actionTypes.FETCH_GENDER_SUCCESS:
			state.genders = action.data;
			state.isLoadingGender = false;
			return {
				...state,
			};
		case actionTypes.FETCH_GENDER_FAILED:
			state.genders = [];
			state.isLoadingGender = false;
			return {
				...state,
			};
		// ROLE
		case actionTypes.FETCH_ROLE_START:
			state.isLoadingRole = true;
			return {
				...state,
			};
		case actionTypes.FETCH_ROLE_SUCCESS:
			state.roles = action.data;
			state.isLoadingRole = false;
			return {
				...state,
			};
		case actionTypes.FETCH_ROLE_FAILED:
			state.roles = [];
			state.isLoadingRole = false;
			return {
				...state,
			};
		// POSITION
		case actionTypes.FETCH_POSITION_START:
			state.isLoadingPosition = true;
			return {
				...state,
			};
		case actionTypes.FETCH_POSITION_SUCCESS:
			state.positions = action.data;
			state.isLoadingPosition = false;
			return {
				...state,
			};
		case actionTypes.FETCH_POSITION_FAILED:
			state.positions = [];
			state.isLoadingPosition = false;
			return {
				...state,
			};
		// TIME
		case actionTypes.FETCH_TIME_START:
			state.isLoadingTime = true;
			return {
				...state,
			};
		case actionTypes.FETCH_TIME_SUCCESS:
			state.times = action.data;
			state.isLoadingTime = false;
			return {
				...state,
			};
		case actionTypes.FETCH_TIME_FAILED:
			state.times = [];
			state.isLoadingTime = false;
			return {
				...state,
			};
		// PRICE
		case actionTypes.FETCH_PRICE_START:
			state.isLoadingPrice = true;
			return {
				...state,
			};
		case actionTypes.FETCH_PRICE_SUCCESS:
			state.prices = action.data;
			state.isLoadingPrice = false;
			return {
				...state,
			};
		case actionTypes.FETCH_PRICE_FAILED:
			state.prices = [];
			state.isLoadingPrice = false;
			return {
				...state,
			};
		// PAYMENT
		case actionTypes.FETCH_PAYMENT_START:
			state.isLoadingPayment = true;
			return {
				...state,
			};
		case actionTypes.FETCH_PAYMENT_SUCCESS:
			state.payments = action.data;
			state.isLoadingPayment = false;
			return {
				...state,
			};
		case actionTypes.FETCH_PAYMENT_FAILED:
			state.payments = [];
			state.isLoadingPayment = false;
			return {
				...state,
			};
		// PROVINCE
		case actionTypes.FETCH_PROVINCE_START:
			state.isLoadingProvince = true;
			return {
				...state,
			};
		case actionTypes.FETCH_PROVINCE_SUCCESS:
			state.provinces = action.data;
			state.isLoadingProvince = false;
			return {
				...state,
			};
		case actionTypes.FETCH_PROVINCE_FAILED:
			state.provinces = [];
			state.isLoadingProvince = false;
			return {
				...state,
			};
		default:
			return state;
	}
};

export default adminReducer;
