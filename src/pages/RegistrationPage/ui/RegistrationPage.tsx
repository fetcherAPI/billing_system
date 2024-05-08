import { RegistrationSteps } from "features/Register";
import cls from "./RegistrationPage.module.scss";
export const RegistrationPage = () => {
  return <RegistrationSteps className={cls.wrapper} />;
};
