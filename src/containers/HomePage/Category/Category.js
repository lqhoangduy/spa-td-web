import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./Category.module.scss";

const categories = [
	{
		key: 1,
		url: "/images/icon-massage.png",
		title: "Reflexology",
	},
	{
		key: 2,
		url: "/images/icon-skincare.png",
		title: "RejuvenateSpa",
	},
	{
		key: 3,
		url: "/images/icon-wash.png",
		title: "SaunaRoom",
	},
];

function Category() {
	return (
		<div className='container'>
			<div
				className={styles.sectionWrap}
				style={{ backgroundImage: `url('/images/bg-section.png')` }}>
				<div className={styles.sectionContent}>
					<img
						className={styles.sectionLogo}
						src='/images/logo-section.png'
						alt='logo'
					/>
					<h4 className={styles.sectionTitle}>
						<FormattedMessage id='homepage.section-title' />
					</h4>
					<p className={styles.sectionDescription}>
						<FormattedMessage id='homepage.section-description' />
					</p>
				</div>
			</div>
			<div className={styles.category}>
				{categories.map((category) => {
					return (
						<div className={styles.categoryItem} key={category.key}>
							<div className={styles.iconWrap}>
								<img
									src={category.url}
									alt='category'
									className={styles.sliderImage}
								/>
							</div>
							<h4 className={styles.categoryTitle}>{category.title}</h4>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Category;
