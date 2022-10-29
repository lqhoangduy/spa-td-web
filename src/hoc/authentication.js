import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { USER_ROLE } from "../utils";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
	authenticatedSelector: (state) => state.user.isLoggedIn,
	wrapperDisplayName: "UserIsAuthenticated",
	redirectPath: "/login",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
	// Want to redirect the user when they are authenticated
	authenticatedSelector: (state) => !state.user.isLoggedIn,
	wrapperDisplayName: "UserIsNotAuthenticated",
	redirectPath: (state, ownProps) =>
		locationHelper.getRedirectQueryParam(ownProps) || "/",
	allowRedirectBack: false,
});

export const userIsAdmin = connectedRouterRedirect({
	authenticatedSelector: (state) =>
		state.user?.userInfo?.roleId === USER_ROLE.ADMIN,
	wrapperDisplayName: "UserIsAuthenticated",
	redirectPath: "/home",
});

export const userIsAdminOrDoctor = connectedRouterRedirect({
	authenticatedSelector: (state) =>
		state.user?.userInfo?.roleId === USER_ROLE.ADMIN ||
		state.user?.userInfo?.roleId === USER_ROLE.DOCTOR,
	wrapperDisplayName: "UserIsAuthenticated",
	redirectPath: "/home",
});

export const userIsDoctor = connectedRouterRedirect({
	authenticatedSelector: (state) =>
		state.user?.userInfo?.roleId === USER_ROLE.DOCTOR,
	wrapperDisplayName: "UserIsAuthenticated",
	redirectPath: "/home",
});
