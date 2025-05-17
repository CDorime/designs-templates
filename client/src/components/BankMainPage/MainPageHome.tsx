import * as React from "react";
import styles from "./../../styles/BankInterface.module.scss";

interface ContentSection {
  content_title: string;
  content_text: string;
}

export function MainPageHome(): React.JSX.Element {
  const content: ContentSection = {
    content_title: "About Us",
    content_text: `\
      At SpaceBank, we are committed to providing reliable and innovative financial solutions tailored to your needs.\n\
      With a focus on security, efficiency, and customer satisfaction, we offer a range of banking services designed to help individuals and businesses achieve their financial goals.
      Our mission is to simplify banking while maintaining the highest standards of trust and professionalism.
      Whether you're managing everyday transactions, saving for the future, or seeking growth opportunities, SpaceBank is here to support you every step of the way.
      Backed by cutting-edge technology and a dedicated team, we strive to make banking seamless and accessible.
      Join us and experience a modern approach to finance.
    `,
  };

  return (
    <React.Fragment>
      <section className={styles.BankInterfaceMainPageHomeContainer}>
        <h3 className={styles.BankInterfaceMainPageHomeTitle}>
          {content.content_title}
        </h3>
        <h1 className={styles.BankInterfaceMainPageHomeText}>
          {content.content_text}
        </h1>
      </section>
    </React.Fragment>
  );
}
