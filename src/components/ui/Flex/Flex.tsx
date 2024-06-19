import React from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    direction?: React.CSSProperties['flexDirection'];
    wrap?: React.CSSProperties['flexWrap'];
    justify?: React.CSSProperties['justifyContent'];
    align?: React.CSSProperties['alignItems'];
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
