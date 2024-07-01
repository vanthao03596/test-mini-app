import { TablerCoinBitcoin, TablerHome, TablerMoneybag, TablerUser, TablerWallet } from '@/components/icon';
import { TabBar } from 'antd-mobile';
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
            key: '/earn',
            title: 'Earn',
            icon: <TablerMoneybag />,
        },
        {
            key: '/wallet',
            title: 'Wallet',
            icon: <TablerWallet />,
        },
        {
            key: '/crypto',
            title: 'Crypto',
            icon: <TablerCoinBitcoin />,
        },
        {
            key: '/user',
            title: 'User',
            icon: <TablerUser />,
        },
    ];

    return (
        <div className={styles.container}>
            <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)} safeArea={true}>
                {tabs.map((item) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    );
};

export default CustomTabBar;
