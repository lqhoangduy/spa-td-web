import axios from "../axios";

const userService = {
	login(loginBody) {
		return axios.post(`/api/login`, loginBody);
	},
};

export default userService;
