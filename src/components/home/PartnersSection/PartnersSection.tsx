import styles from './PartnersSection.module.scss'
import logo1 from "../../../assets/logo/toyotaLogo.png"
import logo2 from "../../../assets/logo/fordLogo.png"
import logo3 from "../../../assets/logo/BMWLogo.png"
import logo4 from  "../../../assets/logo/AudiLogo.png"
import logo5 from "../../../assets/logo/MersedesLogo.png"
import logo6 from "../../../assets/logo/HondaLogo.png"
import logo7 from "../../../assets/logo/McLarenLogo.png"
import logo8 from "../../../assets/logo/LamborghiniLogo.png"
import logo9 from "../../../assets/logo/FordMustangLogo.png"
import logo10 from "../../../assets/logo/NissanLogo.png"
import logo11 from "../../../assets/logo/VolkswagenLogo.png"
import logo12 from  "../../../assets/logo/OpelLogo.png"

const partners = [
    { name: "Toyota", url: "https://www.toyota.com", logo: logo1, width: "" },
    { name: "Ford", url: "https://www.ford.com", logo: logo2, width: "" },
    { name: "BMW", url: "https://www.bmw.com", logo: logo3, width: "130px" },
    { name: "Audi", url: "https://www.audi.com", logo: logo4, width: "250px" },
    { name: "Mercedes-Benz", url: "https://www.mercedes-benz.com", logo: logo5, width: "130px" },
    { name: "Honda", url: "https://www.honda.com", logo: logo6, width: "130px" },
    { name: "McLaren", url: "https://www.mclaren.com/", logo: logo7, width: "" },
    { name: "Lamborghini", url: "https://www.lamborghini.com/ru-en", logo: logo8, width: "130px" },
    { name: "Ford Mustang", url: "https://www.ford.com/cars/mustang/", logo: logo9, width: "130px" },
    { name: "Nissan", url: "https://www.nissan-global.com/EN/", logo: logo10, width: "130px" },
    { name: "Volkswagen", url: "https://www.volkswagen.ua/", logo: logo11, width: "130px" },
    { name: "Opel", url: "https://www.opel.ua/", logo: logo12, width: "130px" },
];

export const PartnersSection = () => {
    return (
        <div className={styles.partnersSection}>
            <div className={styles.partnersWrapper}>
                {partners.map((partner, index) => (
                    <div className={styles.partnerLogo} key={index}>
                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                            <img
                                src={partner.logo}
                                alt={`${partner.name} Logo`}
                                style={partner.width ? { width: partner.width } : undefined}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};
