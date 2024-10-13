import "./Home.css";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <motion.section
        className="firstSection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="gradient-overlay"></div>
        <div className="FrontPage">
          <motion.div
            className="firstPart"
            initial={{ x: "-10px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h3>Crafted for Elegance</h3>
            <h1>Elegance Meets Comfort</h1>
          </motion.div>
          <motion.div
            className="secondPart"
            initial={{ x: "10px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <button>MORE ABOUT ECOM</button>
          </motion.div>
        </div>
      </motion.section>

      <section className="secondSection">
        <div className="title">
          <div className="titleDesc">
            <h1>
              Ecom is the Top Notch modern luxury designer, ready to elevate
              your space into perfectness
            </h1>
          </div>
        </div>
        <div className="content">
          <div className="contentBox">
            <div className="contents">
              <h1>H11</h1>
            </div>
            <div className="contents">H22</div>
            <div className="contents">H33</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
