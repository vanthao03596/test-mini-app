import { TablerArrowBarUp } from '@/components/icon';
import { Button, Space } from 'antd-mobile';

const WalletPage = () => {
    return (
        <div>
            <Space direction='vertical' justify='center' align='center'>
                <Button color='primary' fill='outline' shape='rounded'>
                    <Space>
                        <TablerArrowBarUp />
                    </Space>
                </Button>
                <div>Send</div>
            </Space>
        </div>
    );
};

export default WalletPage;
