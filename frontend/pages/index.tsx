import styles from "../styles/Home.module.css";

interface IUser {
  name: string;
}

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
    </div>
  );
}
