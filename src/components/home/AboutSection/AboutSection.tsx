import styles from './AboutSection.module.scss';
import aboutImg from '../../../assets/about-img.png'
import {NavLink} from "react-router-dom";

export const AboutSection = () => {
    return (
        <>
            <div className={styles.aboutSection} id={'about'}>
                <div className={'container mx-auto'}>
                    <h2 className={'heading-secondary text-white'}>About us</h2>
                    <div className={styles.aboutBlock}>
                        <img src={aboutImg} alt={'About us'}/>
                        <div className={styles.aboutInfo}>
                           <p className={`${styles.text} text-white`}>
                               At Pro Auto, we are committed to keeping your vehicle in top condition with our expert care and trusted service. With years of experience in the automotive industry, our skilled technicians specialize in diagnostics, repairs, and maintenance for all makes and models. We pride ourselves on transparency, quality workmanship, and exceptional customer service. Whether it’s routine maintenance or complex repairs, you can count on us to get you back on the road safely and efficiently. Let us be your go-to destination for all your automotive needs!
                           </p>
                            <NavLink to="/contact" className="btn-primary mt-5">Leave a request</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}