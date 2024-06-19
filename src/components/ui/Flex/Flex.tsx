import React from 'react';
import styles from './Flex.module.scss';
import clsx from 'clsx';

type FlexProps = {
    children: React.ReactNode;
    vertical?: boolean;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justify?:
        | 'normal'
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'stretch'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
};

const Flex = (props: FlexProps) => {
    const { children, vertical = false, wrap = 'nowrap', justify = 'normal' } = props;

    return (
        <div
            className={clsx({
                [styles.flex]: true,
                [styles.column]: vertical,
                [styles[wrap]]: true,
                [styles[`justify-${justify}`]]: true,
            })}

            style={{
                display: "flex",
            }}
        >
            {children}
        </div>
    );
};

export default Flex;
