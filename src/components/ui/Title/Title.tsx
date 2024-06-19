import clsx from 'clsx';
import React from 'react';

type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
    text: string;
    gradient?: boolean;
    fontSize?: number;
};

const Title = (props: TitleProps) => {
    const { text, gradient = true, fontSize = 20, className: originClassName, ...rest } = props;

    return (
        <div
            className={clsx(originClassName, {
                textGradient: gradient,
            })}
            style={{ textTransform: 'uppercase', fontSize: fontSize, textAlign: 'center', fontWeight: 500 }}
            {...rest}
        >
            {text}
        </div>
    );
};

export default Title;
