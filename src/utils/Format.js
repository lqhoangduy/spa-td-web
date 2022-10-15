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
}

export default Format;
