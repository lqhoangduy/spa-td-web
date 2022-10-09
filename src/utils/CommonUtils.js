class CommonUtils {
	static isNumber1(number) {
		if (number === 1) return true;
		return false;
	}

	static validatePhoneNumber = (phone) => {
		return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone.toLowerCase());
	};

	static getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	static capitalize = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
}

export default CommonUtils;
