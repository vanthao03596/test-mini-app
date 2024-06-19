import { TablerFileText, TablerHome, TablerMoneybag, TablerUser, TablerWallet } from '@/components/icon';
import { SafeArea, TabBar } from 'antd-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CustomTabBar.module.scss';

const CustomTabBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    const setRouteActive = (value: string) => {
        navigate(value);
    };

    const tabs = [
        {
            key: '/',
            title: 'Home',
            icon: <TablerHome />,
        },
        {
            key: '/wallet',
            title: 'Wallet',
            icon: <TablerWallet />,
        },
        {
            key: '/research',
            title: 'Research',
            icon: <TablerFileText />,
        },
        {
            key: '/quest',
            title: 'Quest',
            icon: <TablerMoneybag />,
        },
        {
            key: '/user',
            title: 'User',
            icon: <TablerUser />,
        },
    ];

    return (
        <div className={styles.container}>
            <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)} safeArea>
                {tabs.map((item) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
            <SafeArea position='bottom' />
        </div>
    );
};

export default CustomTabBar;
