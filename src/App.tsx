import { BankOperations } from "./components/BankOperations";
import styles from "./styles/App.module.scss";

export function App() {
  return (
    <>
      <section id={styles.AppStructure} className={styles.AppStructure}>
        <BankOperations />
      </section>
    </>
  );
}
