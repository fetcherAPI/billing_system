import { Layout, Row } from "antd";
import { LoginBtn } from "features/Login";
import { Link } from "react-router-dom";
import { LangSwitcher } from "shared/ui/LangSwitcher";
import cls from "./Header.module.scss";
import { useTranslation } from "react-i18next";
const { Header: HeaderAntd } = Layout;
export const Header = () => {
  const { t } = useTranslation("header");
  return (
    <HeaderAntd>
      <Row align={"middle"} justify={"space-between"}>
        <Row>
          <h1 className={cls.logo}>Билинг КЖ</h1>
        </Row>

        <Row justify={"space-between"} className={cls.links}>
          <Link to="#">{t("service")}</Link>
          <Link to="#">{t("client")}</Link>
          <Link to="#">{t("about")}</Link>
        </Row>
        <Row>
          <LangSwitcher />
          <LoginBtn />
        </Row>
      </Row>
    </HeaderAntd>
  );
};
