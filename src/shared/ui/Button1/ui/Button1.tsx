import { ButtonHTMLAttributes, FC } from "react";
import { Spin } from "antd";
import cls from "./Button.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { classNames } from "../../../lib/classNames/classNames";
import { ThemeButton } from "../ebums";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  isLaoding?: boolean;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Button1: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    disabled,
    theme = "",
    isLaoding,
    ...otherProps
  } = props;

  return (
    <button
      type="button"
      disabled={disabled || isLaoding}
      className={classNames(cls.Button, { [cls[theme]]: true }, [
        className ? className : "",
      ])}
      {...otherProps}
    >
      {isLaoding && (
        <div className={cls.spinner}>
          <Spin indicator={antIcon} />
        </div>
      )}
      {children}
    </button>
  );
};
