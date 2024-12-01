import './ServicesItem.scss'

interface ServicesItemProps {
    index: number;
    onClick: (index: number, imageUrl: string) => void;
    isActive: boolean;
    imageUrl: string;
    icon: string;
    name: string;
    description: string;
}

export const ServicesItem = ({ index, onClick, isActive, imageUrl, icon, name, description }: ServicesItemProps) => {
    return (
        <div
            className={`services__item ${isActive ? 'active' : ''}`}
            onClick={() => onClick(index, imageUrl)}
        >
            <img src={icon} />
            <div>
                <h3 className={'heading-tertiary mb-2'}>{name}</h3>
                <p className={'text-small'}>{description}</p>
            </div>
        </div>
    );
};
