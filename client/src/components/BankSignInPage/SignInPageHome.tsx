import React, { useState } from "react";
import styles from "./../../styles/BankInterfaceSignIn.module.scss";

interface DataBeforeAuthorization {
  login: string;
  password: string;
}

export function SignInPageHome() {
  const [dataBeforeAuthorization, setDataBeforeAuthorization] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataBeforeAuthorization({
      ...dataBeforeAuthorization,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataBeforeAuthorization.login && dataBeforeAuthorization.password) {
      fetch("http://localhost:3000/clients/authorization", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBeforeAuthorization),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
      return;
    }
    return;
  };
  return (
    <React.Fragment>
      <form className={styles.BankInterfaceSignInForm} onSubmit={handleSubmit}>
        <h1 className={styles.BankInterfaceSignInFormTitle}>Sign In</h1>
        <input
          type="text"
          className={styles.BankInterfaceSignInFormLogin}
          placeholder="Your login"
          name="login"
          required={true}
          maxLength={32}
        />
        <input
          type="password"
          className={styles.BankInterfaceSignInFormPassword}
          placeholder="Your password"
          name="password"
          required={true}
          maxLength={32}
          onChange={handleInputChange}
        />
        <button className={styles.BankInterfaceSignInFormButton} type="submit">
          Sign In
        </button>
      </form>
    </React.Fragment>
  );
}
