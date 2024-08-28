import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import useUser from '@/hooks/useUser';
import { Navigate } from 'react-router-dom';
import { YourWalletItem } from './components/YourWalletItem';
import styles from './WithdrawPage.module.scss';

const WithdrawPage = () => {
    const user = useUser();

    if (!user) return;
    if (!user.email_verified_at) return <Navigate to='/verify-email' />;

    return (
        <div className={styles.container}>
            <Title text='Withdraw' />
            <CustomList>
                <YourWalletItem />
                {/* <AnotherAccountItem /> */}
            </CustomList>
        </div>
    );
};

export default WithdrawPage;
