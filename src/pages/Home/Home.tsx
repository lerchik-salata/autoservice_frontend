import {HeroSection} from "../../components/home/HeroSlider/HeroSection.tsx";
import {CategoriesSection} from "../../components/home/CategoriesSection/CategoriesSection.tsx";
import {ServicesSection} from "../../components/home/ServicesSection/ServicesSection.tsx";
import {AboutSection} from "../../components/home/AboutSection/AboutSection.tsx";
import {PartnersSection} from "../../components/home/PartnersSection/PartnersSection.tsx";

export const Home = () => (
    <>
        <HeroSection/>
        <ServicesSection/>
        <CategoriesSection/>
        <AboutSection/>
        <PartnersSection/>
    </>
)