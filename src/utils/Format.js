import moment from "moment";

class Format {
	static currencyVI(number) {
		const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		});
		return formatter.format(number);
	}

	static currencyEN(number) {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		});
		return formatter.format(number);
	}

	static Date(date) {
		return moment(date).format("DD/MM/YYYY");
	}
}

export default Format;
