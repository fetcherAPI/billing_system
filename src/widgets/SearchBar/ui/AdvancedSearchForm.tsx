import { Input, Button, Form } from "antd";
import { useTranslation } from "react-i18next";

export const AdvancedSearchForm = () => {
  const [form] = Form.useForm();

  const { t } = useTranslation("main");

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        name="service"
        rules={[{ required: true, message: "Please input your service!" }]}
      >
        <p>{t("service")}</p>
        <Input placeholder={t("service")} />
      </Form.Item>
      <Form.Item
        name="govAgency"
        rules={[{ required: true, message: "Please input your govAgency!" }]}
      >
        <p>{t("govAgency")}</p>
        <Input placeholder={t("govAgency")} />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <>
            <p style={{ opacity: 0 }}>{"d"}</p>
            <Button type="primary" htmlType="submit">
              {t("search")}
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default AdvancedSearchForm;
