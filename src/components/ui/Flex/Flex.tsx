import React from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
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
    align?: 'normal' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    gap?: number;
};

const Flex = (props: FlexProps) => {
    const {
        children,
        direction = 'row',
        wrap = 'nowrap',
        justify = 'normal',
        align = 'normal',
        gap = 0,
        ...rest
    } = props;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: direction,
                flexWrap: wrap,
                justifyContent: justify,
                alignItems: align,
                gap: gap,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Flex;
