import React from 'react';
import styles from './Header.module.scss';
const Header = ({ title }) => <h1 className={styles.header}>{title}</h1>;

export default Header;
