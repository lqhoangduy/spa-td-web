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
	getAllDoctors() {
		return axios.get("/api/get-all-doctors");
	},
	getDetailDoctor(id) {
		return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
	},
	createDoctorSchedules(doctorId, data) {
		return axios.post("/api/create-schedules", {
			doctorId,
			schedules: data,
		});
	},
	getDoctorSchedules(id) {
		return axios.get(`/api/get-schedules?id=${id}`);
	},
	deleteDoctorSchedules(id) {
		return axios.delete(`/api/delete-schedules?id=${id}`);
	},
	getSchedulesByDate(doctorId, date) {
		return axios.get(
			`/api/get-schedules-by-date?doctorId=${doctorId}&date=${date}`
		);
	},
	getExtraInfoDoctor(id) {
		return axios.get(`/api/get-extra-info-doctor?id=${id}`);
	},
	bookingAppointment(data) {
		return axios.post("/api/book-appointment", data);
	},
	verifyBookingAppointment(data) {
		return axios.post("/api/verify-book-appointment", data);
	},
	createSpecialty(data) {
		return axios.post("/api/create-specialty", data);
	},
	getSpecialties() {
		return axios.get("/api/get-specialties");
	},
	editSpecialty(data) {
		return axios.put("/api/edit-specialty", data);
	},
	deleteSpecialty(id) {
		return axios.delete(`/api/delete-specialty?id=${id}`);
	},
	getSpecialty(id) {
		return axios.get(`/api/get-specialty?id=${id}`);
	},
	getDoctorByIds(ids) {
		return axios.post("/api/get-doctor-by-ids", {
			ids: ids,
		});
	},
};

export default userService;
