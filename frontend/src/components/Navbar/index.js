import * as React from "react";
import { motion, useCycle } from "framer-motion";
import styles from "./navbar.module.scss"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 87vw 58px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    },
    backgroundColor: "red",
    position: 'fixed',
  }),
  closed: {
    clipPath: "circle(30px at 85vw 70px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40
    },
    backgroundColor: '#fcfcfc',
    position: 'absolute'
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

 const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
      <motion.div className={styles.background} variants={sidebar} />
      <button onClick={toggleOpen} className={styles.buttonNav}>
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 3 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 4 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 12 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>
      </button>
    </motion.nav>
  );
};

 export default Example
