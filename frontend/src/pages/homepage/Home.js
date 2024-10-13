import "./Home.css";
import axios from "axios";
import { animate, motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <section className="firstSection">
        <motion.h1
          initial={{ y: "15px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "15px", opacity: 0 }}
          transition={{duration : 0.75 , ease : "easeInOut"}}
        >
          Discover Your Adventure
        </motion.h1>
        <motion.h3
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
        transition={{duration : .75, ease : "easeInOut"}}>
          Unleash your spirit of exploration and find the best gear to conquer
          the great outdoors.
        </motion.h3>
        <div className="buttons">
          <motion.button
            className="shopCollectionBtn"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            Shop Collection
          </motion.button>
          <motion.button
            className="exploreTheWorldBtn"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            Explore The World
          </motion.button>
        </div>
      </section>

      <section className="secondSection">
        <div className="title">
          <h1>Who are Ecom</h1>
        </div>
      </section>
    </>
  );
};

export default Home;
