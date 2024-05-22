import { Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { useEffect } from "react";
import { useAppDispatch } from "app/providers/StoreProvider";
import { setRegisterProperty } from "features/Register/model/slice/RegisterSlice";
import { keyOfRegisterSliceSchema } from "features/Register/types/SliceSchema";
import cls from "./style.module.scss";
import { useSelector } from "react-redux";
import { registerData } from "../../model/selectors";

interface IProps {
  className?: string;
  handleNext: any;
  isClicked: boolean;
  setClick: any;
}

export const RegistrationComanyForm = ({
  className,
  isClicked,
  handleNext,
  setClick,
}: IProps) => {
  const { t } = useTranslation("registration");
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const formFields = useSelector(registerData);

  useEffect(() => {
    if (isClicked) {
      form.submit();
    }
  }, [form, isClicked]);

  const handleFinish = () => {
    handleNext();
    setClick((prev: boolean) => !prev);
  };

  const handleChangeInput = (key: keyOfRegisterSliceSchema, data: any) => {
    dispatch(setRegisterProperty({ key: key, data }));
  };

  return (
    <Form
      initialValues={formFields}
      layout={"vertical"}
      form={form}
      onFinish={handleFinish}
      onFinishFailed={() => setClick(false)}
      className={classNames(cls.from, {}, [className])}
    >
      <Row gutter={200} className={cls.row}>
        <Col style={{ width: "50%" }}>
          <Form.Item
            name={"inn"}
            label={t("companyInn")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input
              placeholder="input placeholder"
              onChange={(e) => handleChangeInput("inn", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name={"factAddress"}
            label={t("companyPin")}
            rules={[{ required: true, message: t("loginPassRuleText") }]}
          >
            <Input
              placeholder="input placeholder"
              onChange={(e) => handleChangeInput("factAddress", e.target.value)}
            />
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
