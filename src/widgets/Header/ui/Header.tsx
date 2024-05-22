import { Col, Layout, Row } from "antd";
import { LoginBtn } from "features/Login";
import { Link } from "react-router-dom";
import { LangSwitcher } from "shared/ui/LangSwitcher";
import cls from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import { RegisterBtn } from "features/Register";
import { BurgerMenu } from "./BurgerMenu/ui/BurgerMenu";
import { useEffect, useState } from "react";

const { Header: HeaderAntd } = Layout;

export const Header = () => {
  const { t } = useTranslation("header");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderAntd>
      <Row align={"middle"} justify={"space-between"}>
        <Link to={"/"}>
          <h1 className={cls.logo}>Билинг КЖ</h1>
        </Link>
        {!isMobile ? (
          <>
            <Row justify={"space-between"} className={cls.links}>
              <Link to="#">{t("service")}</Link>
              <Link to="#">{t("client")}</Link>
              <Link to="#">{t("about")}</Link>
            </Row>

            <Row gutter={16}>
              <LangSwitcher />
              <Col>
                <LoginBtn />
              </Col>
              <Col>
                <RegisterBtn />
              </Col>
            </Row>
          </>
        ) : (
          <BurgerMenu />
        )}
      </Row>
    </HeaderAntd>
  );
};
