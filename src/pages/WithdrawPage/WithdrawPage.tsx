import { TablerChevronRight } from '@/components/icon';
import { CustomList } from '@/components/ui/CustomList';
import { Title } from '@/components/ui/Title';
import { Avatar, Ellipsis, List } from 'antd-mobile';
import styles from './WithdrawPage.module.scss';
import IMAGES from '@/assets/images';

const WithdrawPage = () => {
    return (
        <div className={styles.container}>
            <Title text='Withdraw' />

            <CustomList>
                <List.Item
                    prefix={<Avatar src={IMAGES.cryptoWallet} />}
                    description={'Withdraw to your wallet'}
                    extra={<TablerChevronRight />}
                    className={styles.item}
                >
                    <Ellipsis content='Your wallet' />
                </List.Item>

                <List.Item
                    prefix={<Avatar src={IMAGES.money} />}
                    description={'Withdraw to another account'}
                    extra={<TablerChevronRight />}
                >
                    <Ellipsis content='Another account' />
                </List.Item>
            </CustomList>
        </div>
    );
};

export default WithdrawPage;
