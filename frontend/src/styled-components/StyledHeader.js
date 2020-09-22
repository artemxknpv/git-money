import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-family: 'Formular', sans-serif;
  margin: 64px 1.5rem 1.5rem;
  max-width: 1000px;
`;
