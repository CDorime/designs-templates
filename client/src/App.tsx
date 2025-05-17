import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles/App.module.scss";
import { BankMainPage } from "./pages/BankMainPage";
import { BankSignUpPage } from "./pages/BankSignUpPage";



export function App() {
  return (
    <React.Fragment>
      <section id={styles.AppStructure} className={styles.AppStructure}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BankMainPage />} />
            <Route path="BankSignUpPage" element={<BankSignUpPage />} />
          </Routes>
        </BrowserRouter>
      </section>
    </React.Fragment>
  );
}
