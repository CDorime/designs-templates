import React from "react";
import styles from "./../../styles/BankInterfaceSignUp.module.scss";
import Logotype from "./../../assets/logotypeProject.png";
import { Link as RouterLink } from "react-router-dom";

interface RoutesInterface {
  route_text: string;
  route_path: string;
}

export function SignUpPageHeader() {
  const getProjectName = import.meta.env.VITE_PROJECT_NAME;
  const routesArray: RoutesInterface[] = [
    {
      route_text: "Return Home",
      route_path: "/",
    },
  ];
  const renderLogo = () => {
    return (
      <div className={styles.SignUpPageHeaderLogotypeContent}>
        <img
          src={Logotype}
          className={styles.BankSignUpInterfaceHeaderLogotype}
        />
        <h1 className={styles.BankInterfaceSignUpPageHeaderTitle}>
          {getProjectName}
        </h1>
      </div>
    );
  };
  const renderRoutes = () => {
    return (
      <React.Fragment>
        {routesArray.map((routes) => (
          <RouterLink
            key={routes.route_path}
            className={styles.BankSignUpHeaderContent}
            to={routes.route_path}
          >
            {routes.route_text}
          </RouterLink>
        ))}
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <div className={styles.BankInterfaceSignUpPageHeader}>
        {renderLogo()}
        {renderRoutes()}
      </div>
    </React.Fragment>
  );
}
