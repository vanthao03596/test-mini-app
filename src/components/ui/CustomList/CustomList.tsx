import React from 'react';
import { List, ListProps } from 'antd-mobile';
import styled from '@emotion/styled'

type CustomListProps = ListProps & {
    children: React.ReactNode;
};

const StyledList = styled(List)`
    overflow: hidden;
    padding-right: var(--padding-right);
    padding-left: var(--padding-left);
    border: 1px solid var(--adm-color-border);
    border-radius: var(--custom-border-radius-l);
    background-color: var(--adm-color-background);
`;

const CustomList = (props: CustomListProps) => {
    const { children, mode = 'card', ...rest } = props;

    return (
        <StyledList mode={mode} {...rest}>
            {children}
        </StyledList>
    );
};

export default CustomList;
