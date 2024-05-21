import { Menu, Drawer, Button, MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { LoginBtn } from "features/Login";
import { RegisterBtn } from "features/Register";
import { Link } from "react-router-dom";
import { LangSwitcher } from "shared/ui/LangSwitcher";
import { useTranslation } from "react-i18next";

interface IBurgerMenuProps {
  showDrawer: () => void;
  closeDrawer: () => void;
  isOpen: boolean;
}

export const BurgerMenu = ({
  closeDrawer,
  isOpen,
  showDrawer,
}: IBurgerMenuProps) => {
  const { t } = useTranslation("header");

  const items: MenuProps["items"] = [
    {
      label: <Link to="#">{t("service")}</Link>,

      key: "home",
    },
    {
      label: <Link to="#">{t("client")}</Link>,
      key: "client",
    },
    {
      label: <Link to="#">{t("about")}</Link>,
      key: "about",
    },
    {
      label: <LangSwitcher />,
      key: "LangSwitcher ",
    },
    {
      label: <RegisterBtn />,
      key: "register ",
    },
    {
      label: <LoginBtn />,
      key: "login ",
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
      >
        <Menu mode="vertical" items={items} />
      </Drawer>
    </>
  );
};
