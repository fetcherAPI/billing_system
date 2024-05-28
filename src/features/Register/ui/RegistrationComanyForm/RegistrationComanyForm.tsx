import { forwardRef, useImperativeHandle } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "app/providers/StoreProvider";
import { setRegisterProperty } from "features/Register/model/slice/RegisterSlice";
import { keyOfRegisterSliceSchema } from "features/Register/types/SliceSchema";
import cls from "./style.module.scss";
import { useSelector } from "react-redux";
import { registerData } from "../../model/selectors";

interface IProps {
  className?: string;
  handleNext: () => void;
}

export interface RegistrationComanyFormRef {
  submit: () => void;
}

export const RegistrationComanyForm = forwardRef<
  RegistrationComanyFormRef,
  IProps
>(({ className, handleNext }, ref) => {
  const { t } = useTranslation("registration");
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const formFields = useSelector(registerData);

  useImperativeHandle(ref, () => ({
    submit() {
      form.submit();
    },
  }));

  const handleFinish = () => {
    handleNext();
  };

  const handleChangeInput = (key: keyOfRegisterSliceSchema, data: any) => {
    dispatch(setRegisterProperty({ key, data }));
  };

  return (
    <Form
      initialValues={formFields}
      layout={"vertical"}
      form={form}
      onFinish={handleFinish}
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
            name={"headFullname"}
            label={t("headFullname")}
            rules={[{ required: true, message: t("loginUsernameRuleText") }]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            name={"locality"}
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
      <Form.Item style={{ display: "none" }}>
        <Button type="primary" htmlType="submit">
          {t("login")}
        </Button>
      </Form.Item>
    </Form>
  );
});
