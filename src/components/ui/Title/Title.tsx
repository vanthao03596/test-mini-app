import clsx from 'clsx';
import styles from './Title.module.scss';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbolsKeyboardBackspaceRounded } from '@/components/icon';
import { DivProps } from '@/types/html.types';

type TitleProps = DivProps & {
    text: string;
    hasBack?: boolean;
    variant?: 'gradient' | 'primary' | 'gold' | 'white';
    fontSize?: number;
};

const Title = (props: TitleProps) => {
    const {
        text,
        hasBack = false,
        variant = 'primary',
        fontSize = 32,
        className: customClassName,
        style: customStyle,
        ...rest
    } = props;
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div
            className={clsx(customClassName, {
                [styles.title]: true,
                [styles.primary]: variant === 'primary',
                [styles.gold]: variant === 'gold',
                [styles.white]: variant === 'white',
                textGradient: variant === 'gradient',
            })}
            style={{
                fontSize: fontSize,
                ...customStyle,
            }}
            {...rest}
        >
            {text}

            {hasBack && (
                <div className={styles.icon} onClick={handleBack}>
                    <MaterialSymbolsKeyboardBackspaceRounded fontSize={24} />
                </div>
            )}
        </div>
    );
};

export default Title;
