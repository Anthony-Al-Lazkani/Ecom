import "./Home.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
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

      <motion.section
        className="secondSection"
        id="section2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="secondSectionContainer">
          <div className="secondSectiontitle">
            <h1>
              Ecom is the Top Notch modern luxury designer , ready to elevate
              your space into elegance.
            </h1>
          </div>
          <div className="secondSectioncontent">
            <div className="contentCardContainer">
              <div
                className="contentCard card1"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? <h1>Living Room</h1> : <div></div>}
              </div>
            </div>

            <div className="contentCardContainer">
              <div
                className="contentCard card2"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                {isHovered1 ? <h1>Kitchen</h1> : <div></div>}
              </div>
            </div>

            <div className="contentCardContainer">
              <div
                className="contentCard card3"
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                {isHovered2 ? <h1>Bedroom</h1> : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="thirdSection">
      <div className="thirdSectionBG"></div>
      </section>
    </>
  );
};

export default Home;
