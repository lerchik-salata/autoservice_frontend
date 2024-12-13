import { Link, useLocation } from 'react-router-dom';
import styles from './Tabs.module.scss';

interface Tab {
    path: string,
    label: string,
}

interface TabsProps {
    tabs: Tab[],
    light: boolean,
}

const ProfileTabs = ({ tabs, light }: TabsProps) => {
    const location = useLocation();

    return (
        <nav className={styles.tabs}>
            {tabs.map((tab) => (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className={`${styles.tab} ${location.pathname === tab.path ? `${styles.active}` : ''} ${light ? `${styles.light}` : ''}`}
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
};

export default ProfileTabs;
