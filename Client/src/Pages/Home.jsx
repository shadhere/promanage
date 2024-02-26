import Sidebar from "../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
import Kanban from "../Components/Kanban";

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Welcome to the homepage</h1>
        <h1>Board</h1>
        <Kanban />
      </div>
    </div>
  );
};

export default Home;
