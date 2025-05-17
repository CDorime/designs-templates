import React from "react";
import styles from "./../styles/BankInterfaceSignUp.module.scss";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { SignUpPageHeader } from "../components/BankSignUpPage/SignUpPageHeader";
import { SignUpPageHome } from "../components/BankSignUpPage/SignUpPageHome";

export function BankSignUpPage() {
  return (
    <React.Fragment>
      <title>SpaceBank | Sign Up</title>
      <section className={styles.BankInterfaceSignUp}>
        <ErrorBoundary>
          <SignUpPageHeader />
        </ErrorBoundary>
        <SignUpPageHome />
      </section>
    </React.Fragment>
  );
}
