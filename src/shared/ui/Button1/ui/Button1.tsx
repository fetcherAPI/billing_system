import { ButtonHTMLAttributes, FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { classNames } from '../../../lib/classNames/classNames';
import { ThemeButton } from '../ebums';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    isLoading?: boolean; // Исправлено здесь
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Button1: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        disabled,
        theme = '',
        isLoading, // Исправлено здесь
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            disabled={disabled || isLoading} // Исправлено здесь
            className={classNames(cls.Button, { [cls[theme]]: true }, [className ? className : ''])}
            {...otherProps}
        >
            {isLoading && ( // Исправлено здесь
                <div className={cls.spinner}>
                    <Spin indicator={antIcon} />
                </div>
            )}
            {children}
        </button>
    );
};
