import { ButtonHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button1, ThemeButton } from "shared/ui/Button1";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const FindServiceBtn = ({ className, ...otherProps }: Props) => {
  const { t } = useTranslation("main");
  return (
    <Button1
      {...otherProps}
      theme={ThemeButton.ACTION}
      className={classNames("", {}, [className])}
    >
      {t("search")}
    </Button1>
  );
};
