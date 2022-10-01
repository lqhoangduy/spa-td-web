import React from "react";
import styles from "./Footer.module.scss";
import { Divider } from "antd";
import {
	FacebookOutlined,
	LinkedinOutlined,
	InstagramOutlined,
} from "@ant-design/icons";

function Footer() {
	return (
		<section className={styles.footer}>
			<div className='container'>
				<div className={styles.footerWrap}>
					<div className={styles.footerLogo}>
						<span>Rejuvenate</span>
					</div>
					<div className={styles.footerSocial}>
						<div className={styles.footerSocialItem}>
							<a
								href='https://www.facebook.com/lqhoangduy'
								target='_blank'
								rel='noreferrer'>
								<FacebookOutlined />
							</a>
						</div>
						<div className={styles.footerSocialItem}>
							<a
								href='https://www.linkedin.com/in/hoangduylq'
								target='_blank'
								rel='noreferrer'>
								<LinkedinOutlined />
							</a>
						</div>
						<div className={styles.footerSocialItem}>
							<a
								href='https://www.instagram.com/hoangduy.lq'
								target='_blank'
								rel='noreferrer'>
								<InstagramOutlined />
							</a>
						</div>
					</div>
					<div className={styles.footerContact}>
						<span tel='0961884661'>0961884661</span>
						<Divider type='vertical' />
						<span>lqhoangduy@gmail.com</span>
					</div>
					<div className={styles.footerCR}>
						<span>© Rejuvenate. All Rights Reserved 2022</span>
					</div>
					<div className={styles.footerPoweredBy}>
						<span>
							Powered by <strong>HoangDuy</strong>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Footer;
