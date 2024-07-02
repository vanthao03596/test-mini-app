import { DivProps } from '@/types/html.types';
import styled from '@emotion/styled';
import React from 'react';

type CustomAttributes = {
    direction: React.CSSProperties['flexDirection'];
    wrap: React.CSSProperties['flexWrap'];
    justify: React.CSSProperties['justifyContent'];
    align: React.CSSProperties['alignItems'];
    gap: number;
};

type FlexProps = DivProps &
    Partial<CustomAttributes> & {
        children: React.ReactNode;
    };

const StyledFlex = styled('div')<Partial<CustomAttributes>>((props) => ({
    display: 'flex',
    flexDirection: props.direction,
    flexWrap: props.wrap,
    justifyContent: props.justify,
    alignItems: props.align,
    gap: props.gap,
}));

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

    const flexProps = { direction, wrap, justify, align, gap };

    return (
        <StyledFlex {...flexProps} {...rest}>
            {children}
        </StyledFlex>
    );
};

export default Flex;
