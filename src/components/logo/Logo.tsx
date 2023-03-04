import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className={styles.logo}>TicTacToe</h1>
    </Link>
  );
};

export default Logo;
