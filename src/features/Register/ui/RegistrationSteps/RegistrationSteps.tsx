import { useState } from "react";
import { Button, message, Steps } from "antd";
import { IBaseProps } from "shared/types";
import { RegistrationComanyForm } from "../RegistrationComanyForm/RegistrationComanyForm";
import cls from "./RegistrationSteps.module.scss";
import { BackButton } from "shared/ui";

export const RegistrationSteps = ({ className }: IBaseProps) => {
  const [current, setCurrent] = useState(0);
  const [click, setClick] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const handleSubmitFormNext = () => {
    setClick((prev) => !prev);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "First",
      content: (
        <RegistrationComanyForm
          handleNext={next}
          isClicked={click}
          setClick={() => setClick((prev) => !prev)}
        />
      ),
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className={className}>
      <Steps current={current} items={items} />
      <div className={cls.content}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        <BackButton>
          <>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={handleSubmitFormNext}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </>
        </BackButton>
      </div>
    </div>
  );
};
