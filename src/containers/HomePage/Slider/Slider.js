import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import styles from "./Slider.module.scss";

const sliders = [
	{
		key: 1,
		url: "/images/banner-slider-1.jpeg",
		title: "Reflexology",
	},
	{
		key: 2,
		url: "/images/banner-slider-2.jpeg",
		title: "RejuvenateSpa",
	},
	{
		key: 3,
		url: "/images/banner-slider-3.jpeg",
		title: "SaunaRoom",
	},
	{
		key: 4,
		url: "/images/banner-slider-4.jpeg",
		title: "HydroTherapy",
	},
];

function SliderComponent() {
	const settings = {
		dots: true,
		infinite: true,
		arrows: false,
		autoplay: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: true,
		dotsClass: "slick-dots slick-thumb",
		customPaging: function (i) {
			return (
				<a href='/#'>
					<img src={`/images/banner-slider-${i + 1}.jpeg`} alt='banner-small' />
				</a>
			);
		},
	};

	return (
		<section className={styles.slider}>
			<Slider {...settings}>
				{sliders.map((slider) => {
					return (
						<div key={slider.key} className={styles.sliderItem}>
							<img
								src={slider.url}
								alt='banner'
								className={styles.sliderImage}
							/>
							<div className={styles.sliderContent}>
								<span className={styles.sliderTile}>{slider.title}</span>
								<Input
									placeholder='Search'
									className={styles.sliderInput}
									size='large'
									prefix={<SearchOutlined />}
								/>
							</div>
						</div>
					);
				})}
			</Slider>
		</section>
	);
}

export default SliderComponent;
