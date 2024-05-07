import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  path?: string;
}

export const LoginBtn = ({ path }: IProps) => {
  const { t } = useTranslation("header");
  return <Link to={path || "login"}>{t("login")}</Link>;
};
