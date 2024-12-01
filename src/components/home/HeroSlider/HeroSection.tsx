import { useState, useEffect } from 'react';
import './HeroSection.scss';
import banner1 from '../../../assets/banner-1.png';
import banner2 from '../../../assets/banner-2.png';
import banner3 from '../../../assets/banner-3.png';
import {NavLink} from "react-router-dom";

const images: string[] = [
    `url(${banner1})`,
    `url(${banner2})`,
    `url(${banner3})`,
];

export const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-slider">
            <div
                className="hero-slider__image"
                style={{ backgroundImage: images[currentSlide] }}
            >
                <div className={'container mx-auto'}>
                    <div className="hero-slider__content py-64">
                        <h1 className={'heading-primary'}>Pro Auto - the best car service</h1>
                        <NavLink to="/contact" className="btn-primary mt-10">Order a consultation</NavLink>
                    </div>
                </div>
            </div>

            <div className="hero-slider__pagination">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`hero-slider__pagination-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

