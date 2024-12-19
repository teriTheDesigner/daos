"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./IndexHeader.module.css";

export default function IndexHeader() {
  const router = useRouter();
  function headerClick() {
    router.push("/ensembles");
  }

  return (
    <header className={`${styles.header} outer-grid`}>
      <div className="inner-grid">
        <div className={styles.text}>
          <h1 className={`${styles.h1} oswald-medium`}>
            Stedet hvor amatørmusikere finder hinanden og spiller musik sammen
          </h1>
          <div>
            <PrimaryButton onClick={headerClick} color="blue" size="large">
              Se opslag
            </PrimaryButton>
          </div>
        </div>
        <img
          className={styles.img}
          src="/clip-333.svg"
          alt="header illustration"
        />
      </div>
    </header>
  );
}
