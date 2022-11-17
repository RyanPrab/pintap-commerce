import styled from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';

export const Spinner = styled(AiOutlineLoading).attrs(props => ({
  className: `inline animate-spin ml-2 w-10 h-10`
}))``;

export default Spinner;
