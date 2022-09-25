import axios from "../axios";

const userService = {
	login(loginBody) {
		return axios.post(`/api/login`, loginBody);
	},
	getAllUsers(inputId) {
		return axios.get(`/api/get-users?id=${inputId}`);
	},
	createUser(user) {
		return axios.post("/api/create-user", user);
	},
	deleteUser(id) {
		return axios.delete("/api/delete-user", { data: { id } });
	},
	editUser(user) {
		return axios.put("/api/edit-user", user);
	},
	getAllCode(type) {
		return axios.get(`/api/all-code?type=${type}`);
	},
	getTopDoctorHome(limit) {
		return axios.get(`/api/top-doctor-home?limit=${limit}`);
	},
};

export default userService;
