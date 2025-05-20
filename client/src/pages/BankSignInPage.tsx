import React from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { SignInPageHeader } from "../components/BankSignInPage/SignInPageHeader";
import styles from "./../styles/BankInterfaceSignIn.module.scss";
import { SignInPageHome } from "../components/BankSignInPage/SignInPageHome";

export function BankSignInPage() {
  return (
    <React.Fragment>
      <title>SpaceBank | Sign In</title>
      <section className={styles.BankInterfaceSignIn}>
        <ErrorBoundary>
          <SignInPageHeader />
        </ErrorBoundary>
        <SignInPageHome />
      </section>
    </React.Fragment>
  );
}
