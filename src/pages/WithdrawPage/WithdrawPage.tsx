import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { AnotherAccountItem } from './components/AnotherAccountItem';
import { YourWalletItem } from './components/YourWalletItem';
import styles from './WithdrawPage.module.scss';

const WithdrawPage = () => {
    return (
        <div className={styles.container}>
            <Title text='Withdraw' />
            <CustomList>
                <YourWalletItem />
                <AnotherAccountItem />
            </CustomList>
        </div>
    );
};

export default WithdrawPage;
