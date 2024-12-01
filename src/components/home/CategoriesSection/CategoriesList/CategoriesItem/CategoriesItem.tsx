import "./CategoriesItem.scss";
import {NavLink} from "react-router-dom";

interface CategoriesItemProps {
    name: string;
    backgroundImage: string;
}

export const CategoriesItem = ({ name, backgroundImage } : CategoriesItemProps) => {
    return (
        <div
            className="category-item"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
            <h3 className={'heading-tertiary text-white'}>{name}</h3>
            <NavLink to="/shop" className="btn-primary">Order online</NavLink>
        </div>
    );
};
