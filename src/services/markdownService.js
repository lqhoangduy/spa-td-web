import axios from "../axios";

const markdownService = {
	saveInfoDoctor(request) {
		return axios.post("/api/save-info-doctor", request);
	},
	getInfoDoctor(doctorId) {
		return axios.get(`/api/get-info-doctor?doctorId=${doctorId}`);
	},
};

export default markdownService;
