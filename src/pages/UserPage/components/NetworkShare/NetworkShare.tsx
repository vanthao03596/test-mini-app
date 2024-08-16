import { TablerCopy, TablerShare3 } from '@/components/icon';
import { CustomCard } from '@/components/ui/CustomCard';
import { Flex } from '@/components/ui/Flex';
import { Button, Space, Toast } from 'antd-mobile';
import { useCopyToClipboard } from 'usehooks-ts';
import styles from './NetworkShare.module.scss';

const NetworkShare = () => {
    const userId = Telegram.WebApp.initDataUnsafe.user?.id;
    const shareText = 'Join with us to get rewards together';
    const inviteLink = `https://t.me/GemxNetworkBot?start=${userId || ''}`;
    const shareLink = `https://t.me/share/url?url=${inviteLink}&text=${shareText}`;
    const [, copy] = useCopyToClipboard();

    const handleCopy = () => {
        copy(inviteLink);
        Toast.show({
            icon: 'success',
            content: 'Copy success',
        });
    };

    const handleShare = () => {
        Telegram.WebApp.openTelegramLink(shareLink);
    };

    return (
        <CustomCard className={styles.card}>
            <div className={styles.wrapper}>
                <div className={styles.title}>Invite friends and earn together</div>

                {/* Invite */}
                <Flex align='center' justify='space-between' className={styles.link}>
                    <div className={styles.text}>{inviteLink}</div>
                    <TablerCopy className={styles.icon} onClick={handleCopy} />
                </Flex>

                {/* Share */}
                <Button color='primary' fill='solid' className={styles.btnShare} onClick={handleShare}>
                    <Space align='center'>
                        <Flex align='center'>
                            <TablerShare3 />
                        </Flex>
                        <div>Send link</div>
                    </Space>
                </Button>
            </div>
        </CustomCard>
    );
};

export default NetworkShare;
