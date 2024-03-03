// FormLayout.js
import styles from "../../Components/Form/Form.module.css";
import authArt from "../../assets/Art.png";
import authArtBackground from "../../assets/authArtBackground.png";

const FormLayout = () => {
  return (
    <div className={styles.formLeft}>
      <div className={styles.imageContainer}>
        <img src={authArt} alt="authArt" className={styles.authArt} />
        <img
          src={authArtBackground}
          alt="authArtBackground"
          className={styles.authArtBackground}
        />
      </div>
      <h1>Welcome aboard my friend</h1>
      <p>Just a couple of clicks and we start</p>
    </div>
  );
};

export default FormLayout;
