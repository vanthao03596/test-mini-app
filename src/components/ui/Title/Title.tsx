import clsx from 'clsx';
import React from 'react';

type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
    text: string;
    gradient?: boolean;
    fontSize?: number;
};

const Title = (props: TitleProps) => {
    const { text, gradient = true, fontSize = 36, className: customClassName, style: customStyle, ...rest } = props;

    return (
        <div
            className={clsx(customClassName, {
                textGradient: gradient,
            })}
            style={{
                fontWeight: 500,
                fontSize: fontSize,
                textAlign: 'center',
                textTransform: 'uppercase',
                ...customStyle,
            }}
            {...rest}
        >
            {text}
        </div>
    );
};

export default Title;
