import { useTranslation } from "react-i18next";
import { memo } from "react";
import { MyButton } from "../Button/Button";
import { GlobalOutlined } from "@ant-design/icons";

export const LangSwitcher = memo(() => {
  const { t, i18n } = useTranslation("main");

  const toggle = () => {
    function getLanguage(key: string) {
      switch (key) {
        case "ru":
          return "en";
        case "en":
          return "ru";
        default:
          break;
      }
    }
    i18n.changeLanguage(getLanguage(i18n.language));
  };
  return (
    <MyButton onClick={toggle}>
      {t("lang")}
      <GlobalOutlined />
    </MyButton>
  );
});
