import { Title } from '@/components/ui/Title';
import styles from './CryptoPage.module.scss';
import { TrendingBox } from './components/TrendingBox';
import { ResearchBox } from './components/ResearchBox';

const CryptoPage = () => {
    return (
        <div className={styles.container}>
            <Title text='Crypto' />
            <TrendingBox />
            <ResearchBox />
        </div>
    );
};

export default CryptoPage;
