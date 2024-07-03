import { MaterialSymbolsKeyboardBackspaceRounded } from '@/components/icon';
import { DivProps } from '@/types/html.types';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import styles from './Title.module.scss';

type TitleProps = DivProps & {
    text: string;
    hasBack?: boolean;
    type?: 'title' | 'subtitle' | 'gold';
};

type StyledTitleProps = {
    type: TitleProps['type'];
};

const StyledTitle = styled('div')<StyledTitleProps>((props) => ({
    position: 'relative',
    fontWeight: 500,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '1rem',

    ...(props.type === 'title' && {
        color: 'white',
        fontSize: 32,
    }),
    ...(props.type === 'subtitle' && {
        color: 'var(--adm-color-primary)',
        fontSize: 24,
    }),
    ...(props.type === 'gold' && {
        color: 'var(--adm-color-yellow)',
        fontSize: 24,
    }),
}));

const Title = (props: TitleProps) => {
    const { text, hasBack = false, type = 'title', ...rest } = props;
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <StyledTitle type={type} {...rest}>
            {text}
            {(hasBack || type === 'title') && (
                <div className={styles.icon} onClick={handleBack}>
                    <MaterialSymbolsKeyboardBackspaceRounded fontSize={24} />
                </div>
            )}
        </StyledTitle>
    );
};

export default Title;
