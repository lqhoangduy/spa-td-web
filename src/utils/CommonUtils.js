class CommonUtils {
	static isNumber1(number) {
		if (number === 1) return true;
		return false;
	}

	static validatePhoneNumber = (phone) => {
		return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone.toLowerCase());
	};
}

export default CommonUtils;
