import { Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./style.module.scss";

interface IProps {
  className?: string;
  handleSubmit?: any;
}

export const RegistrationComanyForm = ({ className }: IProps) => {
  const { t } = useTranslation("registration");
  const [form] = Form.useForm();

  return (
    <Form
      layout={"vertical"}
      form={form}
      className={classNames(cls.from, {}, [className])}
    >
      <Row gutter={200} className={cls.row}>
        <Col style={{ width: "50%" }}>
          <Form.Item
            name={"inn"}
            label={t("companyInn")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={t("companyPin")}
            rules={[{ required: true, message: t("loginPassRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={t("position")}
            rules={[{ required: true, message: t("loginPassRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"website"}
            label={t("site")}
            rules={[{ required: true, message: t("loginPassRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"legalAddress"}
            label={t("legalAddress")}
            rules={[{ required: true, message: t("loginPassRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              style={{ opacity: 0 }}
            >
              {t("login")}
            </Button>
          </Form.Item>
        </Col>

        <Col style={{ width: "50%" }}>
          <Form.Item
            name={"username"}
            label={t("companyName")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"username"}
            label={t("headFullname")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"username"}
            label={t("companyName")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"username"}
            label={t("locality")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"factAddress"}
            label={t("actualAddress")}
            rules={[{ required: true, message: t("loginPassRuleText") }]}
          >
            <Input.Password placeholder="input placeholder" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
