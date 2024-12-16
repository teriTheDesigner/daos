"use client";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import styles from "./Nav.module.css";
import { useState, useEffect } from "react";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);

    window.location.reload();
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.logoDiv}>
        <a className={`${styles.logo} oswald-medium`} href="/">
          Musik Samspil
        </a>
        <p className={`${styles.logoText} montserrat-regular`}>
          Skabt af DAOS - Dansk Amatørorkester Samvirke
        </p>
      </div>
      <div className={styles.navLinksDiv}>
        <div className={styles.navLinksDiv}>
          <a
            className={`${styles.navLink} montserrat-bold mr-6`}
            href="/ensembles"
          >
            Ensembles
          </a>
          <a
            className={`${styles.navLink} montserrat-bold mr-6`}
            href="/profile"
          >
            Profile
          </a>
          <a className={`${styles.navLink} montserrat-bold`} href="/signup">
            Sign up
          </a>

          {!isLoggedIn ? (
            <a className={`${styles.navLink} montserrat-bold`} href="/login">
              Log ind
            </a>
          ) : (
            <PrimaryButton color="white" size="medium" onClick={handleLogout}>
              Log out
            </PrimaryButton>
          )}
        </div>
      </div>
    </nav>
  );
}
