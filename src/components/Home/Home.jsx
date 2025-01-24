import Navbar from "../Navbar/Navbar.jsx";
import styles from "./Home.module.css";
import imgLightning from "../../assets/lightning.jpg";

export default function Home() {
  return (
    <>
      <Navbar className={styles.Navbar} />
      <div className={styles.Home}>
        <h1 className={styles.title}>Odin Mart</h1>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            Norse shopping... <br />
            lightning fast
          </div>
          <img className={styles.heroImage} src={imgLightning} />
        </div>
      </div>
    </>
  );
}
// Photo by Anton Kudryashov: https://www.pexels.com/photo/lightning-in-dark-storm-sky-9837044/
