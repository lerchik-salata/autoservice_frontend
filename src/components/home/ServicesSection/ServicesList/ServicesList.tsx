import { useState } from 'react';
import { ServicesItem } from './ServicesItem/ServicesItem';
import './ServicesList.scss';
import service1 from '../../../../assets/home-service-1.png';
import service2 from '../../../../assets/home-service-2.png';
import service3 from '../../../../assets/home-service-3.png';
import icon1 from '../../../../assets/service-1.png';
import icon2 from '../../../../assets/service-2.png';
import icon3 from '../../../../assets/service-3.png';

const services = [
    {
        id: 0,
        imageUrl: service1,
        icon: icon1,
        name: 'Engine Diagnostics',
        description: 'Comprehensive diagnostics to ensure your engine performs at its best.',
    },
    {
        id: 1,
        imageUrl: service2,
        icon: icon2,
        name: 'Oil Change Service',
        description: 'High-quality oil replacement to keep your car running smoothly and efficiently.',
    },
    {
        id: 2,
        imageUrl: service3,
        icon: icon3,
        name: 'Tire Replacement',
        description: 'Professional tire replacement to ensure safety and comfort on the road.',
    },
];

export const ServicesList = () => {
    const [activeService, setActiveService] = useState<number>(0);
    const [activeImage, setActiveImage] = useState<string>(services[0].imageUrl);

    const handleServiceClick = (index: number, imageUrl: string) => {
        setActiveService(index);
        setActiveImage(imageUrl);
    };

    return (
        <div className="services__list-info">
            <div className="services__list-column">
                {services.map(service => (
                    <ServicesItem
                        key={service.id}
                        index={service.id}
                        onClick={handleServiceClick}
                        isActive={activeService === service.id}
                        imageUrl={service.imageUrl}
                        icon={service.icon}
                        name={service.name}
                        description={service.description}
                    />
                ))}
            </div>
            <div className="services__list-image">
                <img src={activeImage} alt="Active Service" />
            </div>
        </div>
    );
};
