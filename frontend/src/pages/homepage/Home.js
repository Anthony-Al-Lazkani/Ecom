import "./Home.css";
import axios from "axios";

const Home = () => {
  async function handleClick(e) {
    const token = localStorage.getItem("authToken");
    if (token) {
      window.alert("YESSSSSSS");
    } else {
      window.alert("NOOOO");
    }
  }
  return (
    <>
      <section className="firstSection">
        <h1>Discover Your Adventure</h1>
        <h3>
          Unleash your spirit of exploration and find the best gear to conquer
          the great outdoors.
        </h3>
        <div className="buttons">
          <button className="shopCollectionBtn">Shop Collection</button>
          <button className="exploreTheWorldBtn">Explore The World</button>
        </div>
      </section>

      <section className="secondSection">
        <div className="title">
          <h1>Who are Ecom</h1>
          <button onClick={handleClick}>PRESS HERE</button>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
            }}
          >Logout</button>
        </div>
      </section>
    </>
  );
};

export default Home;
