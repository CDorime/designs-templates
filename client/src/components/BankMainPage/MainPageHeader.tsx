import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Logotype from "./../../assets/logotypeProject.png";
import styles from "./../../styles/BankInterface.module.scss";
import React from "react";

interface ScrollInterface {
  scroll_text: string;
  scroll_path: string;
}

interface RoutesInterface {
  route_text: string;
  route_path: string;
}

interface MainPageHeaderProps {
  smooth?: boolean;
  duration?: number;
}

export function MainPageHeader({
  smooth = true,
  duration = 1000,
}: MainPageHeaderProps) {
  const getProjectName = import.meta.env.VITE_PROJECT_NAME;
  const scrollArray: ScrollInterface[] = [
    {
      scroll_text: "Home",
      scroll_path: "mainPageHome",
    },
    {
      scroll_text: "About",
      scroll_path: "mainPageAbout",
    },
  ];

  const routesArray: RoutesInterface[] = [
    {
      route_text: "Sign Up",
      route_path: "/sign-up",
    },
    {
      route_text: "Sign In",
      route_path: "/sign-in",
    },
  ];

  const renderScrollsAndRoutes = () => (
    <div className={styles.BankMainHeaderContainer}>
      {scrollArray.map((scroll: any) => (
        <Link
          key={scroll.scroll_path}
          className={styles.BankMainHeaderContainerContent}
          to={scroll.scroll_path}
          smooth={smooth}
          duration={duration}
        >
          {scroll.scroll_text}
        </Link>
      ))}
      {routesArray.map((routes: any) => (
        <RouterLink
          key={routes.route_path}
          className={styles.BankMainHeaderContent}
          to={routes.route_path}
        >
          {routes.route_text}
        </RouterLink>
      ))}
    </div>
  );

  const renderLogotype = () => (
    <div className={styles.BankInterfaceHeaderLogotypeContent}>
      <img src={Logotype} className={styles.BankInterfaceHeaderLogotype} />
      <h1 className={styles.BankInterfaceHeaderLogotypeName}>
        {getProjectName}
      </h1>
    </div>
  );
  return (
    <React.Fragment>
      <header className={styles.BankInterfaceHeader}>
        {renderLogotype()}
        <div className={styles.BankMainHeaderContainerRoutes}>
          {renderScrollsAndRoutes()}
        </div>
      </header>
    </React.Fragment>
  );
}
