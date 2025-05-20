import React, { useState } from "react";
import styles from "./../../styles/BankInterfaceSignUp.module.scss";
import { Link as RouterLink } from "react-router-dom";

interface DataBeforeRegistration {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export function SignUpPageHome() {
  const [dataBeforeRegistration, setDataBeforeRegistration] =
    useState<DataBeforeRegistration>({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataBeforeRegistration({
      ...dataBeforeRegistration,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      dataBeforeRegistration.name &&
      dataBeforeRegistration.email &&
      dataBeforeRegistration.password &&
      dataBeforeRegistration.phone &&
      dataBeforeRegistration.address
    ) {
      fetch("http://localhost:3000/client-registration", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBeforeRegistration),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
      return;
    }
    return;
  };

  return (
    <form className={styles.BankInterfaceSignUpForm} onSubmit={handleSubmit}>
      <h1 className={styles.BankInterfaceSignUpFormTitle}>Registration form</h1>
      <input
        type="text"
        className={styles.BankInterfaceSignUpFormNameInput}
        placeholder="Your name"
        name="name"
        value={dataBeforeRegistration.name}
        onChange={handleInputChange}
        required={true}
        maxLength={46}
      />
      <input
        type="text"
        className={styles.BankInterfaceSignUpFormEmail}
        placeholder="Your email"
        name="email"
        value={dataBeforeRegistration.email}
        onChange={handleInputChange}
        required={true}
        maxLength={191}
      />
      <input
        type="password"
        className={styles.BankInterfaceSignUpFormPassword}
        placeholder="Your password"
        name="password"
        value={dataBeforeRegistration.password}
        onChange={handleInputChange}
        required={true}
        maxLength={32}
      />
      <input
        type="tel"
        className={styles.BankInterfaceSignUpFormPhone}
        placeholder="Your phone"
        name="phone"
        value={dataBeforeRegistration.phone}
        onChange={handleInputChange}
        required={true}
        maxLength={15}
        pattern="[0-9]*"
      />
      <input
        type="adress"
        className={styles.BankInterfaceSignUpFormAddress}
        placeholder="Your address"
        name="address"
        value={dataBeforeRegistration.address}
        onChange={handleInputChange}
      />
      <button className={styles.BankInterfaceSignUpFormButton} type="submit">
        Create account
      </button>
      <h1 className={styles.BankSignUpGoToSignInText}>Already have an account?</h1>
      <RouterLink to="/sign-in" className={styles.BankInterfaceSignUpGoToSignIn}>Log in</RouterLink>
    </form>
  );
}
