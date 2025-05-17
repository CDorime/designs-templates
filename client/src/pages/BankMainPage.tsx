import { Element } from "react-scroll";
import { MainPageHeader } from "./../components/BankMainPage/MainPageHeader";
import { ErrorBoundary } from "../components/ErrorBoundary";
import styles from "./../styles/BankInterface.module.scss";
import { MainPageHome } from "../components/BankMainPage/MainPageHome";
import { MainPageAbout } from "../components/BankMainPage/MainPageAbout";
import React from "react";

export function BankMainPage() {
  return (
    <React.Fragment>
      <title>SpaceBank | Main Page</title>
      <section className={styles.BankInterfaceProduction}>
        <ErrorBoundary>
          <MainPageHeader />
        </ErrorBoundary>
        <Element name="mainPageHome">
          <MainPageHome />
        </Element>
        <Element name="mainPageAbout">
          <MainPageAbout />
        </Element>
      </section>
    </React.Fragment>
  );
}
