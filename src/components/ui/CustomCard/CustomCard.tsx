import React from 'react';
import styles from './CustomCard.module.scss';
import { Card, CardProps } from 'antd-mobile';
import clsx from 'clsx';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

type CustomCardProps = CardProps &
    Partial<{
        border: 'normal' | 'primary' | 'gradient';
        children: React.ReactNode;
    }>;

const CustomCard = (props: CustomCardProps) => {
    const { children, border = '', className: customClassName } = props;
    const borderClass = `border${capitalizeFirstLetter(border)}`;

    return <Card className={clsx(customClassName, border && styles[borderClass])}>{children}</Card>;
};

export default CustomCard;
