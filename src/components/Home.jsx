import { Link } from "react-router-dom";
import { Data } from "./Page";
import { useContext } from "react";
import styles from "../styles/Home.module.css";

const Home = function() {
  const { user } = useContext(Data);

  return(
    <section className={styles.home}>
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>Galaxy Gazette</h1>
        <div className={styles.actions}>
          {!user &&  <Link to="/signup" className={styles.link}><button className={styles.button}>Sign Up</button></Link>}
          <Link className={styles.link} to="/blog">Start reading {">"}</Link>
        </div>
      </div>
    </section>
  )
};

export default Home;