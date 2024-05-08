import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppRoutes } from "shared/config";

export const RegisterBtn = () => {
  const { t } = useTranslation("header");
  return <Link to={AppRoutes.REGISTRATION}>{t("registration")}</Link>;
};
