import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import cls from "./style.module.scss";
import { ILogin } from "../types/LoginType";
import { login } from "../model/service/LoginService";
import { useAppDispatch } from "app/providers/StoreProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserRole } from "../model/selectors";
import { useEffect } from "react";

export const LoginForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const userRole = useSelector(getUserRole);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hadleFinish = async (values: ILogin) => {
    await dispatch(login(values));
  };

  useEffect(() => {
    userRole && navigate(`../../${userRole}`);
  }, [navigate, userRole]);
  return (
    <Form
      layout={"vertical"}
      form={form}
      className={cls.form}
      onFinish={hadleFinish}
    >
      <Form.Item
        name={"username"}
        label={t("username")}
        rules={[{ required: true, message: t("loginUsernameRuleText") }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        name={"password"}
        label={t("password")}
        rules={[{ required: true, message: t("loginPassRuleText") }]}
      >
        <Input.Password placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("login")}
        </Button>
      </Form.Item>
    </Form>
  );
};
