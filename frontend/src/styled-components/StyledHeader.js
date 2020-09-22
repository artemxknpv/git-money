import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: 64px;
  color: #333;
  font-family: 'Formular', sans-serif;
  margin-bottom: 1.5rem;
  max-width: 1000px;
`;
