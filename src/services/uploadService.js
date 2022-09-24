import axios from "../axios";

const uploadService = {
	upload(file) {
		let formData = new FormData();
		formData.append("file", file);

		return axios.post("/api/upload", formData, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});
	},
	destroy(public_id) {
		return axios.post("/api/destroy", { public_id: public_id });
	},
};

export default uploadService;
