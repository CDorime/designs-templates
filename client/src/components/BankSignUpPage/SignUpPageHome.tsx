import React from "react";
import styles from "./../../styles/BankInterfaceSignUp.module.scss";

interface DataBeforeRegistration {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export function SignUpPageHome() {
  const dataBeforeRegistration: DataBeforeRegistration = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };
  const renderFormRegestration = () => {
    return (
      <form className={styles.BankInterfaceSignUpForm}>
        <h1 className={styles.BankInterfaceSignUpFormTitle}>
          Registration form
        </h1>
        <input
          type="text"
          className={styles.BankInterfaceSignUpFormNameInput}
          placeholder="Your name"
          onChange={(e) => (dataBeforeRegistration.name = e.target.value)}
        />
        <input
          type="text"
          className={styles.BankInterfaceSignUpFormEmail}
          placeholder="Your email"
          onChange={(e) => (dataBeforeRegistration.email = e.target.value)}
        />
        <input
          type="password"
          className={styles.BankInterfaceSignUpFormPassword}
          placeholder="Your password"
          onChange={(e) => (dataBeforeRegistration.password = e.target.value)}
        />
        <input
          type="phone"
          className={styles.BankInterfaceSignUpFormPhone}
          placeholder="Your phone"
          onChange={(e) => (dataBeforeRegistration.phone = e.target.value)}
        />
        <input
          type="text"
          className={styles.BankInterfaceSignUpFormAddress}
          placeholder="Your address"
          onChange={(e) => (dataBeforeRegistration.address = e.target.value)}
        />
        <button
          className={styles.BankInterfaceSignUpFormButton}
          onClick={() => {
            if (
              dataBeforeRegistration.name &&
              dataBeforeRegistration.email &&
              dataBeforeRegistration.password &&
              dataBeforeRegistration.phone &&
              dataBeforeRegistration.address
            ) {
              fetch("http://localhost:3000/clients", {
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
            } else {
              alert("All fields are required");
            }
          }}
        >
          Create account
        </button>
      </form>
    );
  };
  return <React.Fragment>{renderFormRegestration()}</React.Fragment>;
}
