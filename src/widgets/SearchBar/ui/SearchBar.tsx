import { Input } from "antd";
import cls from "./SearchBar.module.scss";
import { MyButton } from "shared/ui/Button";
import { AppstoreOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { animated, config, useSpring } from "@react-spring/web";
import AdvancedSearchForm from "./AdvancedSearchForm";
import { FindServiceBtn } from "entities/FindServiceBtn";

export const SearchBar = () => {
  const { t } = useTranslation("main");
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const props = useSpring({
    from: { height: "80px" },
    to: { height: advancedSearch ? "300px" : "80px" },
    config: config.slow,
  });

  const handleClick = () => {
    setAdvancedSearch((prev) => !prev);
  };

  return (
    <animated.div className={cls.blur} style={props}>
      <div className={cls.wrapper}>
        <Input placeholder={t("search")} />
        <MyButton className={cls.advancedSearch} onClick={handleClick}>
          <AppstoreOutlined width={140} color="#cdcdcd" />
          <p>{t("advSearch")}</p>
        </MyButton>
        {!advancedSearch && <FindServiceBtn />}
      </div>
      {advancedSearch && <AdvancedSearchForm />}
    </animated.div>
  );
};
