import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Welcome to the homepage</h1>
      </div>
    </div>
  );
};

export default Home;
