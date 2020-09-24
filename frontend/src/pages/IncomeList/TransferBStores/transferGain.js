import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './transfer.module.scss';

function TransferGain({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user._id);
  const transfers = useSelector(state => state.transfers);
  const store = useSelector(state => state.categories);
  const transfer = transfers.filter(transfer => {
    return transfer._id === id;
  })[0];
  const [prettyTime, setPrettyTime] = useState('');
  const [nameTo, setNameTo] = useState(null);
  useEffect(() => {
    setPrettyTime(new Date(transfer.time).toLocaleString());
    setNameTo(
      store.filter(category => {
        return category.id === transfer.from;
      })[0]
    );
  }, []);

  return (
    <motion.li style={{ listStyle: 'none' }} onClick={toggleOpen}>
      <motion.div
        className={isOpen ? styles.openedWrapper : styles.wrapper}
        whileHover={{
          scale: 1.1,
        }}
      >
        <div className={styles.listItem}>
          <p className={styles.gain}>+${transfer && transfer.amount}</p>
        </div>
        <div className={styles.listItem}>
          <p className={styles.targetCategory}>
            Переведено из <strong>{nameTo && nameTo.name}</strong>
          </p>
        </div>
        <div className={styles.listItem}>
          <p className={styles.time}>{prettyTime && prettyTime}</p>
        </div>
      </motion.div>
    </motion.li>
  );
}

export default TransferGain;
