import actionTypes from "../actions/actionTypes";

const initialState = {
	isLoadingGender: false,
	isLoadingRole: false,
	isLoadingPosition: false,
	isLoadingTime: false,
	genders: [],
	roles: [],
	positions: [],
	times: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
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
		default:
			return state;
	}
};

export default adminReducer;
